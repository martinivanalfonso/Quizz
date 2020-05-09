import React, { useState } from "react";
import { CounterContext } from "./CounterContext";

const CounterProvider: React.FC = ({ children }) => {
  const [counter, setCounter] = useState<number>(0);
  const [ids, setIds] = useState(new Set());
  const handleAnswer = (isRight: boolean, id: number) => {
    if (ids.has(id)) return;
    setIds(ids.add(id));
    isRight
      ? setCounter((prevState) => ++prevState)
      : setCounter((prevState) => --prevState);
  };
  return (
    <CounterContext.Provider value={{ counter, handleAnswer }}>
      {children}
    </CounterContext.Provider>
  );
};

export default CounterProvider;
