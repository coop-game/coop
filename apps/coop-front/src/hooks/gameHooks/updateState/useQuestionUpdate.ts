import { yQuestionsState } from "./../../../common/yjsStore/userStore";
import { yjsQuestionsState } from "./../../../common/recoil/recoil.atom";
import { useRecoilState } from "recoil";
import { yjsAgreeState } from "@common/recoil/recoil.atom";
import { useCallback, useEffect } from "react";
import { doc, providerState, yAgreeState } from "@common/yjsStore/userStore";
import { CPGameQuestion } from "@types";

const useQuestionUpdate = () => {
  const [_, setQuestionsState] = useRecoilState(yjsQuestionsState);

  const { provider, room } = providerState;

  const getQuestionList = useCallback(() => {
    return yQuestionsState.toArray();
  }, []);

  useEffect(() => {
    console.log("QuestionsState", _);
  }, [_]);

  useEffect(() => {
    const observeFunction = () => {
      setQuestionsState(getQuestionList());
    };
    yQuestionsState.observe(observeFunction);
    provider?.awareness.on("change", observeFunction);

    return () => {
      yQuestionsState.unobserve(observeFunction);
      provider?.awareness.off("change", observeFunction);
    };
  }, [getQuestionList, provider?.awareness, setQuestionsState]);

  const pushQuestionHandler = (question: CPGameQuestion) => {
    yQuestionsState.push([question]);
  };
  return { pushQuestionHandler };
};
export default useQuestionUpdate;
