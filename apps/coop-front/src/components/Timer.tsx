import { Progress } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const color = ["green", "yello", "orange", "red"];

type TimerPropsType = {
  time: number;
  gaugeColor: string[];
  callback: () => void;
};

const defaultCallback = () => {};

/**
 *
 * @param time number ms
 * @param gaugeColor color array ex) ["green","yello"]
 * @param callback callback execute when interval end (time end)
 * @returns
 */
const Timer = ({
  time,
  gaugeColor = color,
  callback = defaultCallback,
}: TimerPropsType) => {
  const addTime = 100;
  const [timeState, setTimeState] = useState(0);
  useEffect(() => {
    const interval = setTimeout(() => {
      if (timeState > time) {
        callback();
        clearInterval(interval);
      } else {
        setTimeState((prev) => prev + addTime);
      }
    }, addTime);
    return () => {
      clearInterval(interval);
    };
  }, [callback, time, timeState]);
  const percent = (timeState / time) * 100;
  const getColorScheme = Math.trunc(percent * color.length);
  return (
    <Progress
      colorScheme={gaugeColor[getColorScheme]}
      height="32px"
      value={percent}
    />
  );
};
export default Timer;
