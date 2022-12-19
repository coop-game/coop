export type CPUserType = {
  roomId?: string;
  nickname?: string;
  avatarIndex?: number;
  color?: string;
  utcTimeStamp?: string;
  isOwner?: boolean;
};

export type CPChatType = {
  id: number;
  nickname: string;
  message: string;
};

export type CPUserProfile = {
  id?: string;
  nickname?: string;
  avatarIndex?: number;
  color?: string;
  utcTimeStamp?: string;
  isOwner?: boolean;
};

export type CPUserProfilesState = {
  isOwner?: boolean;
  userProfiles?: CPUserProfile[];
};

export type CPGame = {
  question: string;
  questioner: string;
  answer: string;
};

export type CPPage = {
  path: string;
  game?: CPGame;
};

export type CPPages = CPPage[];
