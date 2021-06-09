import { IonButton, IonCol, IonGrid, IonRow } from "@ionic/react";
import React, { useState } from "react";
import "./MainArea.css";

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
      <div className="mainAreaHeader">Calculate here:</div>
      <div className="mainAreaGeoPanel">{tupels}</div>
    </div>
  );
}

function CalculationFeedback() {
  return <div className="feedback">Well done!</div>;
}

function TappableTuples({ add }: { add: Function }) {
  const tappables = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
    <Tappable value={n} onClick={() => add(n)} />
  ));

  return <div className="headerTuples">{tappables}</div>;
}

export function MainArea() {
  const [summands, setSummands] = useState<number[]>([]);
  const [num, setNum] = useState(0);

  const add = (n: number) => {
    setSummands((oldVal: number[]) => {
      return [...oldVal, n];
    });
  };

  function getRandomInt(max: number) {
    return Math.ceil(Math.random() * (max - 1)) + 1;
  }

  const newNum = () => {
    const [fac1, fac2] = [getRandomInt(10), getRandomInt(10)];
    setNum(fac1 * fac2);
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
      alert("Yes");
    } else {
      alert("NOPE!");
    }
  };

  return (
    <>
      <IonGrid>
        <IonRow>
          <IonCol>
            <CurrentCalculation num={num} />
          </IonCol>
          <IonCol>
            <TappableTuples add={add} />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonButton onClick={() => newNum()}>New</IonButton>
            <IonButton onClick={() => retry()}>Retry</IonButton>
            <IonButton onClick={() => backspace()}>Del</IonButton>
            <IonButton color="success" onClick={() => check()}>
              Check
            </IonButton>
            <CalculationFeedback />
          </IonCol>
          <IonCol>
            <CalculationMainArea summands={summands} />
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
}
