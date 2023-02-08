import { CPGames } from "@types";

export const DEFAULT_GAME_STATE: CPGames = {
  DRAWEE: {
    isGameStart: true,
    path: "/start",
  },
  RELAY_RACE: {
    isGameStart: true,
    path: "/start",
  },
};

export const DRAWEE_QUESTION_TIME = 15000;
export const DRAWEE_DRAWING_TIME = 50000;
