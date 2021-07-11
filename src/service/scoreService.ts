import { Storage } from "@capacitor/storage";
import { GameType } from "../types/GameType";

const SCORES = "scores";
const NUMBER_OF_SCORES_TO_KEEP = 10;

export type ScoreDict = {
  [g in GameType]: ScoreRecord[];
};
export interface ScoreRecord {
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
  const newScore: ScoreRecord = {
    playerName,
    score,
    gameType,
    date: new Date(),
  };

  const existing = await getScores();
  let scoresForGameType = existing[gameType];

  scoresForGameType.push(newScore);

  scoresForGameType.sort((s1, s2) => {
    if (s1.score > s2.score) {
      return 1;
    } else if (s1.score < s2.score) {
      return -1;
    } else {
      return s1.date > s2.date ? 1 : -1;
    }
  });

  scoresForGameType = scoresForGameType.slice(0, NUMBER_OF_SCORES_TO_KEEP);

  existing[gameType] = scoresForGameType;

  await Storage.set({
    key: SCORES,
    value: JSON.stringify(existing),
  });
}

export async function getScores(): Promise<ScoreDict> {
  const existing = await Storage.get({ key: SCORES });
  if (!existing || !existing.value) {
    return _emptyScoreDict();
  }

  const data = JSON.parse(existing.value) as ScoreDict;
  let formattedData = _emptyScoreDict();

  for (const gameType of [
    GameType.ONE_MINUTE,
    GameType.TWO_MINUTES,
    GameType.THREE_MINUTES,
  ]) {
    const scores = data[gameType as GameType];
    for (const score of scores) {
      formattedData[gameType as GameType].push({
        ...score,
        date: new Date(score.date),
      });
    }
  }

  return formattedData;
}

function _emptyScoreDict(): ScoreDict {
  return {
    TRAINING: [],
    ONE_MINUTE: [],
    TWO_MINUTES: [],
    THREE_MINUTES: [],
  };
}
