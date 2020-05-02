import React, { useState } from "react";
import FlashcardList from "./components/flashcard-list.component";

import "./App.css";

const App: React.FC = () => {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS);
  return <FlashcardList flashcards={flashcards} />;
};

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: "What is 2 + 2?",
    answer: "4",
    options: ["2", "3", "4", "5"],
  },
  {
    id: 2,
    question: "What is 2 + 6?",
    answer: "8",
    options: ["8", "9", "10", "11"],
  },
  {
    id: 3,
    question: "What is 2 + 4?",
    answer: "6",
    options: ["5", "6", "7", "8"],
  },
];

export default App;
