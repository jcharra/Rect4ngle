import { createContext, createRef } from "react";
import { getSum } from "../../utils/numberUtils";
import Column from "./Column";
import "./ScalableRectangleArea.css";

export enum RectStatus {
  INCOMPLETE = "INCOMPLETE",
  VALID = "VALID",
  TOO_HIGH = "TOO_HIGH",
}

export const RectStatusContext = createContext<RectStatus>(RectStatus.INCOMPLETE);

export default function ScalableRectangleArea({ num, summands }: { num: number; summands: number[] }) {
  const ref = createRef<HTMLDivElement>();

  const status =
    getSum(summands) > num ? RectStatus.TOO_HIGH : summands.length < 2 ? RectStatus.INCOMPLETE : RectStatus.VALID;

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
    </div>
  );
}
