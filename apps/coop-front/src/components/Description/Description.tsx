import { useEffect, useRef, useState } from "react";
import DrawingHand from "@components/Animation/DrawingSvg/DrawingHand";
import AnswerSuccess from "@components/Animation/DrawingSvg/AnswerSuccess";
import { css } from "@emotion/react";
import PiTimer from "@components/Timer/PiTimer";
import TalkingHumans from "@components/Animation/DrawingSvg/TalkingHumans";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import Transition from "@components/Animation/PageTransition/Transition";
import { motion } from "framer-motion";

type DescriptionPropsType = {
  animationTime?: number;
  maxNumber?: number;
};

const Description = ({
  animationTime = 6,
  maxNumber = 3,
}: DescriptionPropsType) => {
  const [number, setNumber] = useState<number>(0);

  const textArray = [
    "main.description.draw",
    "main.description.communicate",
    "main.description.corrent",
  ];

  const router = useRouter();

  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
        position: relative;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 2rem;
        `}
      >
        <FormattedMessage
          id={textArray[number]}
          values={{ locale: router.locale }}
        ></FormattedMessage>
      </div>
      <div
        css={css`
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: flex-end;
          position: absolute;
          gap: 30px;
        `}
      >
        {new Array(maxNumber).fill(null).map((_, idx) => {
          return (
            <div
              key={idx}
              css={css`
                width: 35px;
                height: 35px;
              `}
            >
              <PiTimer
                isPlay={idx === number}
                animationTime={animationTime}
                onclickHandler={() => {
                  setNumber(idx);
                }}
                animtionEndHandler={() => {
                  setNumber((prev) => (prev + 1) % maxNumber);
                }}
              ></PiTimer>
            </div>
          );
        })}
      </div>
      <div
        css={css`
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding-bottom: 60px;
        `}
      >
        {/* <motion.div exit={{ translateX: 100 }} transition={{ duration: 1 }}>
          <DrawingHand></DrawingHand>
        </motion.div> */}
        {number === 0 && (
          <motion.div exit={{ translateX: 100 }} transition={{ duration: 1 }}>
            <DrawingHand></DrawingHand>
          </motion.div>
        )}
        {number === 1 && <TalkingHumans></TalkingHumans>}
        {number === 2 && <AnswerSuccess></AnswerSuccess>}
      </div>
    </div>
  );
};
export default Description;
