import { yjsSelectGameType } from "@common/recoil/recoil.atom";
import { ySelectGameType } from "@common/yjsStore/userStore";
import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";

const useGameSelector = () => {
  const [_, setGameSelector] = useRecoilState(yjsSelectGameType);

  const observeFunction = useCallback(() => {
    const select = ySelectGameType.get("gameIndex");
    setGameSelector(select);
  }, [setGameSelector]);
  useEffect(() => {
    const select = ySelectGameType.get("gameIndex");
    ySelectGameType.observe(observeFunction);
    return () => {
      ySelectGameType.unobserve(observeFunction);
    };
  }, [observeFunction, setGameSelector]);
  useEffect(() => {
    const select = ySelectGameType.get("gameIndex");
    setGameSelector(select);
  }, [setGameSelector]);
};

export default useGameSelector;
