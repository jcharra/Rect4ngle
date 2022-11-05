import { IonBackdrop, IonCol, IonGrid, IonRow } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSettings } from "../hooks/settingsHook";
import { GameType } from "../types/GameType";
import { COLUMN_LIMIT, generateRandomNumber, getSum, PRIMES, PRIME_BONUS, PRIME_MALUS } from "../utils/numberUtils";
import Blackboard from "./Blackboard";
import ControlArea from "./ControlArea";
import "./MainArea.css";
import ScalableRectangleArea from "./parts/ScalableRectangleArea";
import Timer from "./parts/Timer";
import Scoreboard from "./Scoreboard";

interface MainAreaProps {
  gameType?: GameType;
  initialTimer: number;
  onGameFinished: (name: string, n: number) => void;
}

export function MainArea(props: MainAreaProps) {
  const { gameType, initialTimer, onGameFinished } = props;

  const { t } = useTranslation();
  const [summands, setSummands] = useState<number[]>([]);
  const [num, setNum] = useState(0);
  const [diamonds, setDiamonds] = useState(0);
  const [delta, setDelta] = useState<number | undefined>();
  const [comment, setComment] = useState<string>("");
  const [timer, setTimer] = useState(0);
  const [intervalRef, setIntervalRef] = useState<any>(null);
  const [startCountdown, setStartCountdown] = useState(-1);
  const { activePlayerName } = useSettings();

  useEffect(() => {
    if (intervalRef) {
      clearInterval(intervalRef);
      setIntervalRef(null);
    }

    if (startCountdown > 0) {
      (document as any).getElementById("beep").play();
      setNum(0);
      setTimeout(() => setStartCountdown((val) => val - 1), 1000);
    } else if (startCountdown === 0) {
      if (initialTimer > 0) {
        newNum();
        setTimer(initialTimer);
        const ref = setInterval(() => {
          setTimer((t) => t - 1);
        }, 1000);
        setIntervalRef(ref);
        (document as any).getElementById("success").play();
        setDiamonds(0);
      }
    }
  }, [startCountdown, initialTimer]);

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
  }, [gameType]);

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

  const controlsDisabled = timer === 0 && gameType !== GameType.TRAINING;
  const functions = { add, check, skip, backspace, checkPrime, retry };

  return (
    <>
      {startCountdown > 0 && (
        <>
          <IonBackdrop tappable={false} />
          <div className="countdown">{startCountdown}</div>
        </>
      )}
      <IonGrid className="app">
        <IonRow className="upperRow">
          <IonCol size="4">
            <Blackboard num={num} summands={summands} />
          </IonCol>
          <IonCol size="8">
            <ScalableRectangleArea num={num} summands={summands} />
          </IonCol>
        </IonRow>

        <IonRow className="lowerRow">
          <IonCol size="4">
            <Scoreboard diamonds={diamonds} delta={delta} comment={comment} />
            <Timer seconds={timer} />
          </IonCol>
          <IonCol size="8">
            <ControlArea functions={functions} summands={summands} disabled={controlsDisabled} />
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
}
