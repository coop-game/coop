import { useRecoilState } from "recoil";
import { yjsAgreeState } from "@common/recoil/recoil.atom";
import { useCallback, useEffect } from "react";
import { doc, providerState, yAgreeState } from "@common/yjsStore/userStore";

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

  useEffect(() => {
    const observeFunction = () => {
      setAgreeState(filterMap());
    };
    yAgreeState.observe(observeFunction);
    provider?.awareness.on("change", observeFunction);

    return () => {
      yAgreeState.set(String(doc.clientID), false);
      yAgreeState.unobserve(observeFunction);
      provider?.awareness.off("change", observeFunction);
    };
  }, [filterMap, provider?.awareness, setAgreeState]);

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
