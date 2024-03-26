import { IonBackdrop } from "@ionic/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHint } from "../hooks/hintHook";
import { useSettings } from "../hooks/settingsHook";
import { GameType } from "../types/GameType";
import { COLUMN_LIMIT, generateRandomNumber, getSum, PRIMES, PRIME_BONUS, PRIME_MALUS } from "../utils/numberUtils";
import Blackboard from "./Blackboard";
import ControlArea from "./ControlArea";
import "./MainArea.css";
import ScalableRectangleArea from "./parts/ScalableRectangleArea";
import Scoreboard from "./Scoreboard";
import useBonus from "../hooks/bonusHook";
import { countdownSound, gameStartSound, powerUpSound, primeSound } from "../service/audioService";
import { TUTORIAL_NUMBERS } from "../service/tutorialService";

interface TimerData {
  timer: number;
  setTimer: Dispatch<SetStateAction<number>>;
}

interface MainAreaProps {
  gameType?: GameType;
  timerData: TimerData;
  stopGame: () => void;
  onGameFinished: (name: string, n: number) => void;
}

export function MainArea(props: MainAreaProps) {
  const { gameType, timerData, stopGame, onGameFinished } = props;
  const { timer, setTimer } = timerData;
  const { t } = useTranslation();
  const [summands, setSummands] = useState<number[]>([]);
  const [num, setNum] = useState(0);
  const [tutorialIndex, setTutorialIndex] = useState(0);
  const [diamonds, setDiamonds] = useState(0);
  const [delta, setDelta] = useState<number | undefined>();
  const [comment, setComment] = useState<string>("");
  const [intervalRef, setIntervalRef] = useState<any>(null);
  const [startCountdown, setStartCountdown] = useState(-1);
  const { activePlayerName } = useSettings();
  const { showHint, clearHint } = useHint();
  const { getBonus, upgradeBonus, downgradeBonuses, resetBonuses } = useBonus();

  useEffect(() => {
    if (intervalRef) {
      clearInterval(intervalRef);
      setIntervalRef(null);
    }

    if (startCountdown > 0) {
      countdownSound();
      setNum(0);
      setDiamonds(0);
      setTimeout(() => {
        setStartCountdown((val) => val - 1);
      }, 1000);
    } else if (startCountdown === 0) {
      if (num === 0) {
        gameStartSound();
        nextNumber();
      }

      if (timer > 0) {
        const ref = setInterval(() => {
          setTimer((t) => t - 1);
        }, 1000);
        setIntervalRef(ref);
      }
    }
    // eslint-disable-next-line
  }, [startCountdown, timer, setTimer]);

  useEffect(() => {
    if (intervalRef) {
      if (timer === -1 || timer === 0) {
        clearInterval(intervalRef);
        setSummands([]);
      }

      if (timer === 0) {
        onGameFinished(activePlayerName!, diamonds);
      }
    }
    // eslint-disable-next-line
  }, [intervalRef, timer]);

  useEffect(() => {
    setDiamonds(0);

    if (!!intervalRef) {
      clearInterval(intervalRef);
      setTimer(-1);
    }

    if (gameType) {
      nextNumber();

      if (gameType !== GameType.TRAINING && gameType !== GameType.TUTORIAL) {
        setStartCountdown(3);
      }
    } else {
      setStartCountdown(-1);
      setNum(0);
      setSummands([]);
      setTutorialIndex(0);
      resetBonuses();
    }
    // eslint-disable-next-line
  }, [gameType, setTimer]);

  const add = (n: number) => {
    if (summands.length < COLUMN_LIMIT && getSum(summands) <= num) {
      setSummands((oldVal: number[]) => {
        return [...oldVal, n];
      });
    }
  };

  const nextNumber = () => {
    if (gameType === GameType.TUTORIAL) {
      setTutorialIndex((t) => t + 1);
      const n = TUTORIAL_NUMBERS[tutorialIndex];
      if (n) {
        setNum(n);
      } else {
        setNum(0);
        stopGame();
      }
    } else {
      let newRandomNum = generateRandomNumber();
      while (newRandomNum === num) {
        newRandomNum = generateRandomNumber();
      }
      setNum(newRandomNum);
    }

    setSummands([]);
  };

  const retry = () => {
    setSummands([]);
  };

  const backspace = () => {
    setSummands((oldVal: number[]) => (oldVal.length > 0 ? oldVal.slice(0, oldVal.length - 1) : []));
  };

  const suggestSolution = (n: number) => {
    if (PRIMES.indexOf(n) >= 0) {
      return t("was_prime", { n });
    } else {
      for (let i = 9; i > 1; i--) {
        if (n % i === 0 && n / i > 1) {
          return t("factorization", { n, i, i2: n / i });
        }
      }
    }
    return "";
  };

  const check = () => {
    const correct = summands.reduce((a, b) => a + b, 0) === num;

    if (correct) {
      const isSquare = summands[0] === summands.length;

      if (isSquare) {
        addDelta(10 * getBonus(summands[0]), t("square"));
        upgradeBonus(summands.length);
        powerUpSound();
      } else {
        addDelta(summands[0] * getBonus(summands[0]), t("correct"));
      }
      clearHint();
    } else {
      addDelta(-5, t("wrong"));
      downgradeBonuses();
      showHint(suggestSolution(num), 0);
    }

    if (gameType === GameType.TUTORIAL && !correct) {
      showHint(t("tutorial_not_yet_correct"), 0);
    } else {
      nextNumber();
    }
  };

  const checkPrime = () => {
    const isPrime = PRIMES.indexOf(num) > -1;

    if (isPrime) {
      addDelta(PRIME_BONUS, t("prime_correct"));
      primeSound();
      clearHint();
    } else {
      addDelta(PRIME_MALUS, t("nope"));
      downgradeBonuses();
      showHint(suggestSolution(num), 0);
    }

    if (gameType === GameType.TUTORIAL && !isPrime) {
      showHint(t("tutorial_not_a_prime"), 0);
    } else {
      nextNumber();
    }
  };

  const addDelta = (delta: number, comment: string = "") => {
    setDelta(delta);
    setTimeout(() => setDelta(undefined), 1000);

    setComment(comment);
    setTimeout(() => setComment(""), 1000);

    setDiamonds((oldVal) => Math.max(0, oldVal + delta));
  };

  const skip = () => {
    addDelta(-2);
    nextNumber();
  };

  const functions = { add, check, skip, backspace, checkPrime, retry };

  return (
    <>
      {startCountdown > 0 && (
        <>
          <IonBackdrop tappable={false} />
          <div className="countdown">{startCountdown}</div>
        </>
      )}
      <div className="app">
        <div className="flexContainer">
          <div className="blackboardBox">
            <Blackboard num={num} summands={summands} />
          </div>
          <div className="scoreBox">
            <Scoreboard diamonds={diamonds} delta={delta} comment={comment} />
          </div>
          <div className="rectangleBox">
            <ScalableRectangleArea num={num} summands={summands} gameType={gameType} />
          </div>
          <div className="controlArea">
            <ControlArea functions={functions} summands={summands} gameType={gameType} getBonus={getBonus} />
          </div>
        </div>
      </div>
    </>
  );
}
