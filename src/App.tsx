import React, { useState, useEffect, useRef } from "react";
import FlashcardList from "./components/flashcard-list/flashcard-list.component";
import axios from "axios";

import "./App.css";

interface APIResponse {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface Category {
  id: string;
  name: string;
}

const App: React.FC = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    axios
      .get("https://opentdb.com/api_category.php")
      .then((res) => setCategories(res.data.trivia_categories));
  }, []);

  useEffect(() => {
    axios.get("https://opentdb.com/api.php?amount=10").then((res) => {
      setFlashcards(
        res.data.results.map((item: APIResponse, index: number) => {
          const answer = decodeString(item.correct_answer);
          const options = [
            ...item.incorrect_answers.map((a: string) => decodeString(a)),
            answer,
          ];
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(item.question),
            answer: decodeString(answer),
            options: options.sort(() => Math.random() - 0.5),
          };
        })
      );
    });
  }, []);

  const decodeString = (str: string) => {
    const textArea: HTMLTextAreaElement = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    axios.get("https://opentdb.com/api.php?amount=10", {
      params: {
        amount: amountRef.current?.value,
        category: categoryRef.current?.value
      }
    }).then((res) => {
      setFlashcards(
        res.data.results.map((item: APIResponse, index: number) => {
          const answer = decodeString(item.correct_answer);
          const options = [
            ...item.incorrect_answers.map((a: string) => decodeString(a)),
            answer,
          ];
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(item.question),
            answer: decodeString(answer),
            options: options.sort(() => Math.random() - 0.5),
          };
        })
      );
    });
  };

  return (
    <>
      <form className="header" onSubmit={(event) => handleSubmit(event)}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select name="category" id="category" ref={categoryRef}>
            {categories.length ? (categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>)
            )) : (<option>Loading...</option>)}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number of Questions</label>
          <input
            type="number"
            id="amount"
            min="1"
            step="1"
            defaultValue={10}
            ref={amountRef}
          />
        </div>
        <div className="form-group">
          <button className="btn" type="submit">Generate</button>
        </div>
      </form>
      <div className="container">
        <FlashcardList flashcards={flashcards} />
      </div>
      ;
    </>
  );
};

export default App;
