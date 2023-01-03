import { useRecoilState } from "recoil";
import { yjsAgreeState } from "@common/recoil/recoil.atom";
import { useCallback, useEffect } from "react";
import { doc, providerState, yAgreeState } from "@common/yjsStore/userStore";
import { Room } from "y-webrtc";

const useAgreeUpdate = () => {
  const [_, setAgreeState] = useRecoilState(yjsAgreeState);

  const { provider, room } = providerState;

  const filterMap = useCallback(() => {
    const state = provider?.awareness.getStates();
    const agreeList: number[] = [];
    const stateKeysIter = state.keys();
    while (true) {
      const res = stateKeysIter.next().value;
      if (res) {
        const agreeState = yAgreeState.get(String(res));
        if (agreeState) agreeList.push(Number(res));
      } else break;
    }
    return agreeList;
  }, [provider?.awareness]);

  const observeFunction = useCallback(
    (eventType: any, transaction: any) => {
      if (transaction === "local" && eventType.updated.length > 0) {
        return;
      }
      // 마우스 커서
      // transaction으로 Room이 전송됬고 updated로 데이터가 들어왔다면
      if (transaction instanceof Room && eventType.updated.length > 0) {
        return;
      }
      provider && setAgreeState(filterMap());
    },
    [filterMap, provider, setAgreeState]
  );
  useEffect(() => {
    yAgreeState.observe(observeFunction);
    provider && provider.awareness.on("change", observeFunction);

    return () => {
      yAgreeState.set(String(doc.clientID), false);
      yAgreeState.unobserve(observeFunction);
      provider && provider.awareness.off("change", observeFunction);
    };
  }, [provider.awareness, observeFunction, provider]);

  // 처음 mount 될 때
  // useEffect(() => {
  //   setAgreeState(filterMap());
  // }, []);
  const agreeHandler = () => {
    yAgreeState.set(String(doc.clientID), true);
  };
  return { agreeHandler };
};
export default useAgreeUpdate;
