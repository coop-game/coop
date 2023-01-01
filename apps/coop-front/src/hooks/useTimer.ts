import { useEffect, useState } from "react";

const color = ["green", "yello", "orange", "red"];

export type TimerPropsType = {
  isStop?: boolean;
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
  isStop = false,
  time,
  gaugeColor = color,
  callback = () => {},
}: TimerPropsType) => {
  const addTime = 100;
  const [timeState, setTimeState] = useState(time);
  const [check, setCheck] = useState(false);
  useEffect(() => {
    let interval = null;
    if (isStop === false) {
      interval = setTimeout(() => {
        if (timeState < 0) {
          clearInterval(interval);
        } else if (timeState === 0) {
          callback();
          setTimeState(time);
        } else {
          setTimeState((prev) => prev - addTime);
        }
      }, addTime);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [callback, time, timeState, isStop]);
  const percent = (timeState / time) * 100;
  const getColorScheme = Math.trunc((percent * color.length) / 100);
  return { colorScheme: gaugeColor[getColorScheme], percent };
};
export default useTimer;
