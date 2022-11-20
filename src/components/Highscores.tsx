import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { format } from "date-fns";
import { useAsync } from "react-async-hook";
import { useTranslation } from "react-i18next";
import { useSettings } from "../hooks/settingsHook";
import { getScores, NUMBER_OF_SCORES_TO_KEEP, ScoreDict, ScoreRecord } from "../service/scoreService";
import { GameType } from "../types/GameType";
import "./Highscores.css";
import FixedHeading from "./parts/FixedHeading";

function GameTypeRows({ scores }: { scores: ScoreRecord[] }) {
  const { activePlayerName } = useSettings();
  let scoreIterable: (ScoreRecord | null)[] = [...scores];
  for (let i = scoreIterable.length; i < NUMBER_OF_SCORES_TO_KEEP; i++) {
    scoreIterable.push(null);
  }

  return (
    <>
      {scoreIterable.map((score, index) => (
        <IonRow
          key={"score-" + index}
          className={score && score.playerName === activePlayerName ? "currentPlayer" : ""}
        >
          <IonCol size="6">{score ? score.playerName : "---"}</IonCol>
          <IonCol size="3">{score ? score.score : 0}</IonCol>
          <IonCol size="3">{score ? format(score.date, "dd.MM.yy") : "---"}</IonCol>
        </IonRow>
      ))}
    </>
  );
}

export default function Highscores({ latestScore, onDismiss }: { latestScore?: number; onDismiss: () => void }) {
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
        {latestScore && latestScore !== -1 ? (
          <IonRow className="latestScore">
            {t("your_score")}: {latestScore}
          </IonRow>
        ) : null}

        <IonRow className="gameTypeHeader">
          <IonCol>{t("one_minute_header")}</IonCol>
        </IonRow>
        <GameTypeRows scores={scores[GameType.ONE_MINUTE]} />
        <IonRow className="gameTypeHeader">
          <IonCol>{t("two_minutes_header")}</IonCol>
        </IonRow>
        <GameTypeRows scores={scores[GameType.TWO_MINUTES]} />
        <IonRow className="gameTypeHeader">
          <IonCol>{t("three_minutes_header")}</IonCol>
        </IonRow>
        <GameTypeRows scores={scores[GameType.THREE_MINUTES]} />
      </IonGrid>
    </>
  );
}
