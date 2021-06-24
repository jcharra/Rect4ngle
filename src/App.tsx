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
  ellipsisHorizontal,
  ellipsisVertical,
  gameControllerOutline,
  statsChartOutline,
  stopwatchOutline,
} from "ionicons/icons";
import { useState } from "react";
import { MainArea } from "./components/MainArea";
/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => {
  const [trainingMode, setTrainingMode] = useState(false);
  const [timer, setTimer] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);
  const [present] = useIonActionSheet();

  const openSettings = () => {
    alert("No settings yet");
  };

  const startTraining = () => {
    if (gameRunning) {
      alert("Stopping game");
      setGameRunning(false);
      setTimer(0);
    }
    setTrainingMode(true);
  };

  const startStopwatchGame = (secs: number) => {
    if (gameRunning) {
      console.log("Game already running!");
      setTimer(0);
    } else if (trainingMode) {
      setTrainingMode(false);
    }

    setGameRunning(true);
    setTimer(secs);
  };

  const onGameFinished = (n: number) => {
    alert("Your score: " + n);
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
                      text: "30 seconds",
                      handler: () => {
                        startStopwatchGame(30);
                      },
                    },
                    {
                      text: "60 seconds",
                      handler: () => {
                        startStopwatchGame(60);
                      },
                    },
                    {
                      text: "90 seconds",
                      handler: () => {
                        startStopwatchGame(90);
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
            <IonButton>
              <IonIcon slot="icon-only" icon={statsChartOutline} />
            </IonButton>
            <IonButton onClick={() => openSettings()}>
              <IonIcon
                slot="icon-only"
                ios={ellipsisHorizontal}
                md={ellipsisVertical}
              />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonApp>
  );
};

export default App;
