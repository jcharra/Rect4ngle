import {
  IonApp,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonIcon,
  IonModal,
  IonPopover,
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
  footstepsOutline,
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
import { saveOnlineScore, saveScore } from "./service/scoreService";
/* Theme variables */
import { InAppReview } from "@capacitor-community/in-app-review";
import { setupIonicReact } from "@ionic/react";
import Timer from "./components/parts/Timer";
import WelcomeScreen from "./components/WelcomeScreen";
import { getGameStats, saveGameStats } from "./service/gameStatsService";
import { hasBeenSeen, markAsSeen } from "./service/tutorialService";
import "./theme/variables.css";
import "./globals.css"
import { GameType } from "./types/GameType";

setupIonicReact({
  mode: "md",
});

const App: React.FC = () => {
  const { t, i18n } = useTranslation();

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

  const tutorialRef = useRef<HTMLIonPopoverElement>(null);
  const [tutorialOpen, setTutorialOpen] = useState(false);

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

    if (settings.scoresPublic) {
      await saveOnlineScore(playerName, score, gameType!);
    }

    const stats = await getGameStats();
    if ((stats + 1) % 30 === 7) {
      await InAppReview.requestReview();
    }
    await saveGameStats(stats + 1);

    setGameType(undefined);
    setHighscoresOpen(true);
  };

  const getSecondsForGameType = (gt: GameType) => {
    return {
      TUTORIAL: -1,
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

  const checkTutorialSeen = async () => {
    if (!(await hasBeenSeen())) {
      setTutorialOpen(true);
      markAsSeen();
    }
  };

  useEffect(() => {
    // check tutorial already seen
    checkTutorialSeen();
  }, []);

  useEffect(() => {
    setTimer(gameType ? getSecondsForGameType(gameType) : -1);
  }, [gameType]);

  useEffect(() => {
    if (settings.language?.code) {
      i18n.changeLanguage(settings.language.code);
    }
  }, [settings.language, i18n]);

  return (
    <IonApp>
      <IonContent>
        <MainArea gameType={gameType} timerData={timerData} stopGame={stopGame} onGameFinished={onGameFinished} />
        <IonPopover ref={tutorialRef} isOpen={tutorialOpen} onDidDismiss={() => setTutorialOpen(false)}>
          <IonContent class="ion-padding">
            <WelcomeScreen />
          </IonContent>
        </IonPopover>
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
                <IonButton onClick={() => startGame(GameType.TUTORIAL)}>
                  <IonIcon slot="icon-only" icon={footstepsOutline} />
                </IonButton>
              </>
            )}
          </IonButtons>
          {!gameType ? (
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
