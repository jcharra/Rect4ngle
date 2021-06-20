import { IonButton, IonCol, IonGrid, IonIcon, IonRow } from "@ionic/react";
import { arrowUndo, trashOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import {
  COLUMN_LIMIT,
  generateRandomNumber,
  PRIMES,
  PRIME_BONUS,
  PRIME_MALUS,
} from "../utils/numberUtils";
import Blackboard from "./Blackboard";
import "./MainArea.css";
import { TappableTuples } from "./parts/TappableTuples";
import { RectangleArea } from "./RectangleArea";
import Scoreboard from "./Scoreboard";

interface MainAreaProps {
  trainingMode: boolean;
  initialTimer: number;
  onGameFinished: (n: number) => void;
}

export function MainArea(props: MainAreaProps) {
  const { trainingMode, initialTimer, onGameFinished } = props;

  const [summands, setSummands] = useState<number[]>([]);
  const [num, setNum] = useState(0);
  const [diamonds, setDiamonds] = useState(0);
  const [delta, setDelta] = useState<number | undefined>();
  const [comment, setComment] = useState<string>("");
  const [timer, setTimer] = useState(0);
  const [intervalRef, setIntervalRef] = useState<any>(null);

  useEffect(() => {
    if (initialTimer !== 0) {
      newNum();
      setTimer(initialTimer);
      const ref = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
      setIntervalRef(ref);
    }
  }, [initialTimer]);

  useEffect(() => {
    if (!!intervalRef && timer === 0) {
      clearInterval(intervalRef);
      setSummands([]);
      onGameFinished(diamonds);
    }
  }, [intervalRef, timer]);

  useEffect(() => {
    if (trainingMode) {
      newNum();

      if (!!intervalRef) {
        clearInterval(intervalRef);
        setTimer(0);
      }
    }
  }, [trainingMode]);

  const add = (n: number) => {
    if (summands.length < COLUMN_LIMIT) {
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
    setSummands((oldVal: number[]) =>
      oldVal.length > 0 ? oldVal.slice(0, oldVal.length - 1) : []
    );
  };

  const check = () => {
    const sum = summands.reduce((a, b) => a + b, 0);
    if (sum === num) {
      addDelta(summands[0], "Correct!");
    } else {
      addDelta(-5, "Wrong!");
    }
    newNum();
  };

  const checkPrime = () => {
    if (PRIMES.indexOf(num) > -1) {
      addDelta(PRIME_BONUS, "PRIME!");
    } else {
      addDelta(PRIME_MALUS, "Nope");
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
    addDelta(-1);
    newNum();
  };

  const controlsDisabled = timer === 0 && !trainingMode;

  return (
    <>
      <IonGrid className="app">
        <IonRow className="upperRow">
          <IonCol size="4">
            <Blackboard num={num} summands={summands} />
          </IonCol>
          <IonCol size="8">
            <RectangleArea summands={summands} />
          </IonCol>
        </IonRow>

        <IonRow className="lowerRow">
          <IonCol size="4">
            <Scoreboard diamonds={diamonds} delta={delta} comment={comment} />
            {timer > 0 && <span>Timer: {timer}</span>}
          </IonCol>
          <IonCol size="8">
            <TappableTuples
              add={add}
              selectedValue={summands.length > 0 ? summands[0] : null}
              disabled={controlsDisabled}
            />

            {!controlsDisabled && (
              <div className="ion-text-center">
                <IonButton
                  size="large"
                  disabled={summands.length < 2}
                  color="success"
                  onClick={() => check()}
                >
                  Check
                </IonButton>
                <IonButton onClick={() => skip()}>Skip</IonButton>
                <IonButton onClick={() => retry()}>
                  <IonIcon icon={trashOutline} />
                </IonButton>
                <IonButton onClick={() => backspace()}>
                  <IonIcon icon={arrowUndo} />
                </IonButton>
                <IonButton color="warning" onClick={() => checkPrime()}>
                  That's a prime
                </IonButton>
              </div>
            )}
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
}
