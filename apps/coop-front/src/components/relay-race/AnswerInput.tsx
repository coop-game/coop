import { Button, Input } from "@chakra-ui/react";
import { yjsRelayRaceAnswerState } from "@common/recoil/recoil.atom";
import { doc } from "@common/yjsStore/userStore";
import Progress from "@components/Progress";
import { CPGameRelayRaceAnswer } from "@types";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import CanvasViewer from "@components/CanvasViewer";
import { css } from "@emotion/react";
import { userState } from "@common/recoil/recoil.atom";

const AnswerInput = ({
  pushArrayHandler,
  gamepageIndex,
  startTime,
}: {
  pushArrayHandler: (element: CPGameRelayRaceAnswer) => void;
  gamepageIndex: number;
  startTime: number;
}) => {
  const [answer, setAnswer] = useState<string>("");
  const [relayRaceAnswerState, setState] = useRecoilState<
    CPGameRelayRaceAnswer[]
  >(yjsRelayRaceAnswerState);
  const user = useRecoilValue(userState);

  const onClick = async () => {
    doc.transact(() => {
      const temp: CPGameRelayRaceAnswer = {
        answer: answer,
        id: doc.clientID,
        nickname: user.nickname,
        isDraw: false,
        avatarIndex: user.avatarIndex,
        color: user.color,
      };
      pushArrayHandler(temp);
    });
    setAnswer("");
  };
  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
      `}
    >
      <Progress
        time={50000}
        callback={onClick}
        play={"running"}
        startTime={startTime}
      />
      <div
        css={css`
          display: flex;
          width: 100%;
          height: 100%;
          flex-direction: column;
        `}
      >
        {relayRaceAnswerState.length > 0 && (
          <div
            css={css`
              flex-grow: 1;
              flex-basis: 500px;
              width: 100%;
            `}
          >
            <CanvasViewer pageIndex={gamepageIndex - 1} />
          </div>
        )}
      </div>
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
