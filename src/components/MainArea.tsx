import {
  CreateAnimation,
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
} from "@ionic/react";
import { arrowUndo, diamondOutline, trashOutline } from "ionicons/icons";
import React, { useState } from "react";
import "./MainArea.css";

const isPrime = (n: number) => {
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
};

const PRIMES = Array.from(Array(100))
  .map((_, idx) => idx)
  .filter((i) => i > 10 && isPrime(i));

const PRIME_BONUS = 20;
const PRIME_MALUS = -10;

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
    <div className="block" onClick={() => onClick()}>
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
}: {
  n: number;
  offset: number;
  colorClass: string;
}) {
  const dots = Array.from(Array(n)).map((_, idx) => (
    <Dot colorClass={colorClass} key={idx} />
  ));
  return (
    <div>
      {dots}
      <div className="tupelCaption">{offset + n}</div>
    </div>
  );
}

function CalculationMainArea({ summands }: { summands: number[] }) {
  let tupels: JSX.Element[] = [];
  let sum = 0;
  summands.forEach((n, idx) => {
    tupels.push(
      <VisualTupel key={idx} n={n} offset={sum} colorClass="activeDot" />
    );
    sum += n;
  });

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
}: {
  add: Function;
  selectedValue: number | null;
}) {
  const tappables = [2, 3, 4, 5, 6, 7, 8, 9].map((n) => {
    const disabled = !!selectedValue && n !== selectedValue;
    return (
      <Tappable
        value={n}
        onClick={() => !disabled && add(n)}
        disabled={disabled}
      />
    );
  });

  return <div className="headerTuples">{tappables}</div>;
}

export function MainArea() {
  const [summands, setSummands] = useState<number[]>([]);
  const [num, setNum] = useState(0);
  const [diamonds, setDiamonds] = useState(0);
  const [delta, setDelta] = useState<number | undefined>();
  const [comment, setComment] = useState<string>("");

  const add = (n: number) => {
    setSummands((oldVal: number[]) => {
      return [...oldVal, n];
    });
  };

  function getRandomInt(max: number) {
    return Math.ceil(Math.random() * (max - 1)) + 1;
  }

  function generateRandomNumber() {
    if (Math.random() > 0.1) {
      const [fac1, fac2] = [getRandomInt(9), getRandomInt(10)];
      return fac1 * fac2;
    } else {
      const idx = Math.floor(Math.random() * PRIMES.length);
      return PRIMES[idx];
    }
  }

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

  return (
    <>
      <IonGrid>
        <IonRow>
          <IonCol size="3">
            <CurrentCalculation num={num} />
          </IonCol>
          <IonCol size="9">
            <TappableTuples
              add={add}
              selectedValue={summands.length > 0 ? summands[0] : null}
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="3">
            <Score diamonds={diamonds} delta={delta} comment={comment} />
          </IonCol>
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
            <IonButton color="danger" onClick={() => checkPrime()}>
              That's a prime
            </IonButton>

            <CalculationMainArea summands={summands} />
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
}
