import { Progress, css } from "@chakra-ui/react";
import useTimer, { TimerPropsType } from "@hooks/useTimer";

/**
 *
 * @param time number ms
 * @param gaugeColor color array ex) ["green","yello"]
 * @param callback callback execute when interval end (time end)
 * @returns
 */
const Timer = (props: TimerPropsType) => {
  const { colorScheme, percent } = useTimer(props);
  return (
    <Progress
      sx={{
        "& > div:first-type": {
          transitionProperty: "width",
        },
      }}
      colorScheme={colorScheme}
      height="32px"
      value={percent}
    />
  );
};
export default Timer;
