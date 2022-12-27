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

  // useEffect(() => {
  //   console.log("gameState", gameState);
  // }, [gameState]);

  const onClickAgreeHandler = () => {
    setIsAgree(true);
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
      if (users.size === gameState.agreeList.length) {
        changeGameStateHandler({
          agreeList: [],
          gamePagesIndex: gameState.gamePagesIndex + 1,
        });
      }
    }
  }, [
    changeGameStateHandler,
    gameState.agreeList.length,
    gameState.gamePagesIndex,
    isAgree,
    provider?.awareness,
    roomId,
  ]);
  return { isAgree, onClickAgreeHandler };
};
export default useAgreeToPageMove;
