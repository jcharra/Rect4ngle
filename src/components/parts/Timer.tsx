import { CreateAnimation } from "@ionic/react";
import { infinite } from "ionicons/icons";
import React from "react";
import "./Timer.css";

export default function Timer({ seconds }: { seconds: number }) {
  if (seconds < 0) {
    return null;
  }

  const secondsModded = seconds % 60;
  const secondsPadded =
    secondsModded < 10 ? "0" + secondsModded : secondsModded;
  return !!seconds ? (
    <div className={"timer"}>
      {Math.floor(seconds / 60)}:{secondsPadded}
    </div>
  ) : null;
}
