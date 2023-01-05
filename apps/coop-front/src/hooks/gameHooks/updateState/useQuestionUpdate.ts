import { yQuestionsState } from "./../../../common/yjsStore/userStore";
import { yjsQuestionsState } from "./../../../common/recoil/recoil.atom";
import { useRecoilState } from "recoil";
import { useCallback, useEffect } from "react";
import { providerState } from "@common/yjsStore/userStore";
import { CPGameQuestion } from "@types";
import { Room } from "y-webrtc";

const useQuestionUpdate = () => {
  const [_, setQuestionsState] = useRecoilState(yjsQuestionsState);

  const { provider, room } = providerState;

  const getQuestionList = useCallback(() => {
    return yQuestionsState.toArray();
  }, []);

  useEffect(() => {
    console.log("QuestionsState", _);
  }, [_]);

  const observeFunction = useCallback(
    (eventType: any, transaction: any) => {
      if (transaction === "local" && eventType.updated.length > 0) {
        return;
      }
      // // 마우스 커서
      // // transaction으로 Room이 전송됬고 updated로 데이터가 들어왔다면
      // if (transaction instanceof Room && eventType.updated.length > 0) {
      //   return;
      // }
      setQuestionsState(getQuestionList());
    },
    [getQuestionList, setQuestionsState]
  );

  useEffect(() => {
    yQuestionsState.observe(observeFunction);
    provider?.awareness.on("change", observeFunction);

    return () => {
      yQuestionsState.unobserve(observeFunction);
      provider?.awareness.off("change", observeFunction);
    };
  }, [
    getQuestionList,
    observeFunction,
    provider?.awareness,
    setQuestionsState,
  ]);

  const pushQuestionHandler = (question: CPGameQuestion) => {
    yQuestionsState.push([question]);
  };
  return { pushQuestionHandler };
};
export default useQuestionUpdate;
