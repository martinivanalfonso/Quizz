import React, { useState } from "react";

interface Flashcard {
  id: number;
  question: string;
  answer: string;
  options: string[];
}

const FlashCard: React.FC<{ flashcard: Flashcard }> = ({ flashcard }) => {
  const [flip, setFlip] = useState(false);

  return (
    <div
      onClick={() => setFlip(!flip)}
      className={`card ${flip ? "flip" : ""}`}
    >
      <div className="front">
        {flashcard.question}
        <div className="options">
          {flashcard.options.map((option, index) => {
            return <div className="option" key={index}>{option}</div>;
          })}
        </div>
      </div>
      <div className="back">{flashcard.answer}</div>
    </div>
  );
};

export default FlashCard;
