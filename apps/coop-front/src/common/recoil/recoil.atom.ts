import { atom, selector } from "recoil";
import {
  CPChatType,
  CPGameState,
  CPUserProfilesState,
  CPUserType,
  CPGameQuestions,
  CPGameRelayRaceAnswers,
  CPUserProfile,
} from "@types";

/**
 * userState
 * 본인 유저 데이터
 */
export const userState = atom<CPUserType | null>({
  key: "USER_STATE",
  default: null,
});

export const userSelector = selector({
  key: "USER_SELECTOR",
  get: ({ get }) => {
    return get(userState);
  },
  set: ({ set }, newValue) => set(userState, { ...newValue }),
});

/**
 * userProfilesState
 */
export const userProfilesState = atom<CPUserProfilesState>({
  key: "USER_PROFILES_STATE",
  default: {
    isOwner: false,
    userProfiles: [],
  },
});

export const userProfilesSelector = selector({
  key: "USER_PROFILES_SELECTOR",
  get: ({ get }) => {
    return get(userProfilesState);
  },
  set: ({ set }, newValue) =>
    set(userProfilesState, (prev) => ({ ...prev, ...newValue })),
});

export const gameUserProfileStates = atom<CPUserProfile[]>({
  key: "USER_PROFILES_STATE",
  default: [],
});

/**
 * yjsGameState
 */
export const yjsGameState = atom<CPGameState | null>({
  key: "YJS_GAME_STATE",
  default: null,
});

/**
 * yjsRelayRaceAnswerState
 */
export const yjsRelayRaceAnswerState = atom<CPGameRelayRaceAnswers>({
  key: "YJS_RELAY_RACE_ANSWER",
  default: [],
});

/**
 * yjsAgreeState
 */
export const yjsAgreeState = atom<number[]>({
  key: "YJS_AGREE_STATE",
  default: [],
});

/**
 * yjsQuestionsState
 */
export const yjsQuestionsState = atom<CPGameQuestions>({
  key: "YJS_QUESTIONS_STATE",
  default: [],
});

/**
 * ChattingState
 */
export const ChattingState = atom<CPChatType[]>({
  key: "CHATTING_STATE",
  default: [],
});

export const ChattingSelector = selector({
  key: "CHATTING_SELECTOR",
  get: ({ get }) => {
    return get(ChattingState);
  },
  set: ({ set }, newValue: CPChatType[]) => {
    set(ChattingState, newValue);
  },
});
