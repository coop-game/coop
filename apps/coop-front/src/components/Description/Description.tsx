import { useEffect, useRef, useState } from "react";
import DrawingHand from "@components/Animation/DrawingSvg/DrawingHand";
import AnswerSuccess from "@components/Animation/DrawingSvg/AnswerSuccess";
import { css } from "@emotion/react";
import PiTimer from "@components/Timer/PiTimer";

type DescriptionPropsType = {
  animationTime?: number;
};

const Description = ({ animationTime = 5 }: DescriptionPropsType) => {
  const [number, setNumber] = useState<number>(0);
  const maxNumber = 2;

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
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          gap: 30px;
          position: absolute;
        `}
      >
        {new Array(maxNumber).fill(null).map((_, idx) => {
          return (
            <div
              key={idx}
              css={css`
                width: 40px;
                height: 40px;
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
        `}
      >
        {number === 0 && <DrawingHand></DrawingHand>}
        {number === 1 && <AnswerSuccess></AnswerSuccess>}
      </div>
    </div>
  );
};
export default Description;
