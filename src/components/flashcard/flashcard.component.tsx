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

  // Keeps track of the element's height
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  // Keeps track of parent element to style 
  const cardRef = useRef<HTMLDivElement>(document.createElement("div"));

  const calculateMaxHeight = () => {
    const frontHeight: number =
      frontRef.current?.getBoundingClientRect().height || 0;
    const backHeight: number =
      frontRef.current?.getBoundingClientRect().height || 0;
    setHeight(Math.max(frontHeight, backHeight, 100));
  };

  useEffect(() => {
    setTimeout(() => {
      calculateMaxHeight();  
    },1500)
  }, [flashcard.question]);

  useEffect(() => {
    window.addEventListener("resize", calculateMaxHeight);

    return () => window.removeEventListener("resize", calculateMaxHeight);
  }, []);

  // Styles parent element based on the option user selected
  const tryOption = (event: React.MouseEvent) => {
    setFlip(!flip);
    event.currentTarget.getAttribute("data-value") === flashcard.answer
      ? (cardRef.current.style.backgroundColor = "green")
      : (cardRef.current.style.backgroundColor = "red");
    setTimeout(() => {
      cardRef.current.style.backgroundColor = "white";
    }, 1000);
  };

  // Card flip is done by custom css class animation "flip"
  return (
    <div
      className={`card ${flip ? "flip" : ""}`}
      style={{ height: `${height > 100 ? `${height}px` : "100px"}` }}
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