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
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import usePages from "@hooks/usePages";

const CreateQuestion = () => {
  const { input, setInput, onChangeHandler } = useInput("");
  const { roomId } = useRecoilValue(userSelector) ?? {};
  useSyncPageFromGameState();
  useUpdateGameState(roomId);
  // usePages(roomId);
  const { isAgree, onClickAgreeHandler } = useAgreeToPageMove(roomId);
  const router = useRouter();
  useProfileUpdate();
  // const { isOwner, userProfiles } = useRecoilValue(userProfilesSelector);
  const gameState = useRecoilValue(yjsGameState);
  useEffect(() => {
    console.log("isAgree", isAgree);
  }, [isAgree]);

  return (
    <div>
      <div>문장을 입력하세요.</div>
      <Input value={input} onChange={onChangeHandler} />
      <Button
        onClick={() => {
          onClickAgreeHandler();
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
      <div>
        {gameState &&
          Array.from(gameState.agreeSet).map((v) => {
            return <div key={v}>{`${v}`}</div>;
          })}
      </div>
    </div>
  );
};
export default CreateQuestion;
