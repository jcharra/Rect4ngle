import { Storage } from "@capacitor/storage";
import { GameType } from "../types/GameType";

const SCORES = "scores";

export interface Score {
  playerName: string;
  score: number;
  gameType: GameType;
  date: Date;
}

export async function saveScore(
  playerName: string,
  score: number,
  gameType: GameType
) {
  const newScore: Score = {
    playerName,
    score,
    gameType,
    date: new Date(),
  };

  const existing: Score[] = await getScores();
  await Storage.set({
    key: SCORES,
    value: JSON.stringify([...existing, newScore]),
  });
}

export async function getScores(): Promise<Score[]> {
  const existing = await Storage.get({ key: SCORES });
  if (!existing || !existing.value) {
    return [];
  }

  const scores: Score[] = [];
  const parsed = JSON.parse(existing.value);
  parsed.forEach((s: any) => {
    scores.push({
      playerName: s.playerName,
      score: s.score,
      gameType: s.gameType,
      date: new Date(s.date),
    });
  });

  return scores;
}
