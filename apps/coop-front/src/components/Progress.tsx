import getUtcTimeStamp from "@common/lib/getUtcTimeStamp";
import { css } from "@emotion/react";
import React from "react";
import { useEffect, useState } from "react";

type ProgressPropsType = {
  startTime: number;
  time: number;
  play: string;
  callback: () => void;
};

const Progress = ({
  startTime,
  time,
  play = "running",
  callback,
}: ProgressPropsType) => {
  const [isView, setIsView] = useState(play === "running");

  useEffect(() => {
    setIsView(play === "running");
  }, [play]);

  const endTime = startTime + time;
  const utcTimeStamp = getUtcTimeStamp();

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
              animation-duration: ${endTime - utcTimeStamp > 0
                ? endTime - utcTimeStamp
                : 0}ms;
              animation-timing-function: linear;
              animation-play-state: ${play};
            `}
          ></div>
        </div>
      )}
    </>
  );
};
export default React.memo(Progress);
