import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import {
  userProfilesSelector,
  yjsGameState,
  yjsQuestionsState,
} from "@common/recoil/recoil.atom";
import {
  doc,
  providerState,
  yQuestionsState,
} from "@common/yjsStore/userStore";
import { css } from "@emotion/react";
import useSolver from "@hooks/gameHooks/DRAWEE/useSolver";
import { useTranslation } from "@hooks/useTransitions";
import { useState } from "react";
import { useRecoilValue } from "recoil";

const Solver = () => {
  const [answer, setAnswer] = useState("");
  const [isError, setIsError] = useState(true);
  const translation = useTranslation().messages;

  const gameState = useRecoilValue(yjsGameState);
  const questionsState = useRecoilValue(yjsQuestionsState);

  const answerChangeHandler = () => {
    doc.transact(() => {
      const gamePagesIndex = gameState.gamePagesIndex;
      const question = yQuestionsState.get(gamePagesIndex);
      if (question === undefined || question.isQuestionEnd === true) return;
      const newQuestion = {
        ...question,
        inputAnswer: [...question.inputAnswer, answer],
        isQuestionEnd: question.answer === answer,
      };
      setAnswer("");
      yQuestionsState.delete(gamePagesIndex);
      yQuestionsState.insert(gamePagesIndex, [newQuestion]);
      console.log(yQuestionsState.toArray());
    });
  };

  const { getSolverId, getSovlerNicknameFromId } = useSolver();

  return (
    <div>
      <div>
        {translation["draw.solver"]} : {getSovlerNicknameFromId(getSolverId())}
      </div>
      {getSolverId() === providerState?.provider?.awareness?.clientID && (
        <FormControl isInvalid={isError}>
          <FormLabel>{translation["draw.answer"]}</FormLabel>
          <Input
            type="text"
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
              setIsError(e.target.value === "");
            }}
          />
          <Flex ml={5}>
            {!isError ? (
              <FormHelperText>
                {translation["draw.input.in.answer"]}
              </FormHelperText>
            ) : (
              <FormErrorMessage>
                {translation["draw.input.required.answer"]}
              </FormErrorMessage>
            )}
          </Flex>
          <Flex width={"100%"} justifyContent={"flex-end"}>
            <Button onClick={answerChangeHandler}>
              {translation["draw.answer.submit"]}
            </Button>
          </Flex>
        </FormControl>
      )}
      <div
        css={css`
          height: 200px;
          background: gray;
          overflow-y: scroll;
        `}
      >
        <div>{translation["draw.answer.history"]}</div>
        {questionsState.length >= gameState?.gamePagesIndex && (
          <div>
            {questionsState[gameState.gamePagesIndex].inputAnswer.map(
              (v, idx) => {
                return <div key={idx}>{v}</div>;
              }
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Solver;
