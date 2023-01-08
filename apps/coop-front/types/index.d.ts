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
  isBanned: boolean;
} & Omit<CPUserType, "roomId">;

export type CPUserProfilesState = {
  isOwner?: boolean;
  userProfiles?: CPUserProfile[];
};

export type CPGameRelayRaceAnswer = {
  answer?: string;
  id: number;
  username: string;
  isDraw: boolean;
};

export type CPGameRelayRaceAnswers = CPGameRelayRaceAnswer[];

export type CPPageType =
  | "/lobby"
  | "/start"
  | "/draw"
  | "/result"
  | "/games/relay-race";

export type CPGameQuestion = {
  path: CPPageType;
  answer: string;
  inputAnswer: string[] | null;
  question: string;
  questioner: number;
  isQuestionEnd: boolean;
  solver: number | null;
};

export type CPGameQuestions = CPGameQuestion[];

export type CPGameDrawee = {
  path: CPPageType;
  gametype: "DRAWEE";
  isGameStart: boolean;
  gamePagesIndex: number;
  // QuestionsEnd: boolean[];
};

export type CPGameRelayRace = {
  path: CPPageType;
  gametype: "RELAYRACE";
  isGameStart: boolean;
  gamePagesIndex: number;
  gameOrderNumber: number[];
};

export type CPGameState = CPGameDrawee | CPGameRelayRace;

// -------------  deprecated -------------------
type CPGameTypes = "DRAWEE" | "RELAY_RACE";

type CPGameTypeProperty = {
  isGameStart: boolean;
  path: CPPageType;
};

export type CPGames = Record<CPGameTypes, CPGameTypeProperty>;
