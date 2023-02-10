import { Flex } from "@chakra-ui/react";
import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */
import { useTranslation } from "next-i18next";

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
export default AnswerResult;
