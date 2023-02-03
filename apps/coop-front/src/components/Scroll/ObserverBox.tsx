import { css } from "@emotion/react";
import { useInView, motion, useScroll, useMotionValue } from "framer-motion";
import { RefObject, useEffect, useRef } from "react";

type ObserverBoxPropsType = {
  idx: number;
  rootRef: any;
};

const ObserverBox = ({ idx, rootRef }: ObserverBoxPropsType) => {
  const ref = useRef(null);
  const defaultScale = 1;
  const scale = useMotionValue<number>(defaultScale);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            scale.set(defaultScale + entry.intersectionRatio);
          }
        });
      },
      {
        root: rootRef.current,
        rootMargin: "-20% 0px -20% 0px",
        threshold: new Array(100).fill(null).map((_, idx) => idx / 100),
      }
    );
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <motion.div
      className="box_scroll"
      ref={ref}
      css={css`
        scroll-margin-top: 75px;
        scroll-margin-bottom: 75px;
        width: 100%;
        height: 100px;
        scroll-snap-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        /* flex: none; */
        font-size: 30px;
      `}
    >
      <motion.div style={{ scale }}>{idx}</motion.div>
    </motion.div>
  );
};
export default ObserverBox;
