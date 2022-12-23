import {
  doc,
  getChangeGameStateHandler,
  providerState,
  yGameState,
} from "@common/yjsStore/userStore";
import { useEffect, useState } from "react";

const useAgreeToPageMove = (roomId: string) => {
  const { provider } = providerState;
  const [isAgree, setIsAgree] = useState(false);
  const onClickAgreeHandler = () => {};
  useEffect(() => {
    if (provider?.awareness && isAgree === false) {
      setIsAgree(true);
      const users = provider?.awareness.getStates();
      const gameState = yGameState.get(roomId);
      const changeGameStateHandler = getChangeGameStateHandler(roomId);
      if (users.size === gameState.agreeSet.size) {
        changeGameStateHandler({
          agreeSet: new Set(),
        });
      }
    }
  }, [isAgree, provider?.awareness, roomId]);
  return { isAgree, onClickAgreeHandler };
};
export default useAgreeToPageMove;
