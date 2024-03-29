import { Box, useColorModeValue } from "@chakra-ui/react";
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

  const colorGreen = useColorModeValue("#00b400", "#008000c0");
  const colorOrange = useColorModeValue("#ffb500", "#ffa600c0");
  const colorRed = useColorModeValue("#ff1000", "#ff0000c0");

  return (
    <>
      {isView && (
        <Box
          className="progress-outer"
          onAnimationEnd={() => {
            callback();
          }}
          boxShadow={"dark-lg"}
          css={css`
            width: 100%;
            position: relative;
            /* background: #ffffff45; */
            border-radius: 15px;
            height: 22px;
            overflow: hidden;
            z-index: 100;
            margin: 3px;
          `}
        >
          <Box
            className="progress-inner"
            css={css`
              position: absolute;
              z-index: 1;
              top: 0;
              left: 0;
              transform: translate(0%);
              height: 22px;
              /* overflow: hidden; */
              width: 100%;
              @keyframes progress {
                from {
                  transform: translate(0%);
                  background: ${colorGreen};
                }
                50% {
                  transform: translate(-50%);
                  background: ${colorOrange};
                }
                to {
                  transform: translate(-100%);
                  background: ${colorRed};
                }
              }
              animation-name: progress;
              animation-duration: ${endTime - utcTimeStamp > 0
                ? endTime - utcTimeStamp
                : 0}ms;
              animation-timing-function: linear;
              animation-play-state: ${play};
            `}
          ></Box>
        </Box>
      )}
    </>
  );
};
export default React.memo(Progress);
