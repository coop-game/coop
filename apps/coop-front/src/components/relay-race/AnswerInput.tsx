import { Button, Input } from "@chakra-ui/react";
import { yjsRelayRaceAnswerState } from "@common/recoil/recoil.atom";
import {
  doc,
  getChangeGameStateHandler,
  yRelayRaceAnswerState,
} from "@common/yjsStore/userStore";
import useArrayUpdate from "@hooks/gameHooks/updateState/useArrayUpdate";
import { CPGameRelayRace, CPGameRelayRaceAnswer } from "@types";
import { useState } from "react";
import { useRecoilState } from "recoil";

const AnswerInput = ({
  changeGameStateHandler,
}: {
  changeGameStateHandler: (partialGameState?: Partial<CPGameRelayRace>) => void;
}) => {
  const [answer, setAnswer] = useState<string>();
  const [relayRaceAnswerState, setState] = useRecoilState<
    CPGameRelayRaceAnswer[]
  >(yjsRelayRaceAnswerState);
  //   const changeGameStateHandler =
  //     getChangeGameStateHandler<CPGameRelayRace>(roomId);
  console.log("yjs입니다.", yRelayRaceAnswerState);
  // useArrayUpdate<CPGameRelayRaceAnswer>({
  //   yjsState: yRelayRaceAnswerState,
  //   setState: setState,
  // });
  const onClick = async () => {
    doc.transact(() => {
      const temp: CPGameRelayRaceAnswer = {
        answer: answer,
        id: doc.clientID,
        username: "Test",
      };
      yRelayRaceAnswerState.push([temp]);
    });
    setAnswer("");
  };
  return (
    <div>
      <div>정답 입력</div>
      <div>입력한 정답 {answer}</div>
      <Input
        placeholder="답을 입력해주세요!"
        onChange={(e) => {
          setAnswer(e.target.value);
        }}
      ></Input>
      <Button onClick={onClick}>안녕하세요</Button>
    </div>
  );
};

export default AnswerInput;
