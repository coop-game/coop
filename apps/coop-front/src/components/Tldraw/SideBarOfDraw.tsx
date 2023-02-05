import { Box, useColorModeValue } from "@chakra-ui/react";
import {
  userProfilesSelector,
  yjsGameState,
  yjsQuestionsState,
} from "@common/recoil/recoil.atom";
import { css } from "@emotion/react";
import { useEffect } from "react";
import { useTranslation } from "next-i18next";
import { useRecoilValue } from "recoil";

export type SideBarOfDraw<T = any> = () => any;

const SideBarOfDraw = () => {
  const { isOwner, userProfiles } = useRecoilValue(userProfilesSelector);
  const questions = useRecoilValue(yjsQuestionsState);
  const gameState = useRecoilValue(yjsGameState);
  const { t } = useTranslation("common");

  const background = useColorModeValue("#ffffffa8", "#0000009f");

  return (
    <Box
      boxShadow={"base"}
      css={css`
        margin: 5px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: ${background};

        border-radius: 8px;
        overflow: hidden;
        pointer-events: none;
        user-select: none;
      `}
    >
      <Box>{`${gameState?.gamePagesIndex + 1} ${t(
        "draw.question.number"
      )}`}</Box>
      <Box
        css={css`
          margin: 0px 5px 0px 5px;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        {t("draw.correct.question.number")}
      </Box>
      <Box
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        {`${questions.filter((v) => v.inputAnswer.includes(v.answer)).length}/${
          questions.length
        }`}
      </Box>
    </Box>
  );
};
export default SideBarOfDraw;
