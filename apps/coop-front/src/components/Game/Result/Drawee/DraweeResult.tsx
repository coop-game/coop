import { Avatar, Flex, Text, useColorMode } from "@chakra-ui/react";
import {
  userProfilesSelector,
  yjsQuestionsState,
} from "@common/recoil/recoil.atom";
import CanvasViewer from "@components/Tldraw/CanvasViewer";
import { CPGameQuestions } from "@types";
import { useRecoilValue } from "recoil";
import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { useTranslation } from "next-i18next";

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
  const { colorMode } = useColorMode();
  const { t } = useTranslation("common");

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
    setAnswerState(tempAnswerList);
  }, [questionState, userProfiles]);

  return (
    <Flex
      w="100%"
      height="100%"
      position={"relative"}
      flexDirection={{ sm: "column-reverse", md: "row" }}
    >
      <Flex
        w={{ sm: "100%", md: "20%" }}
        h={{ sm: "150px", md: "100%" }}
        maxH="500px"
        flexDirection={{ sm: "row", md: "column" }}
        marginTop={{ sm: "0%", md: "5%" }}
        marginRight={{ sm: "0%", md: "5%" }}
      >
        {answerState && answerState.length > 0 && (
          <Flex
            w={"100%"}
            h={"100%"}
            flexDirection={{ sm: "row", md: "column" }}
            bgColor={colorMode === "light" ? "#E2E0A5" : "#b3b18a"}
            overflow="hidden"
            boxShadow={"dark-lg"}
            borderRadius="8px"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Flex flex={1} direction={"column"} alignItems={"center"}>
              <Text fontSize={"xl"} fontWeight={"extrabold"} textAlign="center">
                {t("drawee.result.question.maker")}
              </Text>
              {answerState[nowPageIndex].questionerNickname && (
                <Flex
                  w="100%"
                  h="100%"
                  direction={"column"}
                  alignItems={"center"}
                >
                  <Avatar
                    size={"xl"}
                    css={css`
                      display: flex;
                      border-radius: 100%;
                      border: 3px solid
                        ${answerState[nowPageIndex].questionerColor};
                    `}
                    src={`/images/avatar/${answerState[nowPageIndex].questionerAvatar}.png`}
                  ></Avatar>
                  <Text textAlign="center">
                    {answerState[nowPageIndex].questionerNickname}
                  </Text>
                </Flex>
              )}
            </Flex>
            <Flex flex={1} direction={"column"}>
              <Text fontSize={"xl"} fontWeight={"extrabold"} textAlign="center">
                {t("drawee.result.question.solver")}
              </Text>
              {answerState[nowPageIndex].solverNickname && (
                <Flex
                  w="100%"
                  h="100%"
                  direction={"column"}
                  alignItems={"center"}
                >
                  <Avatar
                    size={"xl"}
                    css={css`
                      border-radius: 100%;
                      border: 3px solid ${answerState[nowPageIndex].solverColor};
                    `}
                    src={`/images/avatar/${answerState[nowPageIndex].solverAvatar}.png`}
                  ></Avatar>
                  <Text textAlign="center">
                    {answerState[nowPageIndex].solverNickname}
                  </Text>
                </Flex>
              )}
            </Flex>
            <Flex flex={1} direction={"column"}>
              <Text fontSize={"xl"} textAlign="center">
                {t("drawee.result.question.answer")}
              </Text>
              <Text textAlign="center">{answerState[nowPageIndex].answer}</Text>
              {answerState[nowPageIndex].solve ? (
                <Text textAlign="center">
                  {t("drawee.result.question.success")}
                </Text>
              ) : (
                <Text textAlign="center">
                  {t("drawee.result.question.failure")}
                </Text>
              )}
            </Flex>
          </Flex>
        )}
      </Flex>
      {animation && (
        <Flex
          w={{ sm: "100%", md: "75%" }}
          height={{ sm: "500px", md: "100%" }}
          justifyContent={"center"}
          alignItems={"center"}
          marginTop={{ sm: "0%", md: "5%" }}
          marginBottom={{ sm: "3%", md: "0%" }}
        >
          <CanvasViewer pageIndex={nowPageIndex} />
        </Flex>
      )}
    </Flex>
  );
};

export default DraweeResult;
