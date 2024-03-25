import { createContext, createRef, useEffect, useRef, useState } from "react";
import { getSum } from "../../utils/numberUtils";
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

const getRectStatus = (summands: number[], target: number): RectStatus => {
  const currentSum = getSum(summands);
  if (currentSum > target) {
    return RectStatus.TOO_HIGH;
  } else if (summands.length === 0) {
    return RectStatus.EMPTY;
  } else if (summands.length === 1) {
    return RectStatus.INCOMPLETE;
  } else if (currentSum === target) {
    return RectStatus.CORRECT;
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
    if (gameType !== GameType.TUTORIAL || !num || summands.length > 0) {
      return;
    }

    const hintKey = "tutorial_num_" + num;
    const text = t(hintKey);

    setPopoverText(text);

    /* eslint-disable-next-line */
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
