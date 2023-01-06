import { Button } from "@chakra-ui/react";
import { userSelector } from "@common/recoil/recoil.atom";
import { doc, providerState } from "@common/yjsStore/userStore";
import NewCursor, { CursorComponent } from "@components/NewCursor";
import Progress from "@components/Progress";
import { Tldraw } from "@coop/draw";
import { css } from "@emotion/react";
import { useMultiplayerState } from "@hooks/useMultiplayerState";
import { CPGameRelayRaceAnswer } from "@types";
import { useRecoilValue } from "recoil";

function Editor({}) {
  const userState = useRecoilValue(userSelector);
  const { onMount, onChangePage, onUndo, onRedo, onChangePresence } =
    useMultiplayerState({
      provider: providerState?.provider,
      room: providerState?.room,
      customUserId: userState?.nickname,
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
        // autofocus
        // disableAssets
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
}: {
  pushArrayHandler: (element: CPGameRelayRaceAnswer) => void;
}) => {
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
      <Progress time={50000} callback={drawEnd} play={"running"} />
      <Editor />
      <Button onClick={drawEnd}></Button>
    </div>
  );
};

export default AnswerDraw;
