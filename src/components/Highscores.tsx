import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { format, isBefore } from "date-fns";
import { useAsync } from "react-async-hook";
import { getPlayerConfig } from "../service/playerService";
import { getScores, Score } from "../service/scoreService";
import { GameType } from "../types/GameType";
import "./Highscores.css";

export default function Highscores({
  latestScore,
  filterGameType,
}: {
  latestScore?: number;
  filterGameType?: GameType;
  filterName?: string;
}) {
  const { loading, error, result } = useAsync(getScores, []);
  const { result: playerConfig } = useAsync(getPlayerConfig, []);

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
    <IonGrid class="ion-text-center" style={{ width: "100%" }}>
      {latestScore && latestScore !== -1 && (
        <IonRow className="latestScore">Your Score: {latestScore}</IonRow>
      )}

      <IonRow className="highscoreHeader">
        <IonCol size="12">
          <strong>Hall of Fame</strong>
        </IonCol>
      </IonRow>
      {rows.length ? (
        rows
      ) : (
        <IonRow>
          <IonCol>No scores yet</IonCol>
        </IonRow>
      )}
    </IonGrid>
  );
}
