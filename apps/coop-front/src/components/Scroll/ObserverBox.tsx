/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

type ObserverBoxPropsType = {
  value: string;
  rootRef: any;
};

const ObserverBox = ({ value, rootRef }: ObserverBoxPropsType) => {
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
        /* scroll-margin-top: 30px;
        scroll-margin-bottom: 30px; */
        width: 100%;
        height: 30%;
        scroll-snap-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        align-self: center;
        flex: none;
        font-size: 0.8em;
        margin: 0px 10px 0px 10px;
      `}
    >
      <motion.div style={{ scale }}>{value}</motion.div>
    </motion.div>
  );
};
export default ObserverBox;
