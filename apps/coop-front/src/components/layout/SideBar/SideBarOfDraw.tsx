import {
  userProfilesSelector,
  yjsGameState,
  yjsQuestionsState,
} from "@common/recoil/recoil.atom";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

const SideBarOfDraw = () => {
  const { isOwner, userProfiles } = useRecoilValue(userProfilesSelector);
  const questions = useRecoilValue(yjsQuestionsState);
  const gameState = useRecoilValue(yjsGameState);
  return (
    <div>
      {userProfiles &&
        userProfiles.map((v, idx) => {
          return <div key={idx}></div>;
        })}
      <div>맞춘 문제수</div>
      <div>
        {`${questions.filter((v) => v.answer === v.inputAnswer).length}/${
          questions.length
        }`}
      </div>
    </div>
  );
};
export default SideBarOfDraw;
