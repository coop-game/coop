import { Flex } from "@chakra-ui/react";
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

const HistoryScroll = () => {
  const array = new Array(5).fill(null).map((_, idx) => idx);
  const rootRef = useRef(null);
  return (
    <motion.div
      ref={rootRef}
      css={css`
        overflow: hidden scroll;
        width: 256px;
        height: 300px;
        flex-flow: column nowrap;
        scroll-snap-type: y mandatory;
        border-radius: 20px;
      `}
    >
      {array.map((v, idx) => {
        return (
          <ObserverBox key={idx} rootRef={rootRef} idx={idx}></ObserverBox>
        );
      })}
    </motion.div>
  );
};
export default HistoryScroll;
