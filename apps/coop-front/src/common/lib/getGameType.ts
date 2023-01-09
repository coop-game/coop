import { CPGameDrawee, CPGameRelayRace } from "@types";

export function relayRaceTypeCheck(
  gameState: CPGameDrawee | CPGameRelayRace
): gameState is CPGameRelayRace {
  return (gameState as CPGameRelayRace).gameOrderNumber !== undefined;
}
