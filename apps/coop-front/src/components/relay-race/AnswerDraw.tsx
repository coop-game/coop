import { Button } from "@chakra-ui/react";
import {
  userSelector,
  yjsRelayRaceAnswerState,
} from "@common/recoil/recoil.atom";
import { doc, providerState } from "@common/yjsStore/userStore";
import NewCursor, { CursorComponent } from "@components/NewCursor";
import Progress from "@components/Progress";
import { Tldraw } from "@coop/draw";
import { css } from "@emotion/react";
import { useMultiplayerState } from "@hooks/useMultiplayerState";
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
      <Button>삭제 버튼</Button>
      <Tldraw
        showMenu={false}
        showPages={false}
        onMount={onMount}
        onChangePage={onChangePage}
        onUndo={onUndo}
        onRedo={onRedo}
        onChangePresence={onChangePresence}
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
  const drawEnd = () => {
    const temp: CPGameRelayRaceAnswer = {
      id: doc.clientID,
      username: "Test",
      isDraw: true,
    };
    pushArrayHandler(temp);
  };
  return (
    <div>
      <Progress time={50000} callback={drawEnd} play={"running"} startTime={startTime} />
      {RelayRaceAnswerState.length > 0 && (
        <div>
          <div>아래에 주어진정답을 그려주세요!</div>
          <div>
            {RelayRaceAnswerState[RelayRaceAnswerState.length - 1].answer}
          </div>
        </div>
      )}
      <Editor pageIndex={gamepageIndex} />
      <Button onClick={drawEnd}>다음으로 넘기기</Button>
    </div>
  );
};

export default AnswerDraw;
