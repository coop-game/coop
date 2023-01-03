import { yjsQuestionsState } from "./../../common/recoil/recoil.atom";
import { yjsGameState } from "../../common/recoil/recoil.atom";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
  const questionState = useRecoilValue(yjsQuestionsState);

  useEffect(() => {
    if (!gameState) {
      if (router.pathname !== "/lobby") {
        console.log("gameState 가 없어서 로비로 이동함");
        router.push("/");
      }
    } else if (gameState.path !== router.pathname) {
      console.log("path 가 달라서 이동함", gameState.path, router.pathname);
      router.push(gameState.path);
    }
  }, [gameState, questionState, router]);

  return { gameState };
};

export default useSyncPageFromGameState;
