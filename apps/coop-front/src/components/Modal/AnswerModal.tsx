import { Flex, transition } from "@chakra-ui/react";
import ChakraModal from "@components/Modal/ChakraModal";
import { css } from "@emotion/react";
import useAnswer from "@hooks/gameHooks/DRAWEE/useAnswer";
import useSolver from "@hooks/gameHooks/DRAWEE/useSolver";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useTranslation } from "next-i18next";
import React from "react";

type AnswerModalPropsType = {
  setIsPlay: Dispatch<SetStateAction<"paused" | "running">>;
  onClose: () => void;
};

type AnswerPropsType = { solverNickname: string; answer: string };
const Answer = React.memo(({ solverNickname, answer }: AnswerPropsType) => {
  const { t } = useTranslation("common");

  return (
    <Flex
      fontSize={{ base: "2rem", md: "3rem", xl: "4rem" }}
      css={css`
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `}
    >
      <div>
        <>
          {t("draw.modal.answer")} : {answer}
        </>
      </div>
      <div>{`${solverNickname} ${t("draw.modal.correct.answer")}`}</div>
    </Flex>
  );
});

Answer.displayName = "Answer";

const WrongAnswer = React.memo(
  ({ solverNickname, answer }: AnswerPropsType) => {
    const { t } = useTranslation("common");
    return (
      <Flex
        fontSize={{ base: "2rem", md: "3rem", xl: "4rem" }}
        css={css`
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        `}
      >
        <div>
          <>{`${t("draw.modal.answer")} : ${answer}`}</>
        </div>
        <div>{`${solverNickname} 정답을 맞추지 못함`}</div>
      </Flex>
    );
  }
);
WrongAnswer.displayName = "WrongAnswer";

const AnswerModal = (props: AnswerModalPropsType) => {
  const { getSolverId, getSovlerNicknameFromId } = useSolver();
  const { getAnswer, isAnswerInArray } = useAnswer();

  const solverNickname = getSovlerNicknameFromId(getSolverId());
  const answer = getAnswer();

  useEffect(() => {
    props.setIsPlay("paused");
    return () => {
      props.setIsPlay("running");
    };
  }, [props]);

  return (
    <ChakraModal onCloseHandler={props.onClose}>
      {isAnswerInArray() ? (
        <Answer solverNickname={solverNickname} answer={answer} />
      ) : (
        <WrongAnswer
          solverNickname={solverNickname}
          answer={answer}
        ></WrongAnswer>
      )}
    </ChakraModal>
  );
};
export default AnswerModal;
