import React from "react";

import FlashcardList from "./components/flashcard-list/flashcard-list.component";
import Header from "./components/header/header.component";
import useFlashcards from "./useFlashcards";

import "./App.css";

const App: React.FC = () => {
  // Provides initial flashcards and handles generate custom flashcards
  const [flashcards, fetchFlashcards, error] = useFlashcards();

  return (
    <>
      <Header fetchFlashcards={fetchFlashcards} />
      <div className="container">
        {error && <p className="error-msg">{error}</p>}
        <FlashcardList flashcards={flashcards} />
      </div>
    </>
  );
};

export default App;
