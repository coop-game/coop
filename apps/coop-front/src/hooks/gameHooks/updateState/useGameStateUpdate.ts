import { yjsGameState } from "../../../common/recoil/recoil.atom";
import { useRecoilState } from "recoil";
import { yGameState } from "@common/yjsStore/userStore";
import { CPGameState } from "@types";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

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
};
export default useGameStateUpdate;
