import { css } from "@emotion/react";
import { motion } from "framer-motion";

const LetterLineRightE = () => {
  return (
    <motion.g>
      <motion.svg
        width="397"
        height="156"
        viewBox="0 0 397 156"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        css={css`
          z-index: 1;
          position: absolute;
          top: 0;
          left: 0;
        `}
      >
        <motion.line
          x1="330.5"
          y1="60.5"
          x2="376.5"
          y2="60.5"
          // stroke="black"
          stroke-width="9"
          stroke-linecap="round"
        />
        <motion.line
          x1="330.5"
          y1="61.5"
          x2="330.5"
          y2="125.5"
          // stroke="black"
          stroke-width="9"
          stroke-linecap="round"
        />
        <motion.line
          x1="330.5"
          y1="125.5"
          x2="376.5"
          y2="125.5"
          // stroke="black"
          stroke-width="9"
          stroke-linecap="round"
        />
        <motion.line
          x1="330.5"
          y1="94.5"
          x2="376.5"
          y2="94.5"
          // stroke="black"
          stroke-width="9"
          stroke-linecap="round"
        />
        <motion.line
          x1="376.5"
          y1="61.5"
          x2="376.5"
          y2="94.5"
          // stroke="black"
          stroke-width="9"
          stroke-linecap="round"
        />
        <motion.g
          animate={{
            translateX: ["3px", "0px", "-3px", "0px", "3px"],
            translateY: ["-2px", "0px", "-2px", "0px", "-2px"],
          }}
          transition={{
            delay: 0,
            duration: 2.5,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
          }}
        >
          <motion.line
            x1="363"
            y1="82"
            x2="363"
            y2="76"
            // stroke="black"
            stroke-width="6"
            stroke-linecap="square"
          />
          <motion.line
            x1="344"
            y1="82"
            x2="344"
            y2="76"
            // stroke="black"
            stroke-width="6"
            stroke-linecap="square"
          />
        </motion.g>
      </motion.svg>
      <motion.svg
        width="397"
        height="156"
        viewBox="0 0 397 156"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        css={css`
          z-index: 10;
          position: absolute;
          top: 0;
          left: 0;
        `}
      >
        {/* 연필 겹치는 부분*/}
        <motion.line
          x1="326"
          y1="67"
          x2="335"
          y2="67"
          // stroke="black"
          stroke-width="15"
        />
      </motion.svg>
    </motion.g>
  );
};

export default LetterLineRightE;
