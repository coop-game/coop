import { transitionPageAnimationState } from "@common/recoil/recoil.atom";
import { css } from "@emotion/react";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";

const rightArm = `M32.204,49.958l14.582-3.76c1.423-0.367,2.794-1.71,3.188-3.125l3.663-13.113c0.223-0.798,0.094-1.615-0.356-2.243   c-0.449-0.629-1.182-1.016-2.011-1.063l-1.565-0.083c-1.512,0-2.981,1.079-3.418,2.509l-2.394,7.829   c-0.219,0.715-1.08,1.526-1.808,1.703l-10.83,2.099c-1.507,0.366-2.721,1.866-2.764,3.414c0,0-0.137,4.736,0.329,5.216   C29.266,49.799,29.884,50.292,32.204,49.958z`;

const bodyWithLeftArm = `M55.615,39.353c-0.603-0.84-1.662-1.502-2.743-1.82l-1.646,5.891c-0.518,1.855-2.248,3.552-4.115,4.034l-14.583,3.76   c-0.693,0.107-1.193,0.15-1.671,0.15c-0.13,0-0.246-0.009-0.366-0.016v19.084v0.503v29.166c0,2.757,2.243,5,5,5h0.353   c2.757,0,5-2.243,5-5V73.938h2.126v26.166c0,2.757,2.243,5,5,5h0.352c2.757,0,5-2.243,5-5V70.938v-0.503v-0.12h0.314   c1.449,0,3.141-0.989,3.853-2.252l6.942-12.324c0.727-1.289,0.62-3.24-0.243-4.441L55.615,39.353z M56.669,55.539l-3.346,5.451   V48.58l3.281,4.708C57.006,53.866,57.038,54.939,56.669,55.539z`;

const head = `M41.908,34.769c0.443,0,0.878-0.035,1.308-0.087l1.829-5.982c0.597-1.955,2.601-3.429,4.661-3.429l1.634,0.084   c0.444,0.025,0.86,0.139,1.256,0.292c0.09-0.56,0.149-1.13,0.149-1.715c0-5.975-4.861-10.836-10.836-10.836   s-10.836,4.861-10.836,10.836S35.933,34.769,41.908,34.769z`;

const questionMark = `M715.720415 207.522102C675.902539 136.26685 603.803606 95.397443 518.015326 95.397443c-129.594189 0-205.287984 72.306782-238.682003 195.401348-20.885213 76.845665 110.976883 131.618411 140.38594 27.173916 15.792407-56.028029 37.099461-79.499576 98.296063-79.499576 33.883437 0 58.475115 13.134401 72.864799 38.912762 15.649063 28.014526 14.18286 62.384309 3.633769 79.571248-17.119363 27.874254-35.489913 44.013758-56.72939 62.663829-44.432528 39.05201-99.619947 88.864031-99.619946 221.809398 0 70.489385 71.537844 71.537844 71.537843 71.537844 39.470779 0 71.537844-32.067064 71.537844-71.537844 0-69.581199 14.880125-82.643928 50.856384-114.224647 25.013518-21.933671 55.960452-49.11066 84.325148-95.35956 39.677604-64.691123 39.399107-152.714544-0.701362-224.324059z`;

const questionMark3 = `M513.19385 757.121218c-47.433535 0-85.859952 38.423345-85.859951 85.859952 0 47.433535 38.426416 85.859952 85.859951 85.859952 47.364935 0 85.791351-38.426416 85.791352-85.859952 0-47.436607-38.426416-85.859952-85.791352-85.859952z`;

const whiteIcon = {
  hidden: {
    pathLength: 0,
    opacity: 0,
    fill: "rgba(255, 255, 255, 0)",
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    fill: "rgba(255, 255, 255, 1)",
  },
};

