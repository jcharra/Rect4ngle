import { IonButton, IonButtons, IonHeader, IonIcon, IonLabel, IonTitle, IonToolbar } from "@ionic/react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScoreDict, getOfflineScores, getOnlineScores } from "../service/scoreService";
import { GameType } from "../types/GameType";
import HallOfFame from "./HallOfFame";
import "./Highscores.css";
import { globeOutline, locationOutline } from "ionicons/icons";

export interface GameScore {
  gameType: GameType;
  score: number;
}

export default function Highscores({ latestScore, onDismiss }: { latestScore?: GameScore; onDismiss: () => void }) {
  const [isOnline, setOnline] = useState(false);
  const [scores, setScores] = useState<ScoreDict | null | undefined>();
  const { t } = useTranslation();

  const fetchScores = useCallback(async () => {
    setScores(undefined);
    setScores(isOnline ? await getOnlineScores() : await getOfflineScores());
  }, [isOnline]);

  useEffect(() => {
    fetchScores();
  }, [isOnline, fetchScores]);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t("hall_of_fame")}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDismiss}>{t("close")}</IonButton>
          </IonButtons>
        </IonToolbar>
        <div className="switchBar">
          <IonTitle className={`tab ${!isOnline ? "activeTab" : ""}`} onClick={() => setOnline(false)}>
            <IonLabel>
              <IonIcon icon={locationOutline} /> {t("local_scores")}
            </IonLabel>
          </IonTitle>
          <IonTitle className={`tab ${isOnline ? "activeTab" : ""}`} onClick={() => setOnline(true)}>
            <IonLabel>
              <IonIcon icon={globeOutline} />
              <span className="bottomPadded"> {t("online_scores")}</span>
            </IonLabel>
          </IonTitle>
        </div>
      </IonHeader>

      <HallOfFame scores={scores} latestScore={latestScore} />
    </>
  );
}
