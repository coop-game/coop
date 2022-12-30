import { Progress } from "@chakra-ui/react";
import { css } from "@emotion/react";
import useTimer, { TimerPropsType } from "@hooks/useTimer";

/**
 *
 * @param time number ms
 * @param gaugeColor color array ex) ["green","yello"]
 * @param callback callback execute when interval end (time end)
 * @returns
 */
const CircleTimer = (props: TimerPropsType) => {
  const { colorScheme, percent } = useTimer(props);

  return (
    <div
      className="pie"
      css={css`
        width: 50px;
        height: 50px;
        /* aspect-ratio: 1; */
        display: inline-grid;
        place-content: center;
        margin: 5px;
        font-size: 25px;
        font-weight: bold;
        font-family: sans-serif;

        &:before {
          content: "";
          position: absolute;
          border-radius: 50%;
          inset: 0;
          background: conic-gradient(
            ${colorScheme} calc(${percent} * 1%),
            #0000 0
          );
        }
      `}
    ></div>
  );
};

export default CircleTimer;
