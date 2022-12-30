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
  id?: number;
} & Omit<CPUserType, "roomId">;

export type CPUserProfilesState = {
  isOwner?: boolean;
  userProfiles?: CPUserProfile[];
};

export type CPPageType = "/lobby" | "/start" | "/draw" | "/result";

export type CPGameQuestion = {
  answer?: string;
  question?: string;
  questioner?: number;
};

export type CPGameQuestions = CPGameQuestion[];

export type CPGameState = {
  path: CPPageType;
  isGameStart: boolean;
  gamePagesIndex: number;
};

// -------------  deprecated -------------------
type CPGameTypes = "DRAWEE";

type CPGameTypeProperty = {
  gamePages: CPGamePages;
  gamePagesIndex: number;
};

export type CPGames = Record<CPGameTypes, CPGameTypeProperty>;
