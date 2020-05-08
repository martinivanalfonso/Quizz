import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import FlashcardList from "./components/flashcard-list/flashcard-list.component";
import { CounterContext } from "./counterContext";
import { decodeString } from "./utils";

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
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);

  // Keeps track of counter state
  const [counter, setCounter] = useState<number>(0);
  const [ids, setIds] = useState(new Set());
  const handleAnswer = (isRight: boolean, id: number) => {
    if (ids.has(id)) return;
    setIds(ids.add(id));
    isRight
      ? setCounter((prevState) => ++prevState)
      : setCounter((prevState) => --prevState);
  };

  // Fetches and provides categories for select input
  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php").then((res) => {
      setCategories(res.data.trivia_categories);
      setIsLoading(false);
    });
  }, []);

  // Fetches initial quizz questions
  useEffect(() => {
    axios
      .get("https://opentdb.com/api.php?amount=10")
      .then((res) => {
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
      })
      .catch(() =>
        setError("Sorry, the API is not responding right now, try again later.")
      );
  }, []);

  // Fetches custom quizz questions based on the users input
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    axios
      .get("https://opentdb.com/api.php?amount=10", {
        params: {
          amount: amountRef.current?.value,
          category: categoryRef.current?.value,
        },
      })
      .then((res) => {
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
      <div className="container">
        {error && <p className="error-msg">{error}</p>}
        <CounterContext.Provider value={{ counter, handleAnswer }}>
          <FlashcardList flashcards={flashcards} />
        </CounterContext.Provider>
      </div>
    </>
  );
};

export default App;
