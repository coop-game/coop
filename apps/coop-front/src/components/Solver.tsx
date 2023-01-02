import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { yjsGameState } from "@common/recoil/recoil.atom";
import { doc, yQuestionsState } from "@common/yjsStore/userStore";
import { useTranslation } from "@hooks/useTransitions";
import { useState } from "react";
import { useRecoilValue } from "recoil";

const Solver = () => {
  const [answer, setAnswer] = useState("");
  const [isError, setIsError] = useState(true);
  const translation = useTranslation().messages;

  const gameState = useRecoilValue(yjsGameState);

  const answerChangeHandler = () => {
    doc.transact(() => {
      const gamePagesIndex = gameState.gamePagesIndex;
      const question = yQuestionsState.get(gamePagesIndex);
      const newQuestion = {
        ...question,
        inputAnswer: [...question.inputAnswer, answer],
      };
      setAnswer("");
      yQuestionsState.delete(gamePagesIndex);
      yQuestionsState.insert(gamePagesIndex, [newQuestion]);
    });
  };

  return (
    <div>
      <div>맞추는 사람</div>
      <FormControl isInvalid={isError}>
        <FormLabel>asdf</FormLabel>
        <Input
          type="email"
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
            setIsError(e.target.value === "");
          }}
        />
        <Flex ml={5}>
          {!isError ? (
            <FormHelperText>로비로 GOGO</FormHelperText>
          ) : (
            <FormErrorMessage>{`${translation["user.required.nickname"]}`}</FormErrorMessage>
          )}
        </Flex>
        <Flex width={"100%"} justifyContent={"flex-end"}>
          <Button onClick={answerChangeHandler}>GO LOBBY</Button>
        </Flex>
      </FormControl>
    </div>
  );
};
export default Solver;
