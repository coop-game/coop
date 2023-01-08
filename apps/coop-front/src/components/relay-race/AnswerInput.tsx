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
      {/* {relayRaceAnswerState.length > 0 && <Editor />} */}
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
