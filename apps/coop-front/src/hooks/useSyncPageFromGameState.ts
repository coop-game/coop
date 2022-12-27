import { yjsGameState } from "../common/recoil/recoil.atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { yGameState } from "@common/yjsStore/userStore";
import { CPGameState } from "@types";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

/**
 *
 * @param roomId roomName from doc
 * @returns `{gameState, changeGameStateHandler}`
 *
 * `gameState` from CRDT data
 *
 * `changeGameStateHandler` is update yjs CRDT Data
 *
 * flow `gameState` update from `changeGameStateHandler`
 *
 */
const useSyncPageFromGameState = () => {
  const router = useRouter();
  // const [gameState, setGameState] = useState<CPGameState | null>(null);
  const gameState = useRecoilValue(yjsGameState);

  useEffect(() => {
    if (!gameState) {
      console.log("useSyncPageFromGameState 2", gameState);
      if (router.pathname !== "/lobby") router.push("/");
    } else if (
      gameState.gamePagesIndex > -1 &&
      gameState.gamePages[gameState.gamePagesIndex].path !== router.pathname
    ) {
      router.push(gameState.gamePages[gameState.gamePagesIndex].path);
    }
  }, [gameState, router]);

  return { gameState };
};

export default useSyncPageFromGameState;
