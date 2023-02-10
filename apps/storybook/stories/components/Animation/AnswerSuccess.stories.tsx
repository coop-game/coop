import AnswerSuccess from "@components/Animation/DrawingSvg/AnswerSuccess";
import { transitionPageAnimationState } from "@common/recoil/recoil.atom";
import { useRecoilState } from "recoil";

export default {
  title: "Animations/AnswerSuccess",
  component: AnswerSuccess,
};
const Template = (args) => {
  const [_, setIsAnimationEnd] = useRecoilState(transitionPageAnimationState);
  setIsAnimationEnd(true);
  return <AnswerSuccess></AnswerSuccess>;
};
export const Primary = Template.bind({});
