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
  ellipsisHorizontal,
  ellipsisVertical,
  gameControllerOutline,
  settingsOutline,
  statsChartOutline,
  stopwatchOutline,
} from "ionicons/icons";
import { useState } from "react";
import Help from "./components/Help";
import Highscores from "./components/Highscores";
import { MainArea } from "./components/MainArea";
import Settings from "./components/Settings";
import { getPlayerConfig } from "./service/playerService";
import { saveScore } from "./service/scoreService";
/* Theme variables */
import "./theme/variables.css";
import { GameType } from "./types/GameType";

const App: React.FC = () => {
  const [trainingMode, setTrainingMode] = useState(false);
  const [timer, setTimer] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);
  const [present] = useIonActionSheet();
  const [presentHighscores, dismiss] = useIonModal(Highscores);
  const [presentSettings, dismissSettings] = useIonModal(Settings);
  const [presentHelp, dismissHelp] = useIonModal(Help);

  const startTraining = () => {
    if (gameRunning) {
      alert("Stopping game");
      setGameRunning(false);
      setTimer(-1);
    }
    setTrainingMode(true);
  };

  const startStopwatchGame = (gameType: GameType) => {
    if (gameRunning) {
      setTimer(-1);
    } else if (trainingMode) {
      setTrainingMode(false);
    }

    setGameRunning(true);
    setTimer(gameType);
  };

  const onGameFinished = async (n: number) => {
    alert("Your score: " + n);
    const config = await getPlayerConfig();
    saveScore(config.names[config.activePlayer], n, timer);
    setTimer(-1);
    setGameRunning(false);
  };

  return (
    <IonApp>
      <IonContent>
        <MainArea
          trainingMode={trainingMode}
          initialTimer={timer}
          onGameFinished={onGameFinished}
        />
      </IonContent>
      <IonFooter>
        <IonToolbar color="dark" mode="ios">
          <IonTitle>Rect4ngle</IonTitle>
          <IonButtons slot="start" className="ion-padding-horizontal">
            <IonButton onClick={() => startTraining()}>
              <IonIcon slot="icon-only" icon={gameControllerOutline} />
            </IonButton>
            <IonButton
              onClick={() =>
                present({
                  buttons: [
                    {
                      text: "1 second",
                      handler: () => {
                        startStopwatchGame(1);
                      },
                    },
                    {
                      text: "30 seconds",
                      handler: () => {
                        startStopwatchGame(GameType.THIRTY_SECS);
                      },
                    },
                    {
                      text: "60 seconds",
                      handler: () => {
                        startStopwatchGame(GameType.SIXTY_SECS);
                      },
                    },
                    {
                      text: "90 seconds",
                      handler: () => {
                        startStopwatchGame(GameType.NINETY_SECS);
                      },
                    },
                    { text: "Cancel", role: "cancel" },
                  ],
                  header: "Play against the clock",
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
