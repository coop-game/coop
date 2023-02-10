import { useState } from "react";

const useInput = <T>(
  defaultValue: T,
  inputCallBack = ((prev: T, value: string) => value) as (
    prev: T,
    value: string
  ) => T
) => {
  const [input, setInput] = useState<T>(defaultValue);
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => inputCallBack(prev, e.target.value));
  };
  return { input, setInput, onChangeHandler };
};
export default useInput;
