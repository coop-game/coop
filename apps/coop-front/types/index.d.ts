import { CPGamePage } from "./index.d";
export type CPUserType = {
  roomId?: string;
  nickname?: string;
  avatarIndex?: number;
  color?: string;
  utcTimeStamp?: number;
  isOwner?: boolean;
};

export type CPChatType = {
  id: number;
  nickname: string;
  message: string;
};

export type CPUserProfile = {
  id?: string;
} & Omit<CPUserType, "roomId">;

export type CPUserProfilesState = {
  isOwner?: boolean;
  userProfiles?: CPUserProfile[];
};

export type CPGamePage = {
  answer: string;
  question: string;
  questioner: string;
};

export type CPGamePages = CPGamePage[];

export type CPNowPageType = "/lobby" | "/start" | "/draw" | "/result";

type CPGameTypes = "DRAWEE";

type CPGameTypeProperty = {
  firstPath: CPNowPageType;
  defaultPages: CPGamePages;
};

export type CPGames = Record<CPGameTypes, CPGameTypeProperty>;

export type CPGameState = {
  isGameStart: boolean;
  gamePages: CPGamePages;
  gamePagesIndex: number;
  agreeSet: Set<number>;
  nowPage: CPNowPageType;
};
