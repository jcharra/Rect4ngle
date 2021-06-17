import {
  CreateAnimation,
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
} from "@ionic/react";
import { arrowUndo, diamondOutline, trashOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import {
  COLUMN_LIMIT,
  generateRandomNumber,
  PRIMES,
  PRIME_BONUS,
  PRIME_MALUS,
} from "../utils/numberUtils";
import "./MainArea.css";

function Tappable({
  value,
  onClick,
  disabled,
}: {
  value: number;
  onClick: Function;
  disabled: boolean;
}) {
  return (
    <div className="block" onClick={() => !disabled && onClick()}>
      <VisualTupel
        colorClass={disabled ? "disabledDot" : "activeDot"}
        n={value}
        offset={0}
      />
    </div>
  );
}

function CurrentCalculation({ num }: { num: number }) {
  return <div className="currentCalculation">{num}</div>;
}

function Dot({ colorClass }: { colorClass: string }) {
  return <div className={`dot ${colorClass}`}></div>;
}

function VisualTupel({
  n,
  offset,
  colorClass,
  fillTo,
}: {
  n: number;
  offset?: number;
  colorClass: string;
  fillTo?: number;
}) {
  const dots = Array.from(Array(n))
    .map((_, idx) => <Dot colorClass={colorClass} key={idx} />)
    .concat(
      fillTo && fillTo > n
        ? Array.from(Array(9 - n)).map((_, idx) => (
            <Dot colorClass="outlinedDot" key={idx} />
          ))
        : []
    );
  return (
    <div>
      {dots}
      {(!!offset || offset === 0) && (
        <div className="tupelCaption">{offset + n}</div>
      )}
    </div>
  );
}

function CalculationMainArea({ summands }: { summands: number[] }) {
  let tupels: JSX.Element[] = [];
  let sum = 0;
  summands.forEach((n, idx) => {
    tupels.push(
      <VisualTupel
        key={idx}
        n={n}
        offset={sum}
        fillTo={9}
        colorClass="activeDot"
      />
    );
    sum += n;
  });

  for (let i = COLUMN_LIMIT; i > summands.length; i--) {
    tupels.push(
      <VisualTupel
        key={"empty" + i}
        n={0}
        fillTo={9}
        colorClass="outlinedDot"
      />
    );
  }

  return (
    <div className="mainArea">
      <div className="mainAreaGeoPanel">{tupels}</div>
    </div>
  );
}

function Score({
  diamonds,
  delta,
  comment,
}: {
  diamonds: number;
  delta: number | undefined;
  comment: string;
}) {
  return (
    <>
      <div className="score">
        <IonIcon size="4x" icon={diamondOutline}></IonIcon> &nbsp;{diamonds}
      </div>
      <div className="delta">
        {delta && (
          <CreateAnimation
            duration={1000}
            iterations={1}
            fromTo={[
              {
                property: "transform",
                fromValue: "translateY(0px)",
                toValue: `translateY(${delta > 0 ? -100 : 100}px)`,
              },
              { property: "opacity", fromValue: "1", toValue: "0" },
            ]}
            play={true}
          >
            <div className={`${delta > 0 ? "bonus" : "malus"}`}>
              {!!delta && delta > 0 ? "+" : ""}
              {delta}
            </div>
          </CreateAnimation>
        )}
      </div>
      <div className="comment">
        {!!comment && (
          <CreateAnimation
            duration={1000}
            iterations={1}
            fromTo={[{ property: "opacity", fromValue: "1", toValue: "0" }]}
            play={true}
          >
            <div className={`${comment ? "good" : "bad"}`}>{comment}</div>
          </CreateAnimation>
        )}
      </div>
    </>
  );
}

function TappableTuples({
  add,
  selectedValue,
  disabled,
}: {
  add: Function;
  selectedValue: number | null;
  disabled: boolean;
}) {
  const tappables = [2, 3, 4, 5, 6, 7, 8, 9].map((n) => {
    const isDisabled = disabled || (!!selectedValue && n !== selectedValue);
    return <Tappable value={n} onClick={() => add(n)} disabled={isDisabled} />;
  });

  return <div className="headerTuples">{tappables}</div>;
}

function CalculationProductDisplay({ summands }: { summands: number[] }) {
  return (
    <div className="productDisplay">
      <div className="productDi">
        {summands.length || "?"} x {summands[0] || "?"}
      </div>
    </div>
  );
}
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
          <IonCol size="3">
            <CurrentCalculation num={num} />
          </IonCol>
          <IonCol size="6">
            <CalculationMainArea summands={summands} />
          </IonCol>
          <IonCol size="3">
            <CalculationProductDisplay summands={summands} />
          </IonCol>
        </IonRow>

        <IonRow className="lowerRow">
          <IonCol size="3">
            <Score diamonds={diamonds} delta={delta} comment={comment} />
            {timer > 0 && <span>Timer: {timer}</span>}
          </IonCol>
          <IonCol size="9">
            <TappableTuples
              add={add}
              selectedValue={summands.length > 0 ? summands[0] : null}
              disabled={controlsDisabled}
            />

            {!controlsDisabled && (
              <IonCol size="9" className="ion-text-center">
                <IonButton
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
              </IonCol>
            )}
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
}
