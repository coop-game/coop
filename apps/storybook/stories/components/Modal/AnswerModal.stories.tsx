/** @jsxImportSource @emotion/react */
import { transitionPageAnimationState } from "@common/recoil/recoil.atom";
import { useRecoilState } from "recoil";
import { css } from "@emotion/react";
import { useState } from "react";
import AnswerResult from "@components/Modal/AnswerModal/AnswerResult";
import AnswerModalFromChakra from "@components/Modal/AnswerModal/AnswerModalFromChakra";

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
      <AnswerModalFromChakra onCloseHandler={() => {}}>
        <AnswerResult
          solverNickname={"solverNickname"}
          answer={"answer"}
          isCorrect={args.isCorrect}
        ></AnswerResult>
      </AnswerModalFromChakra>
    </div>
  );
};

export const Primary = Template.bind({});
