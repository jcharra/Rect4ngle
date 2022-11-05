import {
  IonApp,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonIcon,
  IonModal,
  IonTitle,
  IonToolbar,
  useIonActionSheet,
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
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Help from "./components/Help";
import Highscores from "./components/Highscores";
import { MainArea } from "./components/MainArea";
import SettingsWindow from "./components/Settings";
import { useSettings } from "./hooks/settingsHook";
import "./i18n";
import { saveScore } from "./service/scoreService";
/* Theme variables */
import { setupIonicReact } from "@ionic/react";
import "./theme/variables.css";
import { GameType } from "./types/GameType";

setupIonicReact({
  mode: "md",
});

const App: React.FC = () => {
  const { t } = useTranslation();

  const [latestScore, setLatestScore] = useState(-1);
  const [gameType, setGameType] = useState<GameType | undefined>();

  const [presentGameOptions] = useIonActionSheet();
  const settings = useSettings();

  const highscoresModal = useRef<HTMLIonModalElement>(null);
  const [highscoresOpen, setHighscoresOpen] = useState(false);

  const settingsModal = useRef<HTMLIonModalElement>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const helpModal = useRef<HTMLIonModalElement>(null);
  const [helpOpen, setHelpOpen] = useState(false);

  const startGame = (gameType: GameType) => {
    setLatestScore(-1);
    setGameType(gameType);
  };

  const onGameFinished = async (playerName: string, score: number) => {
    await saveScore(playerName, score, gameType!);
    setLatestScore(score);

    setHighscoresOpen(true);
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
          <IonTitle>
            {t("player")}: <span className="playerName">{settings.activePlayerName}</span>
          </IonTitle>
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
            <IonButton onClick={() => setHelpOpen(true)}>
              <IonIcon slot="icon-only" icon={bulbOutline} />
            </IonButton>
            <IonModal ref={helpModal} onWillDismiss={() => setHelpOpen(false)} isOpen={helpOpen}>
              <Help onDismiss={() => setHelpOpen(false)} />
            </IonModal>

            <IonButton onClick={() => setHighscoresOpen(true)}>
              <IonIcon slot="icon-only" icon={statsChartOutline} />
            </IonButton>
            <IonModal ref={highscoresModal} onWillDismiss={() => setHighscoresOpen(false)} isOpen={highscoresOpen}>
              <Highscores latestScore={latestScore} onDismiss={() => setHighscoresOpen(false)} />
            </IonModal>

            <IonButton onClick={() => setSettingsOpen(true)}>
              <IonIcon slot="icon-only" icon={settingsOutline} />
            </IonButton>
            <IonModal ref={settingsModal} onWillDismiss={() => setSettingsOpen(false)} isOpen={settingsOpen}>
              <SettingsWindow onDismiss={() => setSettingsOpen(false)} settings={settings} />
            </IonModal>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonApp>
  );
};

export default App;
