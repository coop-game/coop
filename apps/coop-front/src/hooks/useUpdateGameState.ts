import { yjsGameState } from "./../common/recoil/recoil.atom";
import { useRecoilState } from "recoil";
import { yGameState } from "@common/yjsStore/userStore";
import { CPGameState } from "@types";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

const useUpdateGameState = (roomId: string) => {
  const [_, setGameState] = useRecoilState(yjsGameState);

  useEffect(() => {
    const observeFunction = () => {
      const gameState = yGameState.get(roomId);
      console.log("useUpdateGameState 1");
      setGameState({ ...gameState });
    };
    yGameState.observe(observeFunction);
    return () => {
      yGameState.unobserve(observeFunction);
    };
  }, [roomId, setGameState]);
};
export default useUpdateGameState;
