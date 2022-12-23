import { Input } from "@chakra-ui/react";
import useInput from "@hooks/useInput";

const CreateQuestion = () => {
  const { input, setInput, onChangeHandler } = useInput("");
  return (
    <div>
      <div>문장을 입력하세요.</div>
      <Input onChange={onChangeHandler}></Input>
      <button
        onClick={() => {
          //   router.push();
        }}
      ></button>
    </div>
  );
};
export default CreateQuestion;
