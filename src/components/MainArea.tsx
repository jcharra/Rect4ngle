import { IonBackdrop } from "@ionic/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSettings } from "../hooks/settingsHook";
import { GameType } from "../types/GameType";
import { COLUMN_LIMIT, generateRandomNumber, getSum, PRIMES, PRIME_BONUS, PRIME_MALUS } from "../utils/numberUtils";
import Blackboard from "./Blackboard";
import ControlArea from "./ControlArea";
import "./MainArea.css";
import ScalableRectangleArea from "./parts/ScalableRectangleArea";
import Scoreboard from "./Scoreboard";

interface TimerData {
  timer: number;
  setTimer: Dispatch<SetStateAction<number>>;
}

interface MainAreaProps {
  gameType?: GameType;
  timerData: TimerData;
  onGameFinished: (name: string, n: number) => void;
}

export function MainArea(props: MainAreaProps) {
  const { gameType, timerData, onGameFinished } = props;
  const { timer, setTimer } = timerData;
  const { t } = useTranslation();
  const [summands, setSummands] = useState<number[]>([]);
  const [num, setNum] = useState(0);
  const [diamonds, setDiamonds] = useState(0);
  const [delta, setDelta] = useState<number | undefined>();
  const [comment, setComment] = useState<string>("");
  const [intervalRef, setIntervalRef] = useState<any>(null);
  const [startCountdown, setStartCountdown] = useState(-1);
  const { activePlayerName } = useSettings();

  useEffect(() => {
    if (intervalRef) {
      clearInterval(intervalRef);
      setIntervalRef(null);
    }

    if (startCountdown > 0) {
      (document as any).getElementById(`beep${startCountdown}`).play();

      setNum(0);
      setDiamonds(0);
      setTimeout(() => {
        setStartCountdown((val) => val - 1);
      }, 1000);
    } else if (startCountdown === 0) {
      if (num === 0) {
        (document as any).getElementById("success").play();
        newNum();
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
      newNum();

      if (gameType !== GameType.TRAINING) {
        setStartCountdown(3);
      }
    } else {
      setStartCountdown(-1);
      setNum(0);
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

  const newNum = () => {
    let newRandomNum = generateRandomNumber();
    while (newRandomNum === num) {
      newRandomNum = generateRandomNumber();
    }
    setNum(newRandomNum);
    setSummands([]);
  };

  const retry = () => {
    setSummands([]);
  };

  const backspace = () => {
    setSummands((oldVal: number[]) => (oldVal.length > 0 ? oldVal.slice(0, oldVal.length - 1) : []));
  };

  const check = () => {
    const sum = summands.reduce((a, b) => a + b, 0);
    if (summands[0] === summands.length) {
      addDelta(10, t("square"));
    } else if (sum === num) {
      addDelta(summands[0], t("correct"));
    } else {
      addDelta(-5, t("wrong"));
    }
    newNum();
  };

  const checkPrime = () => {
    if (PRIMES.indexOf(num) > -1) {
      addDelta(PRIME_BONUS, t("prime_correct"));
    } else {
      addDelta(PRIME_MALUS, t("nope"));
    }
    newNum();
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
    newNum();
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
            <ScalableRectangleArea num={num} summands={summands} />
          </div>
          <div className="controlArea">
            <ControlArea functions={functions} summands={summands} disabled={!gameType} />
          </div>
        </div>
      </div>
    </>
  );
}
