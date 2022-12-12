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
  stopCircleOutline,
  stopwatchOutline,
} from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Help from "./components/Help";
import Highscores, { GameScore } from "./components/Highscores";
import { MainArea } from "./components/MainArea";
import SettingsWindow from "./components/Settings";
import { useSettings } from "./hooks/settingsHook";
import "./i18n";
import { saveScore } from "./service/scoreService";
/* Theme variables */
import { setupIonicReact } from "@ionic/react";
import Timer from "./components/parts/Timer";
import "./theme/variables.css";
import { GameType } from "./types/GameType";
import { AdMob } from "@capacitor-community/admob";
import { INTERSTITIAL_FREQUENCY, showInterstitial } from "./service/admob";
import { getGameStats, saveGameStats } from "./service/gameStatsService";
import { TESTING_DEVICES_IDS } from "./testingDevicesIds";

setupIonicReact({
  mode: "md",
});

export async function initialize(): Promise<void> {
  await AdMob.trackingAuthorizationStatus();
  await AdMob.initialize({
    requestTrackingAuthorization: false,
    testingDevices: TESTING_DEVICES_IDS,
    initializeForTesting: true,
  });
}

const App: React.FC = () => {
  const { t } = useTranslation();

  const [latestScore, setLatestScore] = useState<GameScore | undefined>();
  const [gameType, setGameType] = useState<GameType | undefined>();

  const [presentGameOptions] = useIonActionSheet();
  const settings = useSettings();

  const highscoresModal = useRef<HTMLIonModalElement>(null);
  const [highscoresOpen, setHighscoresOpen] = useState(false);

  const settingsModal = useRef<HTMLIonModalElement>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const helpModal = useRef<HTMLIonModalElement>(null);
  const [helpOpen, setHelpOpen] = useState(false);

  const [timer, setTimer] = useState(0);

  const startGame = (gameType: GameType) => {
    setLatestScore(undefined);
    setGameType(gameType);
  };

  const stopGame = () => {
    setLatestScore(undefined);
    setGameType(undefined);
  };

  const onGameFinished = async (playerName: string, score: number) => {
    await saveScore(playerName, score, gameType!);
    setLatestScore({ score, gameType: gameType! });

    const stats = await getGameStats();
    if ((stats + 1) % INTERSTITIAL_FREQUENCY === 0) {
      await showInterstitial().catch(console.error);
    }
    await saveGameStats(stats + 1);

    setGameType(undefined);
    setHighscoresOpen(true);
  };

  const getSecondsForGameType = (gt: GameType) => {
    return {
      TRAINING: -1,
      ONE_MINUTE: 60,
      TWO_MINUTES: 120,
      THREE_MINUTES: 180,
    }[gt];
  };

  const timerData = {
    timer: timer,
    setTimer: setTimer,
  };

  useEffect(() => {
    // init AdMob
    initialize();
  }, []);

  useEffect(() => {
    setTimer(gameType ? getSecondsForGameType(gameType) : -1);
  }, [gameType]);

  return (
    <IonApp>
      <IonContent>
        <MainArea gameType={gameType} timerData={timerData} onGameFinished={onGameFinished} />
      </IonContent>
      <IonFooter>
        <IonToolbar color="dark" mode="ios">
          {!!gameType && (
            <IonTitle>
              {t("player")}: <span className="playerName">{settings.activePlayerName}</span>
            </IonTitle>
          )}
          <IonButtons slot="start" className="ion-padding-horizontal">
            {!!gameType ? (
              <IonButton onClick={() => stopGame()}>
                <IonIcon slot="icon-only" icon={stopCircleOutline} />
              </IonButton>
            ) : (
              <>
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
              </>
            )}
          </IonButtons>
          {!gameType ? (
            <IonButtons slot="primary" className="ion-padding-horizontal">
              <IonButton onClick={() => setHelpOpen(true)} id="helpIcon">
                <IonIcon slot="icon-only" icon={bulbOutline} />
              </IonButton>
              <IonModal ref={helpModal} onWillDismiss={() => setHelpOpen(false)} isOpen={helpOpen}>
                <Help onDismiss={() => setHelpOpen(false)} />
              </IonModal>

              <IonButton onClick={() => setHighscoresOpen(true)}>
                <IonIcon slot="icon-only" icon={statsChartOutline} />
              </IonButton>
              <IonModal
                ref={highscoresModal}
                onWillDismiss={() => {
                  setHighscoresOpen(false);
                  setLatestScore(undefined);
                }}
                isOpen={highscoresOpen}
              >
                <Highscores
                  latestScore={latestScore}
                  onDismiss={() => {
                    setHighscoresOpen(false);
                    setLatestScore(undefined);
                  }}
                />
              </IonModal>

              <IonButton onClick={() => setSettingsOpen(true)}>
                <IonIcon slot="icon-only" icon={settingsOutline} />
              </IonButton>
              <IonModal ref={settingsModal} onWillDismiss={() => setSettingsOpen(false)} isOpen={settingsOpen}>
                <SettingsWindow onDismiss={() => setSettingsOpen(false)} settings={settings} />
              </IonModal>
            </IonButtons>
          ) : (
            <IonButtons slot="primary" className="ion-padding-horizontal">
              {timer >= 0 && <Timer seconds={timer} />}
            </IonButtons>
          )}
        </IonToolbar>
      </IonFooter>
    </IonApp>
  );
};

export default App;
