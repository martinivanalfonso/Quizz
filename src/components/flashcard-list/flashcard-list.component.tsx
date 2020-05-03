import React from "react";
import FlashCard from "../flashcard/flashcard.component";
import Spinner from "../spinner/spinner.component";

import { motion } from "framer-motion";

interface Flashcard {
  id: number;
  question: string;
  answer: string;
  options: string[];
}

interface Props {
  flashcards: Flashcard[];
}

// Grid framer-motion animation props
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

// Grid item framer-motion animation props
const item = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
};

const FlashcardList: React.FC<Props> = ({ flashcards }) => {
  return (
    <div>
      {flashcards && flashcards.length ? (
        <motion.ul initial="hidden" animate="visible" variants={container}>
          <div className="card-grid">
            {flashcards.map((flashcard) => {
              return (
                <motion.div variants={item} key={flashcard.id}>
                  <FlashCard flashcard={flashcard} />
                </motion.div>
              );
            })}
          </div>
        </motion.ul>
      ) : (
        <div className="card-grid">
          {[1, 2, 3, 4].map((elem, index) => {
            return (
              <motion.div key={index} variants={item} className="card">
                <Spinner />
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FlashcardList;