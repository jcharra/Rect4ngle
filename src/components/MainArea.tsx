import { IonButton, IonCol, IonGrid, IonIcon, IonRow } from "@ionic/react";
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

function Tappable({ value, onClick }: { value: number; onClick: Function }) {
  return (
    <div className="block" onClick={() => onClick()}>
      <VisualTupel n={value} offset={0} />
    </div>
  );
}

function CurrentCalculation({ num }: { num: number }) {
  return <div className="currentCalculation">{num}</div>;
}

function Dot() {
  return <div className="dot"></div>;
}

function VisualTupel({ n, offset }: { n: number; offset: number }) {
  const dots = Array.from(Array(n)).map((_, idx) => <Dot key={idx} />);
  return (
    <div className="verticalTupel">
      {dots}
      <div className="tupelCaption">{offset + n}</div>
    </div>
  );
}

function CalculationMainArea({ summands }: { summands: number[] }) {
  let tupels: JSX.Element[] = [];
  let sum = 0;
  summands.forEach((n, idx) => {
    tupels.push(<VisualTupel key={idx} n={n} offset={sum} />);
    sum += n;
  });

  return (
    <div className="mainArea">
      <div className="mainAreaGeoPanel">{tupels}</div>
    </div>
  );
}

function CalculationFeedback({ diamonds }: { diamonds: number }) {
  return (
    <div className="feedback">
      <IonIcon size="4x" icon={diamondOutline}></IonIcon> &nbsp;{diamonds}
    </div>
  );
}

function TappableTuples({ add }: { add: Function }) {
  const tappables = [2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
    <Tappable value={n} onClick={() => add(n)} />
  ));

  return <div className="headerTuples">{tappables}</div>;
}

export function MainArea() {
  const [summands, setSummands] = useState<number[]>([]);
  const [num, setNum] = useState(0);
  const [diamonds, setDiamonds] = useState(0);

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
      const [fac1, fac2] = [getRandomInt(10), getRandomInt(10)];
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
      bonus(1);
    } else {
      malus(5);
    }
    newNum();
  };

  const checkPrime = () => {
    if (PRIMES.indexOf(num) > -1) {
      bonus(20);
    } else {
      malus(10);
    }
    newNum();
  };

  const bonus = (n: number) => {
    setDiamonds((oldVal) => oldVal + n);
  };
  const malus = (n: number) => {
    setDiamonds((oldVal) => Math.max(0, oldVal - n));
  };

  const skip = () => {
    malus(1);
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
            <TappableTuples add={add} />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="3">
            <CalculationFeedback diamonds={diamonds} />
          </IonCol>
          <IonCol size="9" className="ion-text-center">
            <IonButton color="success" onClick={() => check()}>
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
