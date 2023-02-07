import { Flex } from "@chakra-ui/react";
import ChakraModal from "@components/Modal/ChakraModal";
import { css } from "@emotion/react";
import useAnswer from "@hooks/gameHooks/DRAWEE/useAnswer";
import useSolver from "@hooks/gameHooks/DRAWEE/useSolver";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useTranslation } from "next-i18next";

type AnswerModalPropsType = {
  setIsPlay: Dispatch<SetStateAction<"paused" | "running">>;
  onClose: () => void;
};

type AnswerPropsType = {
  solverNickname: string;
  answer: string;
  isCorrect: boolean;
};

const AnswerResult = ({
  solverNickname,
  answer,
  isCorrect,
}: AnswerPropsType) => {
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
      <div>{`${solverNickname} ${
        isCorrect
          ? t("draw.modal.correct.answer")
          : t("draw.modal.wrong.answer")
      }`}</div>
    </Flex>
  );
};

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
      <AnswerResult
        solverNickname={solverNickname}
        answer={answer}
        isCorrect={isAnswerInArray()}
      ></AnswerResult>
    </ChakraModal>
  );
};
export default AnswerModal;
