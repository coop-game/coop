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
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import { FormattedMessage, useIntl } from "react-intl";

const Solver = () => {
  const [answer, setAnswer] = useState("");
  const [isError, setIsError] = useState(true);

  const gameState = useRecoilValue(yjsGameState);
  const questionsState = useRecoilValue(yjsQuestionsState);

  const router = useRouter();

  const { formatMessage } = useIntl();
  const drawSolver = formatMessage({ id: "draw.solver" });

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
    });
  };

  const { getSolverId, getSovlerNicknameFromId } = useSolver();

  return (
    <div>
      <div>
        {drawSolver} : {getSovlerNicknameFromId(getSolverId())}
      </div>
      {getSolverId() === providerState?.provider?.awareness?.clientID && (
        <FormControl isInvalid={isError}>
          <FormLabel>{formatMessage({ id: "draw.answer" })}</FormLabel>
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
                <FormattedMessage
                  id="draw.input.in.answer"
                  values={{ locale: router.locale }}
                />
              </FormHelperText>
            ) : (
              <FormErrorMessage>
                <FormattedMessage
                  id="draw.input.required.answer"
                  values={{ locale: router.locale }}
                />
              </FormErrorMessage>
            )}
          </Flex>
          <Flex width={"100%"} justifyContent={"flex-end"}>
            <Button onClick={answerChangeHandler}>
              <FormattedMessage
                id="draw.answer.submit"
                values={{ locale: router.locale }}
              />
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
        <div>
          <FormattedMessage
            id="draw.answer.history"
            values={{ locale: router.locale }}
          />
        </div>
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
