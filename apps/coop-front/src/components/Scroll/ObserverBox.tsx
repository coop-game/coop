import { css } from "@emotion/react";
import useIntersectionObserver from "@hooks/useInterseptionObserver";
import { useInView, motion, useScroll, useMotionValue } from "framer-motion";
import { RefObject, useEffect, useRef } from "react";

type ObserverBoxPropsType = {
  idx: number;
  rootRef: any;
};

const ObserverBox = ({ idx, rootRef }: ObserverBoxPropsType) => {
  const ref = useRef(null);
  const scale = useMotionValue<number>(1);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log(entry.intersectionRatio);
            console.log(`${idx}??`, entry.intersectionRatio);
            scale.set(1 + entry.intersectionRatio);
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
      <motion.div style={{ scale }}>{idx}</motion.div>
    </div>
  );
};
export default ObserverBox;
