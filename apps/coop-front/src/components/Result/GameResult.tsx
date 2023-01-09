import { Box } from "@chakra-ui/react";
import {
  userProfilesSelector,
  userSelector,
  yjsGameState,
} from "@common/recoil/recoil.atom";
import { getChangeGameStateHandler } from "@common/yjsStore/userStore";
import CanvasViewer from "@components/CanvasViewer";
import Progress from "@components/Progress";
import { css } from "@emotion/react";
import useGameStateUpdate from "@hooks/gameHooks/updateState/useGameStateUpdate";
import useProfileUpdate from "@hooks/gameHooks/updateState/useProfileUpdate";
import useSyncPageFromGameState from "@hooks/pageMove/useSyncPageFromGameState";
import { CPGameDrawee, CPGameRelayRace } from "@types";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const Result = () => {
  const gameState = useRecoilValue(yjsGameState);
  const { roomId } = useRecoilValue(userSelector) ?? {};
  const gameChangeHandler = getChangeGameStateHandler<
    CPGameDrawee | CPGameRelayRace
  >(roomId);
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const { isOwner, userProfiles } = useRecoilValue(userProfilesSelector);
  useProfileUpdate();
  useGameStateUpdate(roomId);
  useSyncPageFromGameState();

  console.log(gameState);
  const [nowPageIndex, setNowPageIndex] = useState<number>(0);
  const timerReset = () => {
    if (nowPageIndex + 1 <= gameState.gamePagesIndex) {
      setNowPageIndex((prev) => {
        return prev + 1;
      });
      setIsPlay(false);
    } else {
      if (isOwner) {
        gameChangeHandler({ path: "/lobby" });
      }
    }
  };

  useEffect(() => {
    if (!isPlay) {
      setIsPlay(true);
    }
  }, [isPlay]);
  return (
    <Box w="100%" h="100%">
      <div>결과</div>
      {isPlay && (
        <Progress time={5000} callback={timerReset} play={"running"} />
      )}
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
            flex-basis: 500px;
            width: 100%;
          `}
        >
          <CanvasViewer pageIndex={nowPageIndex} />
        </div>
      </div>
    </Box>
  );
};

export default Result;
