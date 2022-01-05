import { Storage } from "@capacitor/storage";

const PLAYER_CONFIG = "playerConfig";

export interface PlayerConfig {
  activePlayer: number;
  names: string[];
}

export async function savePlayerConfig(config: PlayerConfig) {
  await Storage.set({
    key: PLAYER_CONFIG,
    value: JSON.stringify(config),
  });
}

export const DEFAULT_PLAYER_CONFIG = {
  activePlayer: 0,
  names: ["Player 1"],
};

export async function getPlayerConfig(): Promise<PlayerConfig> {
  console.log("Fetch from store");
  const existing = await Storage.get({ key: PLAYER_CONFIG });
  if (!existing || !existing.value) {
    return DEFAULT_PLAYER_CONFIG;
  }

  return JSON.parse(existing.value);
}
