import { Input, Button, Checkbox } from "@chakra-ui/react";
import {
  userProfilesSelector,
  userSelector,
  yjsAgreeState,
} from "@common/recoil/recoil.atom";
import useInput from "@hooks/useInput";
import useSyncPageFromGameState from "@hooks/pageMove/useSyncPageFromGameState";
import useProfileUpdate from "@hooks/gameHooks/updateState/useProfileUpdate";
import useGameStateUpdate from "@hooks/gameHooks/updateState/useGameStateUpdate";
import { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import Timer from "./Timer/Timer";
import {
  doc,
  getChangeGameStateHandler,
  providerState,
  yAgreeState,
} from "@common/yjsStore/userStore";
import { CPGameDrawee, CPGameQuestion } from "@types";
import useAgreeUpdate from "@hooks/gameHooks/updateState/useAgreeUpdate";
import useQuestionUpdate from "@hooks/gameHooks/updateState/useQuestionUpdate";
import { useTranslation } from "@hooks/useTransitions";

const CreateQuestion = () => {
  const { provider } = providerState;
  const { input, setInput, onChangeHandler } = useInput("");
  const agreeList = useRecoilValue(yjsAgreeState);
  const { roomId } = useRecoilValue(userSelector) ?? {};
  const translation = useTranslation().messages;

  // gameState.path 에 따라 페이지 동기화
  useSyncPageFromGameState();
  // gameState가 바뀌면 recoil의 yjsGameState를 업데이트 해줌
  useGameStateUpdate(roomId);

  // yjs profile이  바뀌면 recoil의 userProfilesState를 업데이트해줌
  useProfileUpdate();
  const { isOwner, userProfiles } = useRecoilValue(userProfilesSelector);

  // agree 버튼을 누를 때 마다 recoil의 yjsAgreeStates를 업데이트 해줌
  useAgreeUpdate();

  const changeGameStateHandler =
    getChangeGameStateHandler<CPGameDrawee>(roomId);
  const { pushQuestionHandler } = useQuestionUpdate();

  const [isAgree, setIsAgree] = useState(false);

  const onClickButtonHandler = async () => {
    setIsAgree(true);
    doc.transact(() => {
      yAgreeState.set(String(doc.clientID), true);
      if (!!provider && input !== "") {
        // userProfiles 기준으로 다음 user의 id를 문제 맞추는 사람으로 설정함.
        const nextUserClientId =
          userProfiles[
            (userProfiles
              .map((v) => v.id)
              .indexOf(provider.awareness.clientID) +
              1) %
              userProfiles.length
          ].id;
        const newQuestion: CPGameQuestion = {
          answer: input,
          inputAnswer: [],
          question: translation["start.push.question"],
          questioner: provider.awareness.clientID,
          solver: nextUserClientId,
          path: "/draw",
        };
        pushQuestionHandler(newQuestion);
      }
    });
    setInput("");
  };

  const nextPageHandlerByOwner = useCallback(() => {
    if (isOwner) {
      doc.transact(() => {
        yAgreeState.clear();
        changeGameStateHandler({ path: "/draw", gamePagesIndex: 0 });
      });
    }
  }, [changeGameStateHandler, isOwner]);

  useEffect(() => {
    if (agreeList.length === userProfiles.length) {
      nextPageHandlerByOwner();
    }
  }, [agreeList.length, nextPageHandlerByOwner, userProfiles.length]);

  return (
    <div>
      <Timer
        time={5000}
        gaugeColor={["red", "orange", "green"]}
        callback={async () => {
          onClickButtonHandler();
          nextPageHandlerByOwner();
        }}
      />
      <div>{translation["start.input.answer"]}</div>
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
      <div>
        {agreeList.map((v) => {
          return <div key={v}>{`${v}`}</div>;
        })}
      </div>
    </div>
  );
};
export default CreateQuestion;
