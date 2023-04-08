import { createContext, createRef, useEffect, useRef, useState } from "react";
import { getSum, isPrime } from "../../utils/numberUtils";
import Column from "./Column";
import "./ScalableRectangleArea.css";
import { IonContent, IonPopover } from "@ionic/react";
import { GameType } from "../../types/GameType";
import { useTranslation } from "react-i18next";

export enum RectStatus {
  INCOMPLETE = "INCOMPLETE",
  VALID = "VALID",
  TOO_HIGH = "TOO_HIGH",
  EMPTY = "EMPTY",
  CORRECT = "CORRECT",
}

export const RectStatusContext = createContext<RectStatus>(RectStatus.EMPTY);

const hintLimits: { [key: string]: number } = {
  hint_no_pieces: 5,
  hint_no_pieces_prime: 3,
  hint_one_piece_not_allowed: 2,
  hint_sum_too_high: 3,
  hint_correct_rect: 3,
};

const getRectStatus = (summands: number[], target: number): RectStatus => {
  const currentSum = getSum(summands);
  if (currentSum > target) {
    return RectStatus.TOO_HIGH;
  } else if (currentSum === target) {
    return RectStatus.CORRECT;
  } else if (summands.length === 0) {
    return RectStatus.EMPTY;
  } else if (summands.length === 1) {
    return RectStatus.INCOMPLETE;
  } else {
    return RectStatus.VALID;
  }
};

export default function ScalableRectangleArea({
  num,
  summands,
  gameType,
}: {
  num: number;
  summands: number[];
  gameType?: GameType;
}) {
  const ref = createRef<HTMLDivElement>();
  const popover = useRef<HTMLIonPopoverElement>(null);
  const [popoverText, setPopoverText] = useState("");
  const { t } = useTranslation();

  const status = getRectStatus(summands, num);

  useEffect(() => {
    if (!num || gameType !== GameType.TRAINING) {
      return;
    }

    let hint = "";
    let hintArgs = {};

    // Case 1: No pieces yet
    if (summands.length === 0) {
      console.log("Empty with num", num);
      if (isPrime(num)) {
        hint = "hint_no_pieces_prime";
      } else {
        hint = "hint_no_pieces";
      }
      hintArgs = { num };
    } else if (status === RectStatus.INCOMPLETE) {
      hint = "hint_one_piece_not_allowed";
    } else if (status === RectStatus.TOO_HIGH) {
      hint = "hint_sum_too_high";
    } else if (status === RectStatus.CORRECT) {
      hint = "hint_correct_rect";
    }

    if (hint && hintLimits[hint] > 0) {
      setPopoverText(t(hint, hintArgs));
      hintLimits[hint]--;
    }
  }, [num, gameType, status]);

  return (
    <div className="tupleContainer" ref={ref}>
      <div className="fixedHeightContainer">
        <RectStatusContext.Provider value={status}>
          {Array.from(Array(12), (_, i) => i).map((idx) => (
            <div key={idx}>
              <Column numBoxes={9} value={summands[idx]} columnIdx={idx} isLast={idx === summands.length - 1} />
            </div>
          ))}
        </RectStatusContext.Provider>
      </div>
      <IonPopover ref={popover} isOpen={!!popoverText} onDidDismiss={() => setPopoverText("")}>
        <IonContent class="ion-padding">{popoverText}</IonContent>
      </IonPopover>
    </div>
  );
}
