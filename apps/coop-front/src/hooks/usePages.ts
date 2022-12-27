import { yjsGameState } from "@common/recoil/recoil.atom";
import { yGameState } from "@common/yjsStore/userStore";
import { CPGameState } from "@types";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
/**
 * `deprecated` usePages split useSyncPageFromGameState, useUpdateGameState
 * @param roomId
 * @returns
 */
const usePages = (roomId: string) => {
  const router = useRouter();

  const [gameState, setGameState] = useRecoilState(yjsGameState);

  const observeFunction = useCallback(() => {
    const gameState = yGameState.get(roomId);
    if (!gameState) {
      console.log("useSyncPageFromGameState 2", gameState);
      if (router.pathname !== "/lobby") router.push("/");
    } else if (
      gameState.gamePagesIndex > -1 &&
      gameState.gamePages[gameState.gamePagesIndex].path !== router.pathname
    ) {
      router.push(gameState.gamePages[gameState.gamePagesIndex].path);
    }
    setGameState(gameState);
  }, [roomId, router, setGameState]);

  useEffect(() => {
    yGameState.observe(observeFunction);
    return () => {
      yGameState.unobserve(observeFunction);
    };
  }, [observeFunction]);

  return {};
  // return { gameState };
};

export default usePages;
