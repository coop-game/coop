import { yQuestionsState } from "./../../../common/yjsStore/userStore";
import { yjsQuestionsState } from "./../../../common/recoil/recoil.atom";
import { useRecoilState } from "recoil";
import useArrayUpdate from "./useArrayUpdate";

const useQuestionUpdate = () => {
  const [_, setState] = useRecoilState(yjsQuestionsState);
  const yjsState = yQuestionsState;

  const { pushArrayHandler } = useArrayUpdate({ setState, yjsState });

  return { pushQuestionHandler: pushArrayHandler };
};
export default useQuestionUpdate;
