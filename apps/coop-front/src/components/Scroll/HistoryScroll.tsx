import { Box, Button, Flex, useColorModeValue } from "@chakra-ui/react";
import { css } from "@emotion/react";
import {
  motion,
  useScroll,
  useTransform,
  useViewportScroll,
  useInView,
} from "framer-motion";
import { useEffect, useRef } from "react";
import ObserverBox from "./ObserverBox";
import ScrollBottomButton from "./ScrollButtonButton";

const HistoryScroll = ({ history }: { history: string[] }) => {
  const rootRef = useRef(null);
  return (
    <div
      css={css`
        position: relative;
        width: 100%;
      `}
    >
      <div
        className="history_scroll"
        ref={rootRef}
        css={css`
          overflow: hidden scroll;
          width: 100%;
          height: 60px;
          flex-flow: column nowrap;
          scroll-snap-type: y mandatory;
          border-radius: 8px;
        `}
      >
        {history.map((v, idx) => {
          return <ObserverBox key={idx} rootRef={rootRef} value={v} />;
        })}
        <ObserverBox rootRef={rootRef} value={""} />
      </div>
      <ScrollBottomButton
        rootRef={rootRef}
        input={history}
      ></ScrollBottomButton>
    </div>
  );
};
export default HistoryScroll;
