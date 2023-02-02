import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import {
  userProfilesSelector,
  yjsQuestionsState,
  yjsRelayRaceAnswerState,
} from "@common/recoil/recoil.atom";
import CanvasViewer from "@components/CanvasViewer";
import { CPGameQuestions, CPGameRelayRaceAnswer } from "@types";
import { useRecoilValue } from "recoil";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { css } from "@emotion/react";

type CPGameDraweeResult = {
  solve: boolean;
  answer: string;
  solverAvatar?: number;
  questionerAvatar?: number;
  solverColor?: string;
  solverNickname?: string;
  questionerNickname?: string;
  questionerColor?: string;
};

const DraweeResult = ({ nowPageIndex }: { nowPageIndex: number }) => {
  const questionState = useRecoilValue<CPGameQuestions>(yjsQuestionsState);
  const { userProfiles } = useRecoilValue(userProfilesSelector);
  const [answerState, setAnswerState] = useState<CPGameDraweeResult[]>();
  const [animation, setAnimation] = useState<boolean>(false);
  const animationFlag = document.querySelector(".book");

  useEffect(() => {
    animationFlag.addEventListener("animationend", () => {
      setAnimation(true);
    });
    return () => {
      animationFlag.removeEventListener("animationend", () => {
        setAnimation(false);
      });
    };
  }, []);

  useEffect(() => {
    const tempAnswerList = questionState.map((e) => {
      const findQuestioner = userProfiles.find((user) => {
        return e.questioner === user.id;
      });
      const findSolver = userProfiles.find((user) => {
        return e.solver === user.id;
      });
      const answer: CPGameDraweeResult = {
        solverNickname: findSolver && findSolver.nickname,
        solverAvatar: findSolver && findSolver.avatarIndex,
        solve:
          e.inputAnswer.length > 0 &&
          e.inputAnswer[e.inputAnswer.length - 1] === e.answer
            ? true
            : false,
        solverColor: findSolver && findSolver.color,
        questionerAvatar: findQuestioner && findQuestioner.avatarIndex,
        questionerNickname: findQuestioner && findQuestioner.nickname,
        questionerColor: findQuestioner && findQuestioner.color,
        answer: e.answer,
      };
      return answer;
    });
    console.log(tempAnswerList);
    setAnswerState(tempAnswerList);
  }, [questionState, userProfiles]);

  return (
    <Flex
      w="100%"
      height="100%"
      position={"relative"}
      flexDirection={{ sm: "column-reverse", md: "row" }}
    >
      <Box w="20%" h="100%">
        {answerState && answerState.length > 0 && (
          <Flex w={"100%"} h={"100%"}>
            <Flex flex={1} direction={"column"}>
              <Text fontWeight={"extrabold"}>문제 제출한 사람</Text>
              {answerState[nowPageIndex].questionerNickname && (
                <Flex w="100%" h="100%" direction={"column"}>
                  <Avatar
                    size={"xl"}
                    css={css`
                      border-radius: 100%;
                      border: 3px solid
                        ${answerState[nowPageIndex].questionerColor};
                    `}
                    src={`./images/avatar/${answerState[nowPageIndex].questionerAvatar}.png`}
                  ></Avatar>
                  <Text>{answerState[nowPageIndex].questionerNickname}</Text>
                </Flex>
              )}
            </Flex>
            <Flex flex={1} direction={"column"}>
              <Text fontWeight={"extrabold"}>문제 푼 사람</Text>
              {answerState[nowPageIndex].solverNickname && (
                <Flex w="100%" h="100%" direction={"column"}>
                  <Avatar
                    size={"xl"}
                    css={css`
                      border-radius: 100%;
                      border: 3px solid ${answerState[nowPageIndex].solverColor};
                    `}
                    src={`./images/avatar/${answerState[nowPageIndex].solverAvatar}.png`}
                  ></Avatar>
                  <Text>{answerState[nowPageIndex].solverNickname}</Text>
                </Flex>
              )}
            </Flex>
            <Flex flex={1} direction={"column"}>
              <Text>정답</Text>
              <Text>{answerState[nowPageIndex].answer}</Text>
              {answerState[nowPageIndex].solve ? (
                <Text>풀이성공</Text>
              ) : (
                <Text>풀이못함</Text>
              )}
            </Flex>
          </Flex>
        )}
      </Box>
      <Box></Box>
      {animation && (
        <Box w="80%" height="100%">
          <CanvasViewer pageIndex={nowPageIndex} />
        </Box>
      )}
    </Flex>
  );
};

export default DraweeResult;
