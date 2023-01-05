import { Button, Input } from "@chakra-ui/react";
import { yjsRelayRaceAnswerState } from "@common/recoil/recoil.atom";
import { doc, yRelayRaceAnswerState } from "@common/yjsStore/userStore";
import useArrayUpdate from "@hooks/gameHooks/updateState/useArrayUpdate";
import { CPGameRelayRaceAnswer } from "@types";
import { useState } from "react";
import { useRecoilState } from "recoil";

const AnswerInput = () => {
  const [answer, setAnswer] = useState<string>();
  const [relayRaceAnswerState, setRelayRaceAnswerState] = useRecoilState<
    CPGameRelayRaceAnswer[]
  >(yjsRelayRaceAnswerState);
  const { pushArrayHandler } = useArrayUpdate<CPGameRelayRaceAnswer>({
    yjsState: yRelayRaceAnswerState,
    setState: setRelayRaceAnswerState,
  });
  const onClick = () => {
    const temp: CPGameRelayRaceAnswer = {
      answer: answer,
      id: doc.clientID,
      username: "Test",
    };
    pushArrayHandler(temp);
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
