import { Button, useColorMode } from "@chakra-ui/react";
import getUtcTimeStamp from "@common/lib/getUtcTimeStamp";
import { transitionPageAnimationState } from "@common/recoil/recoil.atom";
import AnswerSuccess from "@components/Animation/DrawingSvg/AnswerSuccess";
import DrawingHand from "@components/Animation/DrawingSvg/DrawingHand";
import TalkingHumans from "@components/Animation/DrawingSvg/TalkingHumans";
import Logo from "@components/Animation/Logo/Logo";
import Rollinghexagone from "@components/Animation/RollingHexagone";
import RollingSelect from "@components/Animation/RollingSelect";
import CanvasViewer from "@components/CanvasViewer";
import Description from "@components/Description/Description";
import PostIt from "@components/layout/PostIt/PostIt";
import Progress from "@components/Progress";
import Swoosh from "@components/Sound/Swoosh";
import ToggleTheme from "@components/ToggleTheme";
import { useRecoilValue } from "recoil";

const Example = () => {
  const utcTimeStamp = getUtcTimeStamp();
  const isAnimationEnd = useRecoilValue(transitionPageAnimationState);
  return (
    <>
      <Logo color="darkviolet"></Logo>
      {/* <RollingSelect></RollingSelect> */}
      {/* <Rollinghexagone></Rollinghexagone> */}
      {/* <DrawingHand></DrawingHand>
      <AnswerSuccess></AnswerSuccess>
      <Description></Description>
      <TalkingHumans></TalkingHumans> */}
      {isAnimationEnd && (
        <Progress
          play={"running"}
          startTime={utcTimeStamp}
          time={10000}
          callback={() => {}}
        ></Progress>
      )}
      <ToggleTheme></ToggleTheme>
      <Swoosh></Swoosh>
    </>
  );
};
export default Example;
