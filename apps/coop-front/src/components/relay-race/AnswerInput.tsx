import { Button, Input } from "@chakra-ui/react";
import {
  userSelector,
  yjsRelayRaceAnswerState,
} from "@common/recoil/recoil.atom";
import { doc, providerState } from "@common/yjsStore/userStore";
import Progress from "@components/Progress";
import { CPGameRelayRaceAnswer } from "@types";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { css } from "@emotion/react";
import { Tldraw } from "@coop/draw";
import { useMultiplayerState } from "@hooks/useMultiplayerState";
import NewCursor, { CursorComponent } from "@components/NewCursor";

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
        readOnly={true}
        showPages={false}
        onMount={onMount}
        onChangePage={onChangePage}
        showUI={false}
        // onUndo={onUndo}
        // onRedo={onRedo}
        onChangePresence={onChangePresence}
        // components={{ Cursor: NewCursor as CursorComponent }}
      />
    </div>
  );
}

const AnswerInput = ({
  pushArrayHandler,
}: {
  pushArrayHandler: (element: CPGameRelayRaceAnswer) => void;
}) => {
  const [answer, setAnswer] = useState<string>("");
  const [relayRaceAnswerState, setState] = useRecoilState<
    CPGameRelayRaceAnswer[]
  >(yjsRelayRaceAnswerState);
  const onClick = async () => {
    doc.transact(() => {
      const temp: CPGameRelayRaceAnswer = {
        answer: answer,
        id: doc.clientID,
        username: "Test",
        isDraw: false,
      };
      pushArrayHandler(temp);
    });
    setAnswer("");
  };
  return (
    <div>
      <Progress time={50000} callback={onClick} play={"running"} />
      {relayRaceAnswerState.length > 0 && <Editor />}
      <div>정답 입력</div>
      <div>입력한 정답 {answer}</div>
      <Input
        placeholder="답을 입력해주세요!"
        onChange={(e) => {
          setAnswer(e.target.value);
        }}
        value={answer}
      ></Input>
      <Button onClick={onClick}>안녕하세요</Button>
    </div>
  );
};

export default AnswerInput;
