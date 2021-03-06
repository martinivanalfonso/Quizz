import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";

import { CounterContext } from "../../CounterContext";
import "./header.styles.css";

interface Category {
  id: string;
  name: string;
}

interface Props {
  fetchFlashcards: Function;
}

const Header: React.FC<Props> = ({ fetchFlashcards }) => {
  // Header form control
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);

  // Keeps track of counter state
  const { counter } = useContext(CounterContext);

  // Fetches and provides categories for select input
  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php").then((res) => {
      setCategories(res.data.trivia_categories);
      setIsLoading(false);
    });
  }, []);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetchFlashcards(categoryRef.current?.value, amountRef.current?.value);
  };

  return (
    <form className="header" onSubmit={(event) => handleFormSubmit(event)}>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select name="category" id="category" ref={categoryRef}>
          {categories.length ? (
            categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))
          ) : (
            <option>Loading...</option>
          )}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="amount">Number of Questions</label>
        <input
          disabled={isLoading}
          type="number"
          id="amount"
          min="1"
          step="1"
          defaultValue={10}
          ref={amountRef}
        />
      </div>
      <div className="form-group">
        <button
          disabled={isLoading}
          className={`btn ${isLoading ? "disabled" : ""}`}
          type="submit"
        >
          {isLoading ? "Loading..." : "Generate"}
        </button>
      </div>
      <div className="form-group">
        <h2 className="counter-msg">Score: {counter}</h2>
      </div>
    </form>
  );
};

export default Header;
