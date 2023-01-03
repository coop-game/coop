import {
  userProfilesSelector,
  yjsGameState,
  yjsQuestionsState,
} from "@common/recoil/recoil.atom";
import { css } from "@emotion/react";
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
      <div
        css={css`
          margin: 0px 5px 0px 5px;
          width: 100%;
          height: 40px;
          background: #f5f5f5;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        맞춘 문제수
      </div>
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        {`${questions.filter((v) => v.inputAnswer.includes(v.answer)).length}/${
          questions.length
        }`}
      </div>
    </div>
  );
};
export default SideBarOfDraw;
