/** @jsxImportSource @emotion/react */
import TalkingHumans from "./../../../../coop-front/src/components/Animation/DrawingSvg/TalkingHumans";
import { transitionPageAnimationState } from "@common/recoil/recoil.atom";
import { useRecoilState } from "recoil";
import { css } from "@emotion/react";
export default {
  title: "Animations/TalkingHumans",
  component: TalkingHumans,
};

const Template = (args) => {
  const [_, setIsAnimationEnd] = useRecoilState(transitionPageAnimationState);
  setIsAnimationEnd(true);
  return (
    <div
      css={css`
        width: 300px;
        height: 300px;
        position: relative;
      `}
    >
      <TalkingHumans />
    </div>
  );
};

export const Primary = Template.bind({});
