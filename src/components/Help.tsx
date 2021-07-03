import { IonCol, IonGrid, IonRow } from "@ionic/react";
import "./Help.css";

export default function Help() {
  return (
    <IonGrid style={{ width: "100%" }}>
      <IonRow class="helpHeader ion-text-center">
        <IonCol>Rect4ngle rules</IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          In Rect4ngle, your goal is to build rectangles with a given number of
          dots. A rectangle is built from <strong>at least two pieces</strong>{" "}
          of equal length. <br />
          <br />
          On the bottom left you find two icons to start playing. One is for the{" "}
          <strong>training mode</strong>, where there is no time limit and you
          can just practice your rectangle skills. The other one is for a{" "}
          <strong>game against the clock</strong>. Try to gain as many diamonds
          as possible, maybe you'll achieve a new high score!
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <h5>Gaining diamonds</h5>
          If you think that you've built a matching rectangle, you can click on
          the <strong>CHECK</strong> button to check your result. If you got it
          right, you receive as many diamonds as your rectangle is high. If your
          rectangle does not match the number, you lose 5 diamonds.
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          A special case is the <strong>SQUARE</strong>: If your rectangle is as
          high as it is wide, you receive 10 diamonds.
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <h5>Prime numbers</h5>
          Sometimes there's a number that cannot be built as a rectangle. These
          are called <strong>PRIME NUMBERS</strong>. You have to click the
          yellow <strong>PRIME</strong> button to classify them as primes. This
          is very tricky, so finding a prime will give you 20 diamonds. But
          watch out: Calling a number a prime that is actually not a prime will
          lose 10 diamonds.
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          If you're not sure what to do with a number, you can always{" "}
          <strong>SKIP</strong> it. This will cost you 2 diamonds.
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}
