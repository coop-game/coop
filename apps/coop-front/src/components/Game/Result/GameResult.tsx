import { Box, Flex } from "@chakra-ui/react";
import { relayRaceTypeCheck } from "@common/lib/getGameType";
import getUtcTimeStamp from "@common/lib/getUtcTimeStamp";
import {
  transitionPageAnimationState,
  userProfilesSelector,
  userSelector,
  yjsGameState,
} from "@common/recoil/recoil.atom";
import { getChangeGameStateHandler } from "@common/yjsStore/userStore";
import Progress from "@components/Game/common/Progress";
import { css } from "@emotion/react";
import useGameStateUpdate from "@hooks/gameHooks/updateState/useGameStateUpdate";
import useProfileUpdate from "@hooks/gameHooks/updateState/useProfileUpdate";
import useSyncPageFromGameState from "@hooks/pageMove/useSyncPageFromGameState";
import { CPGameState } from "@types";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import RelayRaceResult from "./RelayRace/RelayRaceResult";
import DraweeResult from "./Drawee/DraweeResult";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const Result = () => {
  const gameState = useRecoilValue(yjsGameState);
  const { roomId } = useRecoilValue(userSelector) ?? {};
  const gameChangeHandler = getChangeGameStateHandler<CPGameState>(roomId);
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const { isOwner } = useRecoilValue(userProfilesSelector);
  const [startTime, setStartTime] = useState<number>();
  const router = useRouter();
  const { t } = useTranslation("common");
  const isAnimationEnd = useRecoilValue(transitionPageAnimationState);

  useProfileUpdate();
  useGameStateUpdate(roomId);
  useSyncPageFromGameState();
  const [nowPageIndex, setNowPageIndex] = useState<number>(0);
  const timerReset = () => {
    if (isPlay && nowPageIndex + 1 <= gameState.gamePagesIndex) {
      setNowPageIndex((prev) => {
        return prev + 1;
      });
      setIsPlay(false);
    } else if (nowPageIndex + 1 > gameState.gamePagesIndex) {
      if (isOwner) {
        gameChangeHandler({ path: "/games/lobby", isGameStart: false });
      }
    }
  };

  useEffect(() => {
    if (!isPlay) {
      setIsPlay(true);
      setStartTime(getUtcTimeStamp());
    }
  }, [isPlay]);

  return (
    <Flex
      w="100%"
      h="100%"
      position={"relative"}
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box w="100%" h="100%" maxW={"1200px"}>
        <Box w="100%">{t("result")}</Box>
        <Box w="100%">
          {isPlay && (
            <Progress
              time={5000}
              callback={timerReset}
              play={isAnimationEnd ? "running" : "pause"}
              startTime={startTime}
            />
          )}
        </Box>
        <div
          css={css`
            display: flex;
            width: 100%;
            height: 100%;
            flex-direction: column;
          `}
        >
          <div
            css={css`
              flex-grow: 1;
              width: 100%;
              height: 100%;
            `}
          >
            {relayRaceTypeCheck(gameState) ? (
              <RelayRaceResult nowPageIndex={nowPageIndex} />
            ) : (
              <DraweeResult nowPageIndex={nowPageIndex} />
            )}
          </div>
        </div>
      </Box>
    </Flex>
  );
};

export default Result;
