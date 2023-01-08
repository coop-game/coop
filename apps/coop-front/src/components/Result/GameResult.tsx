import { yjsGameState } from "@common/recoil/recoil.atom";
import { useRecoilValue } from "recoil";

const Result = () => {
  const gameState = useRecoilValue(yjsGameState);
  console.log(gameState);
  
  return (
    <div>
      <div>결과</div>
    </div>
  );
};

export default Result;
