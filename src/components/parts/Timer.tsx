import { CreateAnimation } from "@ionic/react";
import { infinite } from "ionicons/icons";
import React from "react";
import "./Timer.css";

export default function Timer({ seconds }: { seconds: number }) {
  const secondsModded = seconds % 60;
  const secondsPadded =
    secondsModded < 10 ? "0" + secondsModded : secondsModded;
  return !!seconds ? (
    <CreateAnimation
      duration={1000}
      iterations={1000}
      fromTo={[{ property: "color", fromValue: "#f00", toValue: "#800" }]}
      play={true}
    >
      <div className={"timer"}>
        {Math.floor(seconds / 60)}:{secondsPadded}
      </div>
    </CreateAnimation>
  ) : null;
}
