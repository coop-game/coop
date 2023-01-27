import { css } from "@emotion/react";
import { useEffect, useRef } from "react";

type PiTimerPropsType = {
  onclickHandler: () => void;
  animtionEndHandler: () => void;
  // second time
  animationTime?: number;
  isPlay: boolean;
};

/**
 *
 * @param `animationTime` second time => default is `5s`
 * @returns
 */
const PiTimer = ({
  onclickHandler,
  animtionEndHandler,
  animationTime = 5,
  isPlay,
}: PiTimerPropsType) => {
  return (
    <div
      onClick={onclickHandler}
      css={css`
        width: 100%;
        height: 100%;
        position: relative;
        user-select: none;
      `}
    >
      <div
        className="timer"
        css={css`
          ${timer}
          z-index:1;
          animation-duration: ${animationTime}s;
          ${isPlay === false ? "animation: none;" : ""}
        `}
      >
        <div
          className="mask"
          onAnimationEnd={() => {
            animtionEndHandler();
          }}
          css={css`
            ${mask}
            animation-duration: ${animationTime}s;
            ${isPlay === false ? "animation: none;" : ""}
            ${isPlay === false ? "background: #eee;" : ""}
          `}
        ></div>
      </div>
      <div className="inner_circle" css={inner_circle} />
    </div>
  );
};
export default PiTimer;

const timer = css`
  background: -webkit-linear-gradient(left, skyBlue 50%, #eee 50%);
  /* Foreground color, Background colour */
  border-radius: 100%;
  height: 100%;
  /* Height and width */
  position: relative;
  width: 100%;
  /* Height and width */
  animation-name: time;
  animation-timing-function: linear;
  transform: rotate(0deg);
  @keyframes time {
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
`;

const mask = css`
  border-radius: 100% 0 0 100% / 50% 0 0 50%;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 50%;

  animation-name: mask;
  animation-timing-function: linear;
  /* Animation time and number of steps (halved) */
  transform-origin: 100% 50%;
  transform: rotate(0deg);
  @keyframes mask {
    0% {
      background: #eee;
      /* Background colour */
      transform: rotate(0deg);
    }
    50% {
      background: #eee;
      /* Background colour */
      transform: rotate(-180deg);
    }
    50.01% {
      background: skyBlue;
      /* Foreground colour */
      transform: rotate(0deg);
    }
    100% {
      background: skyBlue;
      /* Foreground colour */
      transform: rotate(-180deg);
    }
  }
`;

const inner_circle = css`
  position: absolute;
  z-index: 10;
  top: calc(20%);
  left: calc(20%);
  background: white;
  border-radius: 100%;
  width: 60%;
  height: 60%;
  &:hover {
    transition-duration: 0.5s;
    background: #b9e7f9;
  }
`;
