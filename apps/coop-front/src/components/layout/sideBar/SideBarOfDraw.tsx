import { userProfilesSelector } from "@common/recoil/recoil.atom";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

const SideBarOfDraw = () => {
  const userProfiles = useRecoilValue(userProfilesSelector);
  console.log("userProfiles 업데이트 마구됨", userProfiles);

  useEffect(() => {}, [userProfiles]);
  return <div></div>;
};
export default SideBarOfDraw;
