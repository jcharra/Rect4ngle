import { Preferences } from "@capacitor/preferences";
import { differenceInSeconds, endOfMonth, isSameMonth } from "date-fns";
import { getSubapaseClient } from "../db/supabaseClient";
import { GameType } from "../types/GameType";

const SCORES = "scores";
export const NUMBER_OF_SCORES_TO_KEEP = 10;

export type ScoreDict = {
  [g in GameType]: ScoreRecord[];
};
export interface ScoreRecord {
  playerName: string;
  score: number;
  gameType: GameType;
  date: Date;
}

export async function saveScore(playerName: string, score: number, gameType: GameType) {
  const newScore: ScoreRecord = {
    playerName,
    score,
    gameType,
    date: new Date(),
  };

  const existing = await getOfflineScores();
  let scoresForGameType = existing[gameType];

  scoresForGameType.push(newScore);

  scoresForGameType.sort((s1, s2) => {
    if (s1.score > s2.score) {
      return -1;
    } else if (s1.score < s2.score) {
      return 1;
    } else {
      return s1.date > s2.date ? -1 : 1;
    }
  });

  scoresForGameType = scoresForGameType.slice(0, NUMBER_OF_SCORES_TO_KEEP);

  existing[gameType] = scoresForGameType;

  await Preferences.set({
    key: SCORES,
    value: JSON.stringify(existing),
  });
}

export async function saveOnlineScore(playerName: string, score: number, gameType: GameType) {
  const supabaseClient = getSubapaseClient();

  if (supabaseClient) {
    await supabaseClient.from("highscores").insert([
      {
        player_name: playerName,
        score,
        game_type: gameType,
      },
    ]);
  } else {
    console.log("Online scores not available");
  }
}

export async function getOfflineScores(): Promise<ScoreDict> {
  const existing = await Preferences.get({ key: SCORES });
  if (!existing || !existing.value) {
    return _emptyScoreDict();
  }

  const data = JSON.parse(existing.value) as ScoreDict;
  let formattedData = _emptyScoreDict();

  for (const gameType of [GameType.ONE_MINUTE, GameType.TWO_MINUTES, GameType.THREE_MINUTES]) {
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

function getEmptyScores(): ScoreDict {
  return {
    ONE_MINUTE: [],
    TWO_MINUTES: [],
    THREE_MINUTES: [],
    TRAINING: [],
  };
}

interface ScoreLog {
  [monthStart: string]: ScoreDict;
}

const PREVIOUS_SCORES: ScoreLog = {};

let lastFetchDate: Date | null = null;
let cachedScores = getEmptyScores();
export const getOnlineScores = async (monthStart: Date) => {
  let scores: ScoreDict = getEmptyScores();

  const isCurrentMonth = isSameMonth(monthStart, new Date());

  if (isCurrentMonth && cachedScores && lastFetchDate && differenceInSeconds(new Date(), lastFetchDate) < 10) {
    return cachedScores;
  }

  const monthStartIso = monthStart.toISOString();
  const monthEndIso = endOfMonth(monthStart).toISOString();
  if (!isCurrentMonth && PREVIOUS_SCORES[monthStartIso]) {
    return PREVIOUS_SCORES[monthStartIso];
  }

  const supabaseClient = getSubapaseClient();
  if (!supabaseClient) {
    return null;
  }

  const lower_lim = monthStartIso;
  const upper_lim = monthEndIso;
  let { data, error, status } = await supabaseClient
    .from("highscores")
    .select(`player_name, score, created_at, game_type`)
    .gt("created_at", lower_lim)
    .lt("created_at", upper_lim)
    .order("score", { ascending: false });

  if (!!error || status >= 400) {
    console.error(`Status: ${status}, error: ${error}`);
    return scores;
  }

  if (!data) {
    console.log("No data yet");
    return scores;
  }

  for (let item of data) {
    try {
      scores[item.game_type as GameType].push({
        playerName: item.player_name,
        score: item.score,
        gameType: item.game_type,
        date: new Date(item.created_at),
      });
    } catch {}
  }

  if (isCurrentMonth) {
    lastFetchDate = new Date();
    cachedScores = scores;
  } else {
    PREVIOUS_SCORES[monthStartIso] = scores;
  }

  return scores;
};

function _emptyScoreDict(): ScoreDict {
  return {
    TRAINING: [],
    ONE_MINUTE: [],
    TWO_MINUTES: [],
    THREE_MINUTES: [],
  };
}
