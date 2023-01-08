import { useRecoilState } from "recoil";
import useArrayUpdate from "./useArrayUpdate";
import { gameUserProfileStates } from "@common/recoil/recoil.atom";
import { yGameUserProfileStates } from "@common/yjsStore/userStore";

const useGameUserProfileUpdate = () => {
  const [_, setState] = useRecoilState(gameUserProfileStates);
  const yjsState = yGameUserProfileStates;
  useArrayUpdate({
    setState,
    yjsState,
  });
};
export default useGameUserProfileUpdate;
