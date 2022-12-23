import { yjsGameState } from "@common/recoil/recoil.atom";
import {
  doc,
  getChangeGameStateHandler,
  providerState,
  yGameState,
} from "@common/yjsStore/userStore";
import { CPGamePage } from "@types";
import { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const useAgreeToPageMove = (roomId: string) => {
  const { provider } = providerState;
  const [isAgree, setIsAgree] = useState(false);
  const changeGameStateHandler = getChangeGameStateHandler(roomId);

  const gameState = useRecoilValue(yjsGameState);

  const onClickAgreeHandler = () => {
    setIsAgree(true);
    const agreeSet = new Set(Array.from(gameState.agreeSet));
    agreeSet.add(provider.awareness.clientID);
    console.log("onClickAgreeHandler", agreeSet);
    changeGameStateHandler({
      agreeSet,
    });
  };

  useEffect(() => {
    if (provider?.awareness && isAgree === true) {
      const users = provider?.awareness.getStates();
      console.log(gameState, gameState.agreeSet instanceof Set);
      console.log(
        users.size === gameState.agreeSet.size,
        users.size,
        gameState.agreeSet.size
      );
      if (users.size === gameState.agreeSet.size) {
        console.log("useAgreeToPageMove gameState update");
        const newPage: CPGamePage = {
          path: "/draw",
          answer: "asdf",
          question: "?????를 그려라",
          questioner: provider.awareness.clientID,
        };
        changeGameStateHandler({
          // agreeSet: new Set(),
          gamePages: [...gameState.gamePages, newPage],
          gamePagesIndex: gameState.gamePagesIndex + 1,
        });
      }
    }
  }, [
    changeGameStateHandler,
    gameState.agreeSet,
    gameState.gamePages,
    gameState.gamePagesIndex,
    isAgree,
    provider.awareness,
    roomId,
  ]);
  return { isAgree, onClickAgreeHandler };
};
export default useAgreeToPageMove;
