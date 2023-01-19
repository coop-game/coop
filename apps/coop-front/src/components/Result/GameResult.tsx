import { Box } from "@chakra-ui/react";
import { relayRaceTypeCheck } from "@common/lib/getGameType";
import getUtcTimeStamp from "@common/lib/getUtcTimeStamp";
import {
  userProfilesSelector,
  userSelector,
  yjsGameState,
} from "@common/recoil/recoil.atom";
import { getChangeGameStateHandler } from "@common/yjsStore/userStore";
import Progress from "@components/Progress";
import { css } from "@emotion/react";
import useGameStateUpdate from "@hooks/gameHooks/updateState/useGameStateUpdate";
import useProfileUpdate from "@hooks/gameHooks/updateState/useProfileUpdate";
import useSyncPageFromGameState from "@hooks/pageMove/useSyncPageFromGameState";
import { CPGameState } from "@types";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import RelayRaceResult from "./RelayRaceResult";
import DraweeResult from "./DraweeResult";
import { useRouter } from "next/router";
import { FormattedMessage, useIntl } from "react-intl";

const Result = () => {
  const gameState = useRecoilValue(yjsGameState);
  const { roomId } = useRecoilValue(userSelector) ?? {};
  const gameChangeHandler = getChangeGameStateHandler<CPGameState>(roomId);
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const { isOwner } = useRecoilValue(userProfilesSelector);
  const [startTime, setStartTime] = useState<number>();
  const router = useRouter();

  useProfileUpdate();
  useGameStateUpdate(roomId);
  useSyncPageFromGameState();
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
      setStartTime(getUtcTimeStamp());
    }
  }, [isPlay]);

  return (
    <Box w="100%" h="100%" position={"relative"}>
      <div>
        <FormattedMessage id={"result"} values={{ locale: router.locale }} />
      </div>
      {isPlay && (
        <Progress
          time={5000}
          callback={timerReset}
          play={"running"}
          startTime={startTime}
        />
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
            /* flex-basis: 500px; */
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
  );
};

export default Result;
