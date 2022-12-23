import { useRecoilState, useRecoilValue } from "recoil";
import { userProfilesSelector, userSelector } from "@common/recoil/recoil.atom";
import { CPUserProfile } from "@types";
import { useCallback, useEffect } from "react";
import { doc, providerState } from "@common/yjsStore/userStore";

const useProfileUpdate = () => {
  const { nickname, avatarIndex, color, utcTimeStamp } =
    useRecoilValue(userSelector) ?? {};
  const [_, setUserProfiles] = useRecoilState(userProfilesSelector);

  const { provider, room } = providerState;

  const filterMap = useCallback(() => {
    const userProfiles: Array<CPUserProfile> = [];
    provider?.awareness.getStates().forEach((v) => {
      if (v?.userProfile) {
        const userProfile: CPUserProfile = {};
        userProfile.id = v.id;
        userProfile.nickname = v.userProfile.name;
        userProfile.avatarIndex = v.userProfile.avatarIndex;
        userProfile.color = v.userProfile.color;
        userProfile.utcTimeStamp = v.userProfile.utcTimeStamp;
        userProfiles.push(userProfile);
      }
    });
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

    provider?.awareness.setLocalStateField("userProfile", {
      name: nickname,
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
