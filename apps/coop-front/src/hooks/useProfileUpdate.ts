import { Avatar } from "@chakra-ui/react";
import { providerState } from "@common/recoil/recoil.atom";
import { CPUserProfile } from "@types";
import { useCallback, useEffect, useState } from "react";

const useProfileUpdate = ({
  nickname,
  avatarIndex,
}: {
  nickname: string;
  avatarIndex: number;
}) => {
  const [userProfiles, setUserProfiles] = useState<Array<CPUserProfile>>([]);
  const { provider, room } = providerState;

  const filterMap = useCallback(() => {
    const userProfiles = [];
    provider?.awareness.getStates().forEach((v) => {
      if (v?.user) {
        const user: CPUserProfile = {};
        user.id = v.id;
        user.nickname = v.user.name;
        user.avatarIndex = v.user.avatarIndex;
        user.color = v.user.color;
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
      avatarIndex,
      color: "#ffb61e",
    });
  }, [filterMap, provider, room, nickname, avatarIndex]);
  return { userProfiles };
};
export default useProfileUpdate;
