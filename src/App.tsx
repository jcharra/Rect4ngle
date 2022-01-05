import {
  IonApp,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonIcon,
  IonTitle,
  IonToolbar,
  useIonActionSheet,
  useIonModal,
} from "@ionic/react";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";
import {
  bulbOutline,
  gameControllerOutline,
  settingsOutline,
  statsChartOutline,
  stopwatchOutline,
} from "ionicons/icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Help from "./components/Help";
import Highscores from "./components/Highscores";
import { MainArea } from "./components/MainArea";
import SettingsWindow from "./components/Settings";
import { useSettings } from "./hooks/settingsHook";
import "./i18n";
import { saveScore } from "./service/scoreService";
/* Theme variables */
import "./theme/variables.css";
import { GameType } from "./types/GameType";

const App: React.FC = () => {
  const { t } = useTranslation();

  const [latestScore, setLatestScore] = useState(-1);
  const [gameType, setGameType] = useState<GameType | undefined>();

  const [presentGameOptions] = useIonActionSheet();
  const settings = useSettings();

  const onDismissHighscores = () => dismissHighscores();
  const [presentHighscores, dismissHighscores] = useIonModal(Highscores, {
    latestScore,
    onDismiss: onDismissHighscores,
  });

  const onDismissSettings = () => dismissSettings();
  const [presentSettings, dismissSettings] = useIonModal(SettingsWindow, {
    onDismiss: onDismissSettings,
    settings,
  });

  const onDismissHelp = () => dismissHelp();
  const [presentHelp, dismissHelp] = useIonModal(Help, {
    onDismiss: onDismissHelp,
  });

  const startGame = (gameType: GameType) => {
    setLatestScore(-1);
    setGameType(gameType);
  };

  const onGameFinished = async (playerName: string, score: number) => {
    await saveScore(playerName, score, gameType!);
    setLatestScore(score);

    presentHighscores();
    setGameType(undefined);
  };

  const getSecondsForGameType = (gt: GameType) => {
    return {
      TRAINING: -1,
      ONE_MINUTE: 60,
      TWO_MINUTES: 120,
      THREE_MINUTES: 180,
    }[gt];
  };

  return (
    <IonApp>
      <IonContent>
        <MainArea
          trainingMode={gameType === GameType.TRAINING}
          initialTimer={gameType ? getSecondsForGameType(gameType) : -1}
          onGameFinished={onGameFinished}
        />
      </IonContent>
      <IonFooter>
        <IonToolbar color="dark" mode="ios">
          <IonTitle>Rect4ngle</IonTitle>
          <IonButtons slot="start" className="ion-padding-horizontal">
            <IonButton onClick={() => startGame(GameType.TRAINING)}>
              <IonIcon slot="icon-only" icon={gameControllerOutline} />
            </IonButton>
            <IonButton
              onClick={() =>
                presentGameOptions({
                  buttons: [
                    {
                      text: t("one_minute"),
                      handler: () => {
                        startGame(GameType.ONE_MINUTE);
                      },
                    },
                    {
                      text: t("two_minutes"),
                      handler: () => {
                        startGame(GameType.TWO_MINUTES);
                      },
                    },
                    {
                      text: t("three_minutes"),
                      handler: () => {
                        startGame(GameType.THREE_MINUTES);
                      },
                    },
                    { text: t("cancel"), role: "cancel" },
                  ],
                  header: t("against_the_clock"),
                })
              }
            >
              <IonIcon slot="icon-only" icon={stopwatchOutline} />
            </IonButton>
          </IonButtons>
          <IonButtons slot="primary" className="ion-padding-horizontal">
            <IonButton onClick={() => presentHelp()}>
              <IonIcon slot="icon-only" icon={bulbOutline} />
            </IonButton>
            <IonButton onClick={() => presentHighscores()}>
              <IonIcon slot="icon-only" icon={statsChartOutline} />
            </IonButton>
            <IonButton onClick={() => presentSettings()}>
              <IonIcon slot="icon-only" icon={settingsOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonApp>
  );
};

export default App;
