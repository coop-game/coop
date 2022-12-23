import { yGameState } from "@common/yjsStore/userStore";
import { CPGameState } from "@types";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
/**
 * `deprecated` usePages split useSyncPageFromGameState, useUpdateGameState
 * @param roomId
 * @returns
 */
const usePages = (roomId: string) => {
  const router = useRouter();
  const [gameState, setGameState] = useState(null);

  const observeFunction = useCallback(() => {
    const gameState = yGameState.get(roomId);
    if (!gameState) {
      router.push("/");
      return;
    }
    if (
      gameState.gamePagesIndex > -1 &&
      gameState.gamePages[gameState.gamePagesIndex].path !== router.pathname
    ) {
      router.push(gameState.gamePages[gameState.gamePagesIndex].path);
    }
    setGameState(gameState);
  }, [roomId, router]);

  useEffect(() => {
    yGameState.observe(observeFunction);
    return () => {
      yGameState.unobserve(observeFunction);
    };
  }, [observeFunction]);

  return { gameState };
};

export default usePages;
