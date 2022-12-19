import { useRecoilState } from "recoil";
import { Avatar } from "@chakra-ui/react";
import {
  doc,
  providerState,
  userProfilesSelector,
  userProfilesState,
} from "@common/recoil/recoil.atom";
import { CPUserProfile } from "@types";
import { useCallback, useEffect, useState } from "react";

const useProfileUpdate = ({
  nickname,
  avatarIndex,
  color,
}: {
  nickname: string;
  avatarIndex: number;
  color: string;
}) => {
  // const [userProfiles, setUserProfiles] = useState<Array<CPUserProfile>>([]);
  // const [isOwner, setIsOwner] = useState(false);
  const [_, setUserProfiles] = useRecoilState(userProfilesSelector);

  const { provider, room } = providerState;

  const filterMap = useCallback(() => {
    const userProfiles: Array<CPUserProfile> = [];
    provider?.awareness.getStates().forEach((v) => {
      if (v?.user) {
        const user: CPUserProfile = {};
        user.id = v.id;
        user.nickname = v.user.name;
        user.avatarIndex = v.user.avatarIndex;
        user.color = v.user.color;
        user.utcTimeStamp = v.user.utcTimeStamp;
        userProfiles.push(user);
      }
    });
    userProfiles.sort((a, b) => {
      return Number(a.utcTimeStamp) - Number(b.utcTimeStamp);
    });

    return userProfiles.map((v, idx) => {
      const isOwner = idx === 0;
      if (isOwner === true && Number(v.id) === doc.clientID) {
        // setIsOwner(true);
        setUserProfiles({ isOwner: true });
      }
      return { ...v, isOwner };
    });
  }, [provider?.awareness]);

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
        console.log("added : ", added);
        console.log("updated : ", updated);
        console.log("removed : ", removed);
        console.log(Array.from(provider.awareness.getStates()));
        // setUserProfiles(filterMap());
        setUserProfiles({ userProfiles: filterMap() });
      }
    );
    const date = new Date();
    const utcTimeStamp = date.getTime() + date.getTimezoneOffset() * 60 * 1000;

    provider?.awareness.setLocalStateField("user", {
      name: nickname,
      avatarIndex,
      color,
      utcTimeStamp,
    });
  }, [filterMap, provider, room, nickname, avatarIndex]);
  // return { userProfiles, isOwner };
};
export default useProfileUpdate;
