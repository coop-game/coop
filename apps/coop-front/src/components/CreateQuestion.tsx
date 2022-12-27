import { Input, Button, Checkbox } from "@chakra-ui/react";
import {
  userProfilesSelector,
  userSelector,
  yjsGameState,
} from "@common/recoil/recoil.atom";
import useAgreeToPageMove from "@hooks/useAgreeToPageMove";
import useInput from "@hooks/useInput";
import useSyncPageFromGameState from "@hooks/useSyncPageFromGameState";
import useProfileUpdate from "@hooks/useProfileUpdate";
import useUpdateGameState from "@hooks/useUpdateGameState";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useRecoilValue } from "recoil";
import Timer from "./Timer";
import {
  doc,
  getChangeGameStateHandler,
  providerState,
} from "@common/yjsStore/userStore";
import { CPGamePage } from "@types";

const CreateQuestion = () => {
  const { provider } = providerState;
  const { input, setInput, onChangeHandler } = useInput("");
  const gameState = useRecoilValue(yjsGameState);
  const { roomId } = useRecoilValue(userSelector) ?? {};

  useSyncPageFromGameState();
  useUpdateGameState(roomId);

  const { isAgree, onClickAgreeHandler } = useAgreeToPageMove(roomId);

  // recoil 프로필 업데이트
  useProfileUpdate();
  // const { isOwner, userProfiles } = useRecoilValue(userProfilesSelector);

  const changeGameStateHandler = getChangeGameStateHandler(roomId);

  const onClickButtonHandler = () => {
    console.log("??? 이게 두번 돌아가?");
    onClickAgreeHandler();
    if (!!provider && input !== "") {
      const newPage: CPGamePage = {
        path: "/draw",
        answer: input,
        question: "?????를 그려라",
        questioner: provider.awareness.clientID,
      };
      changeGameStateHandler({
        gamePages: [...gameState.gamePages, newPage],
      });
    }
    setInput("");
  };

  return (
    <div>
      <Timer
        time={5000}
        gaugeColor={["red", "orange", "green"]}
        callback={onClickButtonHandler}
      />
      <div>문장을 입력하세요.</div>
      <Input value={input} onChange={onChangeHandler} />
      <Button
        onClick={() => {
          onClickButtonHandler();
        }}
      >
        <Checkbox size="md" colorScheme="green" isChecked={isAgree}>
          Checkbox
        </Checkbox>
      </Button>
      {/* <div>
        {userProfiles.map((v) => {
          return <div key={v.id}>{`${v.id}`}</div>;
        })}
      </div> */}
      {/* <div>
          {gameState &&
            Array.from(gameState.agreeSet).map((v) => {
              return <div key={v}>{`${v}`}</div>;
            })}
        </div> */}
      <div>
        {gameState &&
          gameState.agreeList.map((v) => {
            return <div key={v}>{`${v}`}</div>;
          })}
      </div>
    </div>
  );
};
export default CreateQuestion;
