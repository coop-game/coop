/** @jsxImportSource @emotion/react */
import { transitionPageAnimationState } from "@common/recoil/recoil.atom";
import { useRecoilState } from "recoil";
import { css } from "@emotion/react";
import { useState } from "react";
import AnswerResult from "@components/Modal/AnswerModal/AnswerResult";
import ChakraModal from "@components/Modal/ChakraModal";

export default {
  title: "Modal/AnswerModal",
  component: AnswerResult,
};

const Template = (args) => {
  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
        position: relative;
      `}
    >
      <ChakraModal onCloseHandler={() => {}}>
        <AnswerResult
          solverNickname={"solverNickname"}
          answer={"answer"}
          isCorrect={args.isCorrect}
        ></AnswerResult>
      </ChakraModal>
    </div>
  );
};

export const Primary = Template.bind({});
