import { css } from "@emotion/react";
import { motion } from "framer-motion";

const Rollinghexagone = () => {
  const height = 100;
  const sides = ["red", "green", "yellow", "orange", "blue", "black"];
  return (
    <motion.div
      css={css`
        transform-style: preserve-3d;
      `}
      animate={{
        transitionEnd: {
          transform: "none",
        },
      }}
    >
      <motion.div
        className="hexagone animate"
        css={css`
          transform-style: preserve-3d;
        `}
        animate={{
          //   rotateX: 360 * 50,
          boxShadow: "10px 10px 0 rgba(0, 0, 0, 0.2)",
          background: "skyBlue",
          transitionEnd: {
            transform: "none",
          },
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        <div className="top">
          <div className="face"></div>
          <div className="face"></div>
          <div className="face"></div>
        </div>

        <div className="bottom">
          <div className="face"></div>
          <div className="face"></div>
          <div className="face"></div>
        </div>

        <motion.div
          className="side-faces"
          css={css`
            transform-style: preserve-3d;
          `}
          animate={{
            position: "relative",
            height: height,
            width: 300,
            transitionEnd: {
              transform: "none",
            },
            // rotateY: 70,
          }}
        >
          {sides.map((color, idx) => {
            return (
              <motion.div
                key={idx}
                css={css`
                  transform-style: preserve-3d;
                `}
                animate={{
                  zIndex: 10 - idx,
                  position: "absolute",
                  height: height,
                  width: 300,
                  rotateX: idx * -60,
                  translateZ: 500,
                  background: color,
                  transitionEnd: {
                    // temp workaround to fix trailing opacity and transform
                    x: 0,
                    y: 0,
                    z: 500,
                  },
                }}
              >
                side {idx}
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
      <motion.div
        animate={{
          //   position: "fixed",
          height: height,
          width: 300,
          //   rotateX: 2 * -60,
          rotateX: 50,
          rotateY: 50,
          background: "violet",
          //   transitionEnd: {
          //     transform: "none",
          //   },
          opacity: 1,
          x: 0,
          transitionEnd: {
            // temp workaround to fix trailing opacity and transform
            x: 0,
            y: 0,
            z: 5000,
          },
        }}
      >
        adsffadsafds
      </motion.div>
    </motion.div>
  );
};
export default Rollinghexagone;
