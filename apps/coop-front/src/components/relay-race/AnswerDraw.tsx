import { Box, Button, Flex } from "@chakra-ui/react";
import {
  userSelector,
  userState,
  yjsRelayRaceAnswerState,
} from "@common/recoil/recoil.atom";
import { doc, providerState } from "@common/yjsStore/userStore";
import NewCursor, { CursorComponent } from "@components/NewCursor";
import Progress from "@components/Progress";
import { Tldraw } from "@coop/draw";
import { css } from "@emotion/react";
import { useMultiplayerState } from "@hooks/useMultiplayerState";
import { useTranslation } from "@hooks/useTransitions";
import { CPGameRelayRaceAnswer } from "@types";
import { useRecoilValue } from "recoil";

function Editor({ pageIndex }: { pageIndex: number }) {
  const userState = useRecoilValue(userSelector);
  const { onMount, onChangePage, onUndo, onRedo, onChangePresence } =
    useMultiplayerState({
      provider: providerState?.provider,
      room: providerState?.room,
      customUserId: userState?.nickname,
      color: userState?.color,
      pageIndex: pageIndex,
    });

  return (
    <div
      css={css`
        position: relative;
        width: 100%;
        height: 100%;
      `}
    >
      <Tldraw
        showMenu={false}
        showPages={false}
        onMount={onMount}
        onChangePage={onChangePage}
        onUndo={onUndo}
        onRedo={onRedo}
        // onChangePresence={onChangePresence}
        components={{ Cursor: NewCursor as CursorComponent }}
      />
    </div>
  );
}

const AnswerDraw = ({
  pushArrayHandler,
  gamepageIndex,
  startTime,
}: {
  pushArrayHandler: (element: CPGameRelayRaceAnswer) => void;
  gamepageIndex: number;
  startTime: number;
}) => {
  const RelayRaceAnswerState = useRecoilValue(yjsRelayRaceAnswerState);
  const translation = useTranslation().messages;
  const user = useRecoilValue(userState);
  const drawEnd = () => {
    const temp: CPGameRelayRaceAnswer = {
      id: doc.clientID,
      nickname: user.nickname,
      isDraw: true,
      avatarIndex: user.avatarIndex,
      color: user.color,
    };
    pushArrayHandler(temp);
  };
  return (
    <Box w="100%" h="100%">
      <Progress
        time={50000}
        callback={drawEnd}
        play={"running"}
        startTime={startTime}
      />
      {RelayRaceAnswerState.length > 0 && (
        <div>
          <div>{translation["relay.race.draw.answer"]}</div>
          <div>
            {RelayRaceAnswerState[RelayRaceAnswerState.length - 1].answer}
          </div>
        </div>
      )}
      <Editor pageIndex={gamepageIndex} />
      <Button onClick={drawEnd}>{translation["relay.race.draw.submit"]}</Button>
    </Box>
  );
};

export default AnswerDraw;
