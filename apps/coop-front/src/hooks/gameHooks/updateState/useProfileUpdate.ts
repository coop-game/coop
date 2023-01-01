import { useRecoilState, useRecoilValue } from "recoil";
import { userProfilesSelector, userSelector } from "@common/recoil/recoil.atom";
import { CPUserProfile } from "@types";
import { useCallback, useEffect } from "react";
import {
  doc,
  providerState,
  yUserProfilesState,
} from "@common/yjsStore/userStore";
import { Transaction, YMapEvent } from "yjs";
import { Room } from "y-webrtc";

const useProfileUpdate = () => {
  const { nickname, avatarIndex, color, utcTimeStamp } =
    useRecoilValue(userSelector) ?? {};
  const [_, setUserProfiles] = useRecoilState(userProfilesSelector);

  const { provider, room } = providerState;

  const filterMap = useCallback(() => {
    const state = provider?.awareness.getStates();
    let userProfiles: CPUserProfile[] = [];
    const stateKeysIter = state.keys();
    while (true) {
      const res = stateKeysIter.next().value;
      if (res) {
        const userProfile = yUserProfilesState.get(String(res));
        if (userProfile) userProfiles.push(userProfile);
      } else break;
    }

    userProfiles.sort((a, b) => {
      return a.utcTimeStamp - b.utcTimeStamp;
    });

    userProfiles = userProfiles.map((v, idx) => {
      const isOwner = idx === 0;
      return { isOwner, ...v };
    });

    const isOwner = Number(userProfiles[0].id) === doc.clientID;
    return { isOwner, userProfiles };
  }, [provider?.awareness]);

  useEffect(() => {
    const observeFunction = (eventType: any, transaction: any) => {
      // local에서 수정했고, updated로 데이터가 들어왔다면
      if (transaction === "local" && eventType.updated.length > 0) {
        return;
      }
      // transaction으로 Room이 전송됬고 updated로 데이터가 들어왔다면
      if (transaction instanceof Room && eventType.updated.length > 0) {
        return;
      }
      setUserProfiles({ ...filterMap() });
    };
    yUserProfilesState.observe(observeFunction);

    provider?.awareness.on("update", observeFunction);

    yUserProfilesState.set(String(provider.awareness.clientID), {
      id: provider.awareness.clientID,
      nickname,
      avatarIndex,
      color,
      utcTimeStamp,
    });
    return () => {
      console.log("삭제한다");
      yUserProfilesState.unobserve(observeFunction);
      provider?.awareness.off("update", observeFunction);
    };
  }, [
    filterMap,
    provider,
    room,
    nickname,
    avatarIndex,
    color,
    setUserProfiles,
    utcTimeStamp,
  ]);
};
export default useProfileUpdate;
