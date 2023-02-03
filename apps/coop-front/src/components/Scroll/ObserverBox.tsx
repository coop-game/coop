import { css } from "@emotion/react";
import { useInView, motion, useScroll } from "framer-motion";
import { RefObject, useRef } from "react";

type ObserverBoxPropsType = {
  idx: number;
  rootRef: any;
};

const ObserverBox = ({ idx, rootRef }: ObserverBoxPropsType) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    root: rootRef,
    margin: "-20% 0px -20% 0px",
    amount: "all",
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
export default ObserverBox;
