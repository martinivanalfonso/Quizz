import React from "react";

interface Props {
  text: string;
}

const FlashCard: React.FC<Props> = ({ text }) => {
  return <div>{text}</div>;
};

export default FlashCard;
