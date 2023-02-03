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
import HistoryScroll from "@components/Scroll/HistoryScroll";
import ObserverBox from "@components/Scroll/ObserverBox";
import Swoosh from "@components/Sound/Swoosh";
import ToggleTheme from "@components/ToggleTheme";
import { css } from "@emotion/react";
import { useRecoilValue } from "recoil";

const Example = () => {
  return (
    <>
      <Logo color="darkviolet"></Logo>
      <HistoryScroll></HistoryScroll>
      <ToggleTheme></ToggleTheme>
    </>
  );
};
export default Example;
