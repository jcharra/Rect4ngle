import { IonButton, IonCol, IonGrid, IonRow } from "@ionic/react";
import { format } from "date-fns";
import { useAsync } from "react-async-hook";
import { useTranslation } from "react-i18next";
import { getPlayerConfig, PlayerConfig } from "../service/playerService";
import { getScores, ScoreDict, ScoreRecord } from "../service/scoreService";
import { GameType } from "../types/GameType";
import "./Highscores.css";

function GameTypeRows({
  scores,
  playerConfig,
}: {
  scores: ScoreRecord[];
  playerConfig: PlayerConfig;
}) {
  const { t } = useTranslation();

  if (!scores || scores.length === 0) {
    return (
      <IonRow>
        <IonCol>{t("no_scores_yet")}</IonCol>
      </IonRow>
    );
  }

  return (
    <>
      {scores.map((score) => (
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
          <IonCol size="4">{format(score.date, "dd.MM.yy")}</IonCol>
        </IonRow>
      ))}
    </>
  );
}

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

  const scores = result as ScoreDict;

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
      <IonRow>
        <IonCol>One minute</IonCol>
      </IonRow>
      <GameTypeRows
        playerConfig={playerConfig!}
        scores={scores[GameType.ONE_MINUTE]}
      />
      <IonRow>
        <IonCol>Two minutes</IonCol>
      </IonRow>
      <GameTypeRows
        playerConfig={playerConfig!}
        scores={scores[GameType.TWO_MINUTES]}
      />
      <IonRow>
        <IonCol>Three minutes</IonCol>
      </IonRow>
      <GameTypeRows
        playerConfig={playerConfig!}
        scores={scores[GameType.THREE_MINUTES]}
      />
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
