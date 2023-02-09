import { transitionPageAnimationState } from "@common/recoil/recoil.atom";
import PutPin from "@components/Animation/PutPin";
import { useRecoilState } from "recoil";

const MockPutPin = () => {
  const [_, setAnimationEnd] = useRecoilState(transitionPageAnimationState);
  setAnimationEnd(true);

  return <PutPin />;
};
export default {
  title: "Animations/PutPin",
  component: PutPin,
};

const Template = (args) => <MockPutPin />;

export const Primary = Template.bind({});
