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
  isDraw: boolean;
  id: number;
} & Omit<CPUserType, "utcTimeStamp" | "isBanned" | "isOwner" | "roomId">;

export type CPGameRelayRaceAnswers = CPGameRelayRaceAnswer[];

export type CPPageType =
  | "/games/lobby"
  | "/games/drawee/start"
  | "/games/drawee/draw"
  | "/games/result"
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

export type CPGameCommonType = {
  path: CPPageType;
  gameType: CPGameTypes;
  isGameStart: boolean;
  gamePagesIndex: number;
  pageStartTime: number;
};

export type Modify<T, R> = Omit<T, keyof R> & R;

export type CPGameTypeRelayRace = "RELAY_RACE";
export type CPGameTypeDrawee = "DRAWEE";

export type CPGameDrawee = Modify<
  CPGameCommonType,
  {
    gameType: CPGameTypeDrawee;
  }
>;

export type CPGameRelayRace = Modify<
  CPGameCommonType,
  {
    gameType: CPGameTypeRelayRace;
    gameOrderNumber: number[];
  }
>;

type CPGameTypes = CPGameTypeDrawee | CPGameTypeRelayRace;
export type CPGameState = CPGameDrawee | CPGameRelayRace;

// -------------  deprecated -------------------
type CPGameTypeProperty = {
  isGameStart: boolean;
  path: CPPageType;
};

export type CPGames = Record<CPGameTypes, CPGameTypeProperty>;
