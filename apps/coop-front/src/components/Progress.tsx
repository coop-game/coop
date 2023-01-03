import { css } from "@emotion/react";
import { useEffect, useState } from "react";

type ProgressPropsType = {
  time: number;
  play: string;
  callback: () => void;
};

const Progress = ({ time, play = "running", callback }: ProgressPropsType) => {
  const [isView, setIsView] = useState(play === "running");

  useEffect(() => {
    setIsView(play === "running");
  }, [play]);
  return (
    <>
      {isView && (
        <div
          className="progress-outer"
          onAnimationEnd={() => {
            callback();
          }}
          css={css`
            border-radius: 4px;
            border: 4px solid black;
            width: 100%;
            height: 30px;
            background: white;
            position: relative;
            overflow: hidden;
          `}
        >
          <div
            className="progress-inner"
            css={css`
              position: absolute;
              top: 0;
              left: 0;
              transform: translate(-100%);
              height: 22px;
              width: 100%;
              background: white;
              @keyframes progress {
                from {
                  transform: translate(0%);
                  background: green;
                }
                50% {
                  transform: translate(-50%);
                  background: orange;
                }
                to {
                  transform: translate(-100%);
                  background: red;
                }
              }
              animation-name: progress;
              animation-duration: ${time}ms;
              animation-timing-function: linear;
              animation-play-state: ${play};
            `}
          ></div>
        </div>
      )}
    </>
  );
};
export default Progress;
