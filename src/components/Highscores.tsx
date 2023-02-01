import { IonButton, IonButtons, IonHeader, IonIcon, IonLabel, IonTitle, IonToolbar } from "@ionic/react";
import { addMonths, isAfter, isSameMonth, startOfMonth } from "date-fns";
import { arrowBackOutline, arrowForwardOutline, globeOutline, locationOutline } from "ionicons/icons";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScoreDict, getOfflineScores, getOnlineScores } from "../service/scoreService";
import { GameType } from "../types/GameType";
import HallOfFame from "./HallOfFame";
import "./Highscores.css";

export interface GameScore {
  gameType: GameType;
  score: number;
}

export default function Highscores({ latestScore, onDismiss }: { latestScore?: GameScore; onDismiss: () => void }) {
  const [isOnline, setOnline] = useState(false);
  const [scores, setScores] = useState<ScoreDict | null | undefined>();
  const [selectedMonth, setSelectedMonth] = useState<Date>(startOfMonth(new Date()));
  const { t } = useTranslation();

  const fetchScores = useCallback(async () => {
    setScores(undefined);
    setScores(isOnline ? await getOnlineScores(selectedMonth) : await getOfflineScores());
  }, [isOnline, selectedMonth]);

  const changeMonth = useCallback(
    (diff) => {
      setSelectedMonth(addMonths(selectedMonth, diff));
    },
    [selectedMonth]
  );

  useEffect(() => {
    fetchScores();
  }, [isOnline, fetchScores, selectedMonth]);

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
              <IonIcon icon={locationOutline} />
              &nbsp;
              {t("local_scores")}
            </IonLabel>
          </IonTitle>
          <IonTitle className={`tab ${isOnline ? "activeTab" : ""}`} onClick={() => setOnline(true)}>
            <IonLabel>
              <IonIcon icon={globeOutline} />
              &nbsp;
              {t("online_scores")}
            </IonLabel>
          </IonTitle>
        </div>
        {isOnline && (
          <div className="monthBar">
            <span className={`previousMonth ${!isAfter(selectedMonth, new Date(2023, 0, 1)) ? "inactive" : ""}`}>
              <IonIcon icon={arrowBackOutline} onClick={() => changeMonth(-1)} />
            </span>
            {t("month_" + selectedMonth.getMonth())} {selectedMonth.getFullYear()}
            <span className={`nextMonth ${isSameMonth(selectedMonth, new Date()) ? "inactive" : ""}`}>
              <IonIcon icon={arrowForwardOutline} onClick={() => changeMonth(1)} />
            </span>
          </div>
        )}
      </IonHeader>

      <HallOfFame scores={scores} latestScore={latestScore} />
    </>
  );
}
