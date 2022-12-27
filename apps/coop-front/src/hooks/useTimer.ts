import { useEffect, useState } from "react";

const color = ["green", "yello", "orange", "red"];

export type TimerPropsType = {
  time: number;
  gaugeColor: string[];
  callback: () => void;
};

/**
 *
 * @param time number ms
 * @param gaugeColor color array ex) ["green","yello"]
 * @param callback callback execute when interval end (time end)
 * @returns
 */

const useTimer = ({
  time,
  gaugeColor = color,
  callback = () => {},
}: TimerPropsType) => {
  const addTime = 100;
  const [timeState, setTimeState] = useState(time);
  useEffect(() => {
    const interval = setTimeout(() => {
      if (timeState < 0) {
        callback();
        clearInterval(interval);
      } else {
        setTimeState((prev) => prev - addTime);
      }
    }, addTime);
    return () => {
      clearInterval(interval);
    };
  }, [callback, time, timeState]);
  const percent = (timeState / time) * 100;
  const getColorScheme = Math.trunc(percent * color.length);
  return { colorScheme: gaugeColor[getColorScheme], percent };
};
export default useTimer;
