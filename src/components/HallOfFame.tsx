import { IonChip, IonCol, IonGrid, IonRow, IonSpinner } from "@ionic/react";
import { differenceInSeconds, format } from "date-fns";
import { useTranslation } from "react-i18next";
import { NUMBER_OF_SCORES_TO_KEEP, ScoreDict, ScoreRecord } from "../service/scoreService";
import { GameType } from "../types/GameType";
import { GameScore } from "./Highscores";

export default function HallOfFame({ scores, latestScore }: { scores?: ScoreDict | null; latestScore?: GameScore }) {
  const { t } = useTranslation();

  if (scores === undefined) {
    return (
      <IonGrid className="highscoreContainer" style={{ width: "100%" }}>
        <IonRow>
          <IonCol className="ion-padding-vertical ion-text-center">
            <IonSpinner name="lines-sharp"></IonSpinner>
          </IonCol>
        </IonRow>
      </IonGrid>
    );
  }

  if (scores === null) {
    return (
      <IonGrid className="highscoreContainer" style={{ width: "100%" }}>
        <IonRow>
          <IonCol className="ion-padding-vertical ion-text-center">{t("scores_unavailable")}</IonCol>
        </IonRow>
      </IonGrid>
    );
  }

  return (
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
