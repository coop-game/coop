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
      borderRadius={"15px"}
      border={"1px solid white"}
      background={"#ffffff85"}
      sx={{
        "& > div:first-type": {
          transitionProperty: "width",
        },
      }}
      colorScheme={colorScheme}
      height="20px"
      value={percent}
    />
  );
};
export default Timer;
