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

export type CPPageType = "/lobby" | "/start" | "/draw" | "/result" | "/games/relay-race";

export type CPGameQuestion = {
  path: CPPageType;
  answer: string;
  inputAnswer: string[] | null;
  question: string;
  questioner: number;
  solver: number | null;
};



export type CPGameQuestions = CPGameQuestion[];

export type CPGameState = {
  path: CPPageType;
  gametype: CPGameTypes;
  isGameStart: boolean;
  gamePagesIndex: number;
};

// -------------  deprecated -------------------
type CPGameTypes = "DRAWEE" | "RELAY_RACE";

type CPGameTypeProperty = {
  isGameStart: boolean;
  path: CPPageType;
};

export type CPGames = Record<CPGameTypes, CPGameTypeProperty>;
