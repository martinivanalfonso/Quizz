import { createContext } from "react";

interface Context {
  handleAnswer: Function;
  counter: number;
}

export const CounterContext = createContext<Context>({
  counter: 0,
  handleAnswer: () => (null),
});
