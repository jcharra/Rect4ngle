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

export async function getPlayerConfig(): Promise<PlayerConfig> {
  const existing = await Storage.get({ key: PLAYER_CONFIG });
  if (!existing || !existing.value) {
    return {
      activePlayer: 0,
      names: ["Spieler1"],
    };
  }

  return JSON.parse(existing.value);
}
