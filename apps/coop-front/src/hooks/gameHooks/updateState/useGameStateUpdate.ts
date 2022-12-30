import { yjsGameState } from "../../../common/recoil/recoil.atom";
import { useRecoilState } from "recoil";
import { yGameState } from "@common/yjsStore/userStore";
import { useCallback, useEffect } from "react";

const useGameStateUpdate = (roomId: string) => {
  const [_, setGameState] = useRecoilState(yjsGameState);

  const observeFunction = useCallback(() => {
    const gameState = yGameState.get(roomId);
    setGameState({ ...gameState });
  }, [roomId, setGameState]);
  useEffect(() => {
    yGameState.observe(observeFunction);
    return () => {
      yGameState.unobserve(observeFunction);
    };
  }, [observeFunction, roomId, setGameState]);
  // useEffect(() => {
  //   const gameState = yGameState.get(roomId);
  //   setGameState({ ...gameState });
  // }, []);
};
export default useGameStateUpdate;
