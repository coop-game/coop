import { useState } from "react";

const useInput = <T>(
  defaultValue: T,
  inputCallBack = ((value: string) => value) as (value: string) => T
) => {
  const [input, setInput] = useState<T>(defaultValue);
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(inputCallBack(e.target.value));
  };
  return { input, setInput, onChangeHandler };
};
export default useInput;
