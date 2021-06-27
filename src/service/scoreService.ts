import { Storage } from "@capacitor/storage";

const SCORES = "scores";

export interface Score {
  playerName: string;
  score: number;
  date: Date;
}

export async function saveScore(playerName: string, score: number) {
  const newScore: Score = {
    playerName,
    score,
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
      date: new Date(s.date),
    });
  });

  return scores;
}
