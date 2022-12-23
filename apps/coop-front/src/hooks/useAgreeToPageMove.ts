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
    // const agreeSet = new Set(Array.from(gameState.agreeSet));
    // agreeSet.add(provider.awareness.clientID);
    const agreeList = Array.from(
      new Set([...gameState.agreeList, provider.awareness.clientID])
    );
    console.log("onClickAgreeHandler", agreeList);
    changeGameStateHandler({
      agreeList,
    });
  };

  useEffect(() => {
    if (provider?.awareness && isAgree === true) {
      const users = provider?.awareness.getStates();
      console.log(
        users.size === gameState.agreeList.length,
        users.size,
        gameState.agreeList.length
      );
      if (users.size === gameState.agreeList.length) {
        console.log("useAgreeToPageMove gameState update");
        const newPage: CPGamePage = {
          path: "/draw",
          answer: "asdf",
          question: "?????를 그려라",
          questioner: provider.awareness.clientID,
        };
        changeGameStateHandler({
          agreeList: [],
          gamePages: [...gameState.gamePages, newPage],
          gamePagesIndex: gameState.gamePagesIndex + 1,
        });
      }
    }
  }, [
    changeGameStateHandler,
    gameState.agreeList,
    gameState.gamePages,
    gameState.gamePagesIndex,
    isAgree,
    provider.awareness,
    roomId,
  ]);
  return { isAgree, onClickAgreeHandler };
};
export default useAgreeToPageMove;
