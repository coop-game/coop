import {
  getChangeGameStateHandler,
  yGameState,
} from "@common/yjsStore/userStore";
import { CPGameState } from "@types";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

const usePages = (roomId: string) => {
  const router = useRouter();
  const [gameState, setGameState] = useState(null);

  const observeFunction = useCallback(() => {
    const gameState = yGameState.get(roomId);
    if (!gameState) {
      router.push("/");
      return;
    }
    if (gameState.nowPage !== router.pathname) {
      router.push(gameState.nowPage);
    }
    setGameState(gameState);
  }, [roomId, router]);

  useEffect(() => {
    yGameState.observe(observeFunction);
    return () => {
      yGameState.unobserve(observeFunction);
    };
  }, [observeFunction]);

  // const changeGameStateHandler = (
  //   partialGameState = {} as Partial<CPGameState>
  // ) => {
  //   const gameState = yGameState.get(roomId);
  //   const newGameState = { ...gameState, ...partialGameState };
  //   yGameState.set(roomId, newGameState);
  // };

  const changeGameStateHandler = getChangeGameStateHandler(roomId);

  return { gameState, changeGameStateHandler };
};

export default usePages;
