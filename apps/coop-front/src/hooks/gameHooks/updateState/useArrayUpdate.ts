import { yQuestionsState } from "./../../../common/yjsStore/userStore";
import { yjsQuestionsState } from "./../../../common/recoil/recoil.atom";
import { RecoilState, SetterOrUpdater, useRecoilState } from "recoil";
import { useCallback, useEffect } from "react";
import { providerState } from "@common/yjsStore/userStore";
import { CPGameQuestion } from "@types";
import { Room } from "y-webrtc";
import * as Y from "yjs";

type useArrayUpdatePropsType<T> = {
  setState: SetterOrUpdater<T[]>;
  yjsState: Y.Array<T>;
};
const useArrayUpdate = <T>(props: useArrayUpdatePropsType<T>) => {
  const { setState, yjsState } = props;
  const { provider } = providerState;

  const getArray = useCallback(() => {
    return yjsState.toArray();
  }, [yjsState]);

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
      setState(getArray());
    },
    [getArray, setState]
  );

  useEffect(() => {
    yQuestionsState.observe(observeFunction);
    provider?.awareness.on("change", observeFunction);

    return () => {
      yQuestionsState.unobserve(observeFunction);
      provider?.awareness.off("change", observeFunction);
    };
  }, [observeFunction, provider?.awareness]);

  const pushArrayHandler = (element: T) => {
    yjsState.push([element]);
  };
  return { pushArrayHandler };
};
export default useArrayUpdate;
