import { Storage } from "@capacitor/storage";

const PLAYER_CONFIG = "playerConfig";

interface PlayerConfig {
  activePlayer: number;
  names: string[];
}

export async function savePlayer(index: number, name: string) {
  const config: PlayerConfig = await getPlayerConfig();

  const names = [...config.names];
  names[index] = name;

  await Storage.set({
    key: PLAYER_CONFIG,
    value: JSON.stringify({ ...config, names }),
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
