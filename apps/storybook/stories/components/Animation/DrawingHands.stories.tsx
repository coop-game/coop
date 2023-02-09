/** @jsxImportSource @emotion/react */
import DrawingHand from "./../../../../coop-front/src/components/Animation/DrawingSvg/DrawingHand";
import { transitionPageAnimationState } from "@common/recoil/recoil.atom";
import { useRecoilState } from "recoil";
export default {
  title: "Animations/DrawingHand",
  component: DrawingHand,
};

const Template = (args) => {
  const [_, setIsAnimationEnd] = useRecoilState(transitionPageAnimationState);
  setIsAnimationEnd(true);
  return <DrawingHand />;
};

export const Primary = Template.bind({});
