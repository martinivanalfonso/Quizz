import React, { useState, useEffect, useRef } from "react";

interface Flashcard {
  id: number;
  question: string;
  answer: string;
  options: string[];
}

const FlashCard: React.FC<{ flashcard: Flashcard }> = ({ flashcard }) => {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState(0);

  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  const calculateMaxHeight = () => {
    const frontHeight: number =
      frontRef.current?.getBoundingClientRect().height || 0;
    const backHeight: number =
      frontRef.current?.getBoundingClientRect().height || 0;
    setHeight(Math.max(frontHeight, backHeight, 100));
  }

  useEffect(() => {
   calculateMaxHeight()
  }, [flashcard.question]);

  useEffect(() => {
   window.addEventListener('resize', calculateMaxHeight)
   
   return () => window.removeEventListener('resize', calculateMaxHeight)
  }, []);

  return (
    <div
      onClick={() => setFlip(!flip)}
      className={`card ${flip ? "flip" : ""}`}
      style={{ height: `${height > 100 ? `${height}px` : "100px"}` }}
    >
      <div className="front" ref={frontRef}>
        <h4>{flashcard.question}</h4>
        <div className="options">
          {flashcard.options.map((option, index) => {
            return (
              <div className="option" key={index}>{`${index}) ${option}`}</div>
            );
          })}
        </div>
      </div>
      <div className="back" ref={backRef}>
        {flashcard.answer}
      </div>
    </div>
  );
};

export default FlashCard;
