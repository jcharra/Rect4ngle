import { createContext, createRef, useEffect, useRef, useState } from "react";
import { getSum } from "../../utils/numberUtils";
import Column from "./Column";
import "./ScalableRectangleArea.css";
import { IonContent, IonPopover } from "@ionic/react";
import { GameType } from "../../types/GameType";
import { Trans, useTranslation } from "react-i18next";

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
  const [popoverI18nKey, setPopoverI18nKey] = useState("");
  const { t } = useTranslation();

  const status = getRectStatus(summands, num);

  useEffect(() => {
    if (gameType !== GameType.TUTORIAL || !num || summands.length > 0) {
      return;
    }

    setPopoverI18nKey("tutorial_num_" + num);

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
      <IonPopover ref={popover} isOpen={!!popoverI18nKey} onDidDismiss={() => setPopoverI18nKey("")}>
        <IonContent class="ion-padding">
          <Trans i18nKey={popoverI18nKey} t={t} components={{ br: <br />, b: <b /> }}></Trans>
        </IonContent>
      </IonPopover>
    </div>
  );
}
