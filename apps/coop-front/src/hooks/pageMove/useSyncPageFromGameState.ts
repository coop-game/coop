import { yjsQuestionsState } from "./../../common/recoil/recoil.atom";
import { yjsGameState } from "../../common/recoil/recoil.atom";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect } from "react";

/**
 *
 * @param roomId roomName from doc
 * @returns {gameState, changeGameStateHandler}
 *
 * gameState from CRDT data
 *
 * changeGameStateHandler is update yjs CRDT Data
 *
 * flow gameState update from changeGameStateHandler
 *
 */
const useSyncPageFromGameState = () => {
  const router = useRouter();
  const gameState = useRecoilValue(yjsGameState);

  useEffect(() => {
    if (!gameState) {
      if (router.pathname !== "/games/lobby") {
        router.push("/games");
      }
    } else if (gameState.path && gameState.path !== router.pathname) {
      router.push(gameState.path);
    }
  }, [gameState, router]);

  return { gameState };
};

export default useSyncPageFromGameState;
