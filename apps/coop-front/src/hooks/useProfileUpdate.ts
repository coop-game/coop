import { providerState } from "@common/recoil/recoil.atom";
import { useCallback, useEffect, useState } from "react";

type userProfile = {
  id?: string;
  nickname?: string;
};
const useProfileUpdate = ({ nickname }: { nickname: string }) => {
  const [userProfiles, setUserProfiles] = useState<Array<userProfile>>([]);
  const { provider, room } = providerState;

  const filterMap = useCallback(() => {
    const userProfiles = [];
    provider?.awareness.getStates().forEach((v) => {
      console.log(v);
      if (v?.user) {
        const user: userProfile = {};
        user.id = v.id;
        user.nickname = v.user.name;
        userProfiles.push(user);
      }
    });
    return userProfiles;
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
        setUserProfiles(filterMap());
      }
    );
    provider?.awareness.setLocalStateField("user", {
      name: nickname,
      color: "#ffb61e",
    });
  }, [filterMap, provider, room, nickname]);
  return { userProfiles };
};
export default useProfileUpdate;
