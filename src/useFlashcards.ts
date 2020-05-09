import { useState, useEffect } from "react";
import axios from 'axios'
import { decodeString } from './utils'

interface APIResponse {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }
  
  interface Flashcard {
    id: number;
    question: string;
    answer: string;
    options: string[];
  }

function useFlashcards<T>():[Flashcard[], Function, string] {
    const [flashcards, setFlashcards] = useState([])
    const [error, setError] = useState("")
    
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
  const handleSubmit = (category: string, amount: string) => {

    axios
      .get("https://opentdb.com/api.php?amount=10", {
        params: {
          amount,
          category,
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
      }).catch(() =>
      setError("Sorry, the API is not responding right now, try again later.")
    );
  };

    return [flashcards, handleSubmit, error]
}

export default useFlashcards