import React, { useState, useEffect, useRef, useContext } from "react";

import { CounterContext } from "../../CounterContext";

interface Flashcard {
  id: number;
  question: string;
  answer: string;
  options: string[];
}

const FlashCard: React.FC<{ flashcard: Flashcard }> = ({ flashcard }) => {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState(0);
  const { handleAnswer } = useContext(CounterContext);

  // Keeps track of the element's height
  const MIN_HEIGHT = 100
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  // Keeps track of parent element to style
  const cardRef = useRef<HTMLDivElement>(document.createElement("div"));

  const calculateMaxHeight = () => {
    const frontHeight: number =
      frontRef.current?.getBoundingClientRect().height || 0;
    const backHeight: number =
      frontRef.current?.getBoundingClientRect().height || 0;
    setHeight(Math.max(frontHeight, backHeight, MIN_HEIGHT));
  };

  // Resizes component
  useEffect(() => {
    const resizeTimeOut = setTimeout(() => {
      calculateMaxHeight();
    }, 1500); 
    return () => clearTimeout(resizeTimeOut)
  }, []);

  useEffect(() => {
    window.addEventListener("resize", calculateMaxHeight);
    return () => window.removeEventListener("resize", calculateMaxHeight);
  }, []);

  // Styles parent element based on the option user selected
  const tryOption = (event: React.MouseEvent) => {
    setFlip(!flip);
    if (event.currentTarget.getAttribute("data-value") === flashcard.answer) {
      cardRef.current.style.backgroundColor = "green";
      handleAnswer(true, flashcard.id);
    } else {
      cardRef.current.style.backgroundColor = "red";
      handleAnswer(false, flashcard.id);
    }
    setTimeout(() => {
      cardRef.current.style.backgroundColor = "grey";
    }, 1000); 
  };

  // Card flip is done by custom css class animation "flip"
  return (
    <div
      className={`card ${flip ? "flip" : ""}`}
      style={{ height: `${height > MIN_HEIGHT ? `${height}px` : `${MIN_HEIGHT}px`}` }}
      onClick={() => setFlip(!flip)}
      ref={cardRef}
    >
      <div className="front" ref={frontRef}>
        <div className="question-title">
          <h4>{flashcard.question}</h4>
        </div>
        <div className="options">
          {flashcard.options.map((option, index) => {
            return (
              <button
                data-value={option}
                className="option"
                key={index}
                onClick={(e) => tryOption(e)}
              >
                {option}
              </button>
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
