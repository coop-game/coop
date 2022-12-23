import { useRecoilState, useRecoilValue } from "recoil";
import { userProfilesSelector, userSelector } from "@common/recoil/recoil.atom";
import { CPUserProfile } from "@types";
import { useCallback, useEffect } from "react";
import { doc, providerState, yUserProfiles } from "@common/yjsStore/userStore";

const useProfileUpdate = () => {
  const { nickname, avatarIndex, color, utcTimeStamp } =
    useRecoilValue(userSelector) ?? {};
  const [_, setUserProfiles] = useRecoilState(userProfilesSelector);

  const { provider, room } = providerState;

  const filterMap = useCallback(() => {
    const state = provider?.awareness.getStates();
    const userProfiles: CPUserProfile[] = [];
    const stateKeysIter = state.keys();
    while (true) {
      const res = stateKeysIter.next().value;
      if (res) {
        const userProfile = yUserProfiles.get(String(res));
        if (userProfile) userProfiles.push(userProfile);
      } else break;
    }

    userProfiles.sort((a, b) => {
      return a.utcTimeStamp - b.utcTimeStamp;
    });
    return userProfiles.map((v, idx) => {
      const isOwner = idx === 0;
      if (isOwner === true && Number(v.id) === doc.clientID) {
        setUserProfiles({ isOwner: true });
      }
      return { ...v, isOwner };
    });
  }, [provider?.awareness, setUserProfiles]);

  useEffect(() => {
    yUserProfiles.observe(() => {
      setUserProfiles({ userProfiles: filterMap() });
    });

    provider?.awareness.on(
      "change",
      ({
        added,
        updated,
        removed,
      }: {
        added: any;
        updated: any;
        removed: any;
      }) => {
        setUserProfiles({ userProfiles: filterMap() });
      }
    );

    yUserProfiles.set(String(provider.awareness.clientID), {
      id: provider.awareness.clientID,
      nickname,
      avatarIndex,
      color,
      utcTimeStamp,
    });
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