const AnswerSuccess = () => {
  const isAnimationEnd = useRecoilValue(transitionPageAnimationState);
  const getTransition = () => {
    let delay = 0;
    const duration = 1;
    return (sameDelay = false, addDelay = 0) => {
      const prevDelay = delay + addDelay;
      if (sameDelay === false) delay = delay + duration + addDelay;
      return {
        default: { delay: prevDelay, duration: duration, ease: "linear" },
        fill: {
          delay: delay,
          duration: duration / 3,
          ease: "linear",
        },
      };
    };
  };

  const transition = getTransition();
  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
      `}
    >
      {isAnimationEnd && (
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 105.104 105.104"
          css={css`
            height: 100%;
            width: 100%;
            overflow: visible;
            transform: translate(6%) scale(1.1);

            @media (max-width: 1200px) {
              transform: translate(10%) scale(1.1);
            }
          `}
        >
          <motion.path
            d={head}
            variants={whiteIcon}
            initial="hidden"
            animate="visible"
            stroke={"#fff"}
            strokeWidth="1"
            strokeLinecap={"round"}
            strokeLinejoin={"round"}
            transition={transition()}
          />
          <motion.path
            d={bodyWithLeftArm}
            variants={whiteIcon}
            initial="hidden"
            animate="visible"
            stroke={"#fff"}
            strokeWidth="1"
            strokeLinecap={"round"}
            strokeLinejoin={"round"}
            transition={transition()}
          />

          <motion.g transform="translate(31.7, 14) scale(0.02, 0.02)">
            <motion.path
              d={questionMark}
              variants={{
                hidden: {
                  opacity: 0,
                  fill: "rgba(255, 255, 255, 0)",
                },
                visible: {
                  opacity: [0, 1, 0],
                  fill: "rgba(255, 255, 255, 1)",
                },
              }}
              initial="hidden"
              animate="visible"
              stroke={"#4a895a"}
              strokeWidth="50"
              strokeLinecap={"round"}
              strokeLinejoin={"round"}
              transition={{
                delay: 3,
                duration: 0,
              }}
            />
            <motion.path
              d={questionMark3}
              // variants={{
              //   hidden: {
              //     opacity: [0, 1, 1, 0],
              //     fill: "rgba(255, 255, 255, 0)",
              //   },
              //   visible: {
              //     opacity: [0, 1, 1, 0],
              //     fill: "rgba(255, 255, 255, 1)",
              //   },
              // }}
              // initial="hidden"
              // animate="visible"
              animate={{
                opacity: [0, 1, 1, 0],
                fill: "rgba(255, 255, 255, 0)",
              }}
              stroke={"#4a895a"}
              strokeWidth="50"
              strokeLinecap={"round"}
              strokeLinejoin={"round"}
              transition={{
                delay: 0,
                duration: 1,
                time: [0, 0.1, 0.9, 0],
              }}
            />
          </motion.g>
          <motion.g
            initial={{ rotate: -10, translateX: 0, translateY: 0 }}
            animate={{
              originX: 0,
              originY: 1,
              rotate: 0,
              translateX: 0,
              translateY: 0,
            }}
            transition={{ delay: 3 }}
          >
            <motion.path
              d={rightArm}
              variants={whiteIcon}
              initial="hidden"
              animate="visible"
              stroke={"#4a895a"}
              strokeWidth="1"
              strokeLinecap={"round"}
              strokeLinejoin={"round"}
              transition={transition()}
            />
          </motion.g>
          <motion.g transform="translate(31, 13) scale(0.9, 0.9)">
            <motion.path
              d={`M13,13H11a1,1,0,0,1-1-1V4a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1v8A1,1,0,0,1,13,13Zm1,6a2,2,0,1,0-2,2A2,2,0,0,0,14,19Z`}
              variants={{
                hidden: {
                  opacity: 0,
                  fill: "rgba(255, 255, 255, 0)",
                },
                visible: {
                  opacity: [0, 1],
                  scale: [1.2, 1],
                  fill: "rgba(255, 255, 255, 1)",
                },
              }}
              initial="hidden"
              animate="visible"
              stroke={"#4a895a"}
              strokeWidth="1.5"
              strokeLinecap={"round"}
              strokeLinejoin={"round"}
              transition={{
                delay: 3,
                duration: 0.2,
              }}
            />
          </motion.g>
        </motion.svg>
      )}
    </div>
  );
};

export default AnswerSuccess;
