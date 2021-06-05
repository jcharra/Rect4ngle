import { IonCol, IonGrid, IonRow } from "@ionic/react";
import React, { useState } from "react";
import "./MainArea.css";

function Tappable({ value, onClick }: { value: number; onClick: Function }) {
  return (
    <div className="block" onClick={() => onClick()}>
      <VisualTupel n={value} offset={0} />
    </div>
  );
}

function CurrentCalculation() {
  return <div className="currentCalculation">5 x 7</div>;
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

  const add = (n: number) => {
    setSummands((oldVal: number[]) => {
      return [...oldVal, n];
    });
  };

  return (
    <>
      <IonGrid>
        <IonRow>
          <IonCol>
            <CurrentCalculation />
          </IonCol>
          <IonCol>
            <TappableTuples add={add} />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <div>Type here</div>
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
