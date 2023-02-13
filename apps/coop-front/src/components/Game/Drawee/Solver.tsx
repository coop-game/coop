import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { yjsGameState, yjsQuestionsState } from "@common/recoil/recoil.atom";
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
import { useTranslation } from "next-i18next";
import AnswerHistory from "./AnswerHistory";
import Image from "next/image";
import { isSpecialCharacters } from "@common/regex";

const Solver = () => {
  const [answer, setAnswer] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(true);

  const { t } = useTranslation("common");

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
    });
  };

  const { getSolverId, getSovlerNicknameFromId } = useSolver();

  return (
    <Flex
      maxH={200}
      css={css`
        width: 100%;
        height: 100%;
        padding: 5px;
        flex-direction: column;
        gap: 10px;
      `}
    >
      <Box
        css={css`
          border-radius: 15px;
        `}
      >
        {t("draw.solver")} : {getSovlerNicknameFromId(getSolverId())}
      </Box>
      <AnswerHistory />
      {getSolverId() === providerState?.provider?.awareness?.clientID && (
        <FormControl isInvalid={isError}>
          <FormLabel>{t("draw.answer")}</FormLabel>
          <Flex
            css={css`
              justify-content: center;
              align-items: center;
              gap: 5px;
            `}
          >
            <Input
              type="text"
              value={answer}
              height={"45px"}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  answerChangeHandler();
                }
              }}
              onChange={(e) => {
                if (
                  e.target.value.trim().length > 0 &&
                  !isSpecialCharacters(e.target.value.trim())
                ) {
                  setAnswer(e.target.value.trim().slice(0, 20));
                }
                setIsError(e.target.value === "" || e.target.value.length > 20);
              }}
            />
            <Button height={"45px"} onClick={answerChangeHandler}>
              {t("draw.answer.submit")}
            </Button>
          </Flex>
          <Flex ml={5}>
            {!isError ? (
              <FormHelperText>{t("draw.input.in.answer")}</FormHelperText>
            ) : (
              <>
                <FormErrorMessage>
                  {t("draw.input.required.answer")}
                </FormErrorMessage>
              </>
            )}
          </Flex>
        </FormControl>
      )}
    </Flex>
  );
};
export default Solver;
