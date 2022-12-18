export type CPUserType = {
  roomId?: string;
  nickname?: string;
  avatarIndex?: number;
  color?: string;
  ownerId?: string;
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
};
