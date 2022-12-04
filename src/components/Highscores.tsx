import { IonChip, IonCol, IonGrid, IonRow } from "@ionic/react";
import { format } from "date-fns";
import { differenceInSeconds } from "date-fns/esm";
import { useAsync } from "react-async-hook";
import { useTranslation } from "react-i18next";
import { getScores, NUMBER_OF_SCORES_TO_KEEP, ScoreDict, ScoreRecord } from "../service/scoreService";
import { GameType } from "../types/GameType";
import "./Highscores.css";
import FixedHeading from "./parts/FixedHeading";

function isRecent(score: ScoreRecord) {
  return differenceInSeconds(new Date(), score.date) < 3;
}

function colorForRank(rank: number) {
  return (
    {
      0: "gold",
      1: "silver",
      2: "bronze",
    }[rank] || "default"
  );
}

function GameTypeRows({ scores }: { scores: ScoreRecord[] }) {
  const { t } = useTranslation();
  let scoreIterable: (ScoreRecord | null)[] = [...scores];
  for (let i = scoreIterable.length; i < NUMBER_OF_SCORES_TO_KEEP; i++) {
    scoreIterable.push(null);
  }

  return (
    <>
      {scoreIterable.map((score, index) => (
        <IonRow
          key={"score-" + index}
          className={score && isRecent(score) ? "recentScore ion-align-items-center" : "ion-align-items-center"}
        >
          <IonCol size="2" className="ion-self-align-center">
            <IonChip class={colorForRank(index)}>{index + 1}</IonChip>
          </IonCol>
          <IonCol size="5" className="left-aligned">
            {score ? score.playerName : t("empty_score")}
          </IonCol>
          <IonCol size="2">{score ? score.score : ""}</IonCol>
          <IonCol size="3">{score ? format(score.date, "dd.MM.yy") : ""}</IonCol>
        </IonRow>
      ))}
    </>
  );
}

export interface GameScore {
  gameType: GameType;
  score: number;
}

export default function Highscores({ latestScore, onDismiss }: { latestScore?: GameScore; onDismiss: () => void }) {
  const { loading, error, result } = useAsync(getScores, []);

  const { t } = useTranslation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log("Error:", error);
    return <div>ERROR!</div>;
  }

  const scores = result as ScoreDict;

  return (
    <>
      <FixedHeading text={t("hall_of_fame")} onDismiss={onDismiss} />
      <IonGrid class="ion-text-center highscoreContainer" style={{ width: "100%" }}>
        {latestScore ? (
          <IonRow className="latestScore">
            {t("your_score")}: {latestScore.score}
          </IonRow>
        ) : null}

        {(!latestScore || latestScore.gameType === GameType.ONE_MINUTE) && (
          <>
            <IonRow className="gameTypeHeader">
              <IonCol>{t("one_minute_header")}</IonCol>
            </IonRow>
            <GameTypeRows scores={scores[GameType.ONE_MINUTE]} />
          </>
        )}

        {(!latestScore || latestScore.gameType === GameType.TWO_MINUTES) && (
          <>
            <IonRow className="gameTypeHeader">
              <IonCol>{t("two_minutes_header")}</IonCol>
            </IonRow>
            <GameTypeRows scores={scores[GameType.TWO_MINUTES]} />
          </>
        )}

        {(!latestScore || latestScore.gameType === GameType.THREE_MINUTES) && (
          <>
            <IonRow className="gameTypeHeader">
              <IonCol>{t("three_minutes_header")}</IonCol>
            </IonRow>
            <GameTypeRows scores={scores[GameType.THREE_MINUTES]} />
          </>
        )}
      </IonGrid>
    </>
  );
}
