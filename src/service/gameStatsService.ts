import { Preferences } from "@capacitor/preferences";

const STATS_KEY = "gameStats";

export async function getGameCount() {}

export async function saveGameStats(numGames: number) {
  await Preferences.set({
    key: STATS_KEY,
    value: JSON.stringify(numGames),
  });
}

export async function getGameStats(): Promise<number> {
  const existing = await Preferences.get({ key: STATS_KEY });
  if (!existing || !existing.value) {
    return 0;
  }

  return JSON.parse(existing.value);
}
