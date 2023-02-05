import { Input, Button, Checkbox, Box } from "@chakra-ui/react";
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
import { useRouter } from "next/dist/client/router";
import { useTranslation } from "next-i18next";
import { css } from "@emotion/react";
import Chatting from "./Chat/Chatting";

const CreateQuestion = () => {
  const { provider } = providerState;
  const { input, setInput, onChangeHandler } = useInput("");
  const agreeList = useRecoilValue(yjsAgreeState);
  const { roomId } = useRecoilValue(userSelector) ?? {};
  const { t } = useTranslation("common");
  const router = useRouter();
  const startPushQuestion = t("start.push.question");

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
    if (input !== "") {
      setIsAgree(true);
      doc.transact(() => {
        const result = yAgreeState.get(
          String(providerState.provider.awareness.clientID)
        );
        if (result === true) return;
        yAgreeState.set(
          String(providerState.provider.awareness.clientID),
          true
        );
        if (!!provider) {
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
            question: startPushQuestion,
            questioner: provider.awareness.clientID,
            isQuestionEnd: false,
            solver: nextUserClientId,
            path: "/draw",
          };
          pushQuestionHandler(newQuestion);
        }
      });
      setInput("");
    }
  };

  const nextPageHandlerByOwner = useCallback(() => {
    if (isOwner) {
      yAgreeState.clear();
      doc.transact(() => {
        changeGameStateHandler({ path: "/draw", gamePagesIndex: 0 });
      });
    }
  }, [changeGameStateHandler, isOwner]);

  useEffect(() => {
    if (agreeList && userProfiles && agreeList.length === userProfiles.length) {
      nextPageHandlerByOwner();
    }
  }, [agreeList, nextPageHandlerByOwner, userProfiles]);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 10px;
      `}
    >
      <div
        css={css`
          flex-grow: 1;
          flex-basis: 30px;
          justify-content: center;
          align-items: center;
        `}
      >
        <Timer
          time={150000000}
          gaugeColor={["red", "orange", "green"]}
          callback={async () => {
            nextPageHandlerByOwner();
          }}
        />
      </div>
      <div
        css={css`
          display: flex;
          flex-grow: 1;
          flex-direction: column;
          height: 600px;
          @media screen and (max-height: 670px) {
            height: 400px;
          }
        `}
      >
        <Chatting />
      </div>
      <div
        css={css`
          display: flex;
          flex-basis: 120px;
          flex-direction: column;
        `}
      >
        <div>{t("start.input.answer")}</div>
        <Input value={input} onChange={onChangeHandler} />
        <div
          css={css`
            display: flex;
            width: 100%;
            justify-content: space-between;
          `}
        >
          <Box
            css={css`
              user-select: none;
              font-size: 1.5rem;
            `}
          >
            {agreeList.length}/{userProfiles.length}
          </Box>
          <Button
            onClick={() => {
              onClickButtonHandler();
            }}
          >
            <Checkbox size="md" colorScheme="green" isChecked={isAgree}>
              {t("start.input.checkbox.submit")}
            </Checkbox>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CreateQuestion;
