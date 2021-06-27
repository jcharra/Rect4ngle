import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { format, isBefore } from "date-fns";
import { useAsync } from "react-async-hook";
import { getScores, Score } from "../service/scoreService";

export default function Highscores() {
  const { loading, error, result } = useAsync(getScores, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log("Error:", error);
    return <div>ERROR!</div>;
  }

  if (!result || !result.length) {
    return (
      <IonRow>
        <IonCol>No Scores yet</IonCol>
      </IonRow>
    );
  }

  result.sort((a, b) => {
    if (a.score > b.score) {
      return -1;
    } else if (a.score < b.score) {
      return 1;
    }

    return isBefore(a.date, b.date) ? -1 : 1;
  });

  const rows = result.map((score: Score) => (
    <IonRow key={score.date.toISOString()}>
      <IonCol size="4">{score.playerName}</IonCol>
      <IonCol size="2">{score.score}</IonCol>
      <IonCol size="4">{format(score.date, "dd.MM.yy")}</IonCol>
    </IonRow>
  ));

  return (
    <IonGrid class="ion-text-center" style={{ width: "100%" }}>
      {rows}
    </IonGrid>
  );
}
