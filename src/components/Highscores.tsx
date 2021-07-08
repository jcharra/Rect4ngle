import { IonButton, IonCol, IonGrid, IonRow } from "@ionic/react";
import { format, isBefore } from "date-fns";
import { useAsync } from "react-async-hook";
import { useTranslation } from "react-i18next";
import { getPlayerConfig } from "../service/playerService";
import { getScores, Score } from "../service/scoreService";
import "./Highscores.css";

export default function Highscores({
  latestScore,
  onDismiss,
}: {
  latestScore?: number;
  onDismiss: () => void;
}) {
  const { loading, error, result } = useAsync(getScores, []);
  const { result: playerConfig } = useAsync(getPlayerConfig, []);

  const { t } = useTranslation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log("Error:", error);
    return <div>ERROR!</div>;
  }

  const scores = result || [];

  scores.sort((a, b) => {
    if (a.score > b.score) {
      return -1;
    } else if (a.score < b.score) {
      return 1;
    }

    return isBefore(a.date, b.date) ? -1 : 1;
  });

  const rows = scores.map((score: Score) => (
    <IonRow
      key={score.date.toISOString()}
      className={
        score.playerName === playerConfig?.names[playerConfig?.activePlayer]
          ? "currentPlayer"
          : ""
      }
    >
      <IonCol size="4">{score.playerName}</IonCol>
      <IonCol size="2">{score.score}</IonCol>
      <IonCol size="2">{score.gameType}s</IonCol>
      <IonCol size="4">{format(score.date, "dd.MM.yy")}</IonCol>
    </IonRow>
  ));

  return (
    <IonGrid
      class="ion-text-center highscoreContainer"
      style={{ width: "100%" }}
    >
      {latestScore && latestScore !== -1 ? (
        <IonRow className="latestScore">
          {t("your_score")}: {latestScore}
        </IonRow>
      ) : null}

      <IonRow className="highscoreHeader">
        <IonCol size="12">
          <strong>{t("hall_of_fame")}</strong>
        </IonCol>
      </IonRow>
      {rows.length ? (
        rows
      ) : (
        <IonRow>
          <IonCol>{t("no_scores_yet")}</IonCol>
        </IonRow>
      )}
      <IonRow>
        <IonCol>
          <IonButton expand="block" onClick={() => onDismiss()}>
            {t("close")}
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}
