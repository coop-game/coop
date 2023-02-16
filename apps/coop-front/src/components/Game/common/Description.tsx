import { useState } from "react";
import DrawingHand from "@components/Animation/DrawingSvg/DrawingHand";
import AnswerSuccess from "@components/Animation/DrawingSvg/AnswerSuccess";
import { css } from "@emotion/react";
import PiTimer from "@components/Timer/PiTimer";
import TalkingHumans from "@components/Animation/DrawingSvg/TalkingHumans";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

type DescriptionPropsType = {
  animationTime?: number;
  maxNumber?: number;
};

const Description = ({
  animationTime = 6,
  maxNumber = 3,
}: DescriptionPropsType) => {
  const { t } = useTranslation("common");
  const [number, setNumber] = useState<number>(0);

  const textArray = [
    "games.main.description.draw",
    "games.main.description.communicate",
    "games.main.description.corrent",
  ];

  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
        position: relative;
      `}
    >
      <h1
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 2.5rem;
        `}
      >
        {t(textArray[number])}
      </h1>
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
          padding-bottom: 100px;
        `}
      >
        {/* {number === 0 && (
            <motion.div
              animate={{ translateX: "-300%" }}
              transition={{ delay: animationTime - 1, duration: 1 }}
            >
              <DrawingHand></DrawingHand>
            </motion.div>
          )} */}
        {number === 0 && <DrawingHand></DrawingHand>}
        {number === 1 && <TalkingHumans></TalkingHumans>}
        {number === 2 && <AnswerSuccess></AnswerSuccess>}
      </div>
    </div>
  );
};
export default Description;
