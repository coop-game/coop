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

const BoxScroll = ({ idx, rootRef }: { idx: number; rootRef: any }) => {
  const ref = useRef(null);
  //   const { scrollYProgress } = useScroll({
  //     target: ref,
  //     offset: ["end end", "start start"],
  //   });

  const isInView = useInView(ref, {
    root: rootRef,
    margin: "-20% 0px -20% 0px",
    amount: 1,
  });

  return (
    <div
      className="box_scroll"
      ref={ref}
      css={css`
        scroll-margin-top: 75px;
        scroll-margin-bottom: 75px;
        width: 100%;
        height: 100px;
        scroll-snap-align: center;
        /* flex: none; */
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      <motion.div animate={{ scale: 1 + (isInView ? 1 : 0) }}>{idx}</motion.div>
    </div>
  );
};

const HistoryScroll = () => {
  const array = new Array(5).fill(null).map((_, idx) => idx);
  const rootRef = useRef(null);
  return (
    <motion.div
      ref={rootRef}
      css={css`
        overflow: hidden scroll;
        outline: 1px dashed lightgray;

        width: 256px;
        height: 300px;
        flex-flow: column nowrap;
        scroll-snap-type: y mandatory;
        & > div:nth-child(even) {
          background: lightblue;
        }

        & > div:nth-child(odd) {
          background: tomato;
        }
      `}
    >
      {array.map((v, idx) => {
        return <BoxScroll key={idx} rootRef={rootRef} idx={idx}></BoxScroll>;
      })}
    </motion.div>
  );
};
export default HistoryScroll;
