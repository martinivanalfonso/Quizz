import React from "react";
import FlashCard from "./flashcard.component";

interface Flashcard {
  id: number;
  question: string;
  answer: string;
  options: string[];
}

interface Props {
  flashcards: Flashcard[];
}

const FlashcardList: React.FC<Props> = ({ flashcards }) => {
  return (
    <div className="card-grid">
      {flashcards.map((flashcard) => {
        return <FlashCard flashcard={flashcard} key={flashcard.id} />;
      })}
    </div>
  );
};

export default FlashcardList;
