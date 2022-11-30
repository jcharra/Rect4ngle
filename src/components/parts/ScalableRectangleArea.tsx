import React, { createContext, createRef, useEffect, useState } from "react";
import { getSum } from "../../utils/numberUtils";
import Column from "./Column";
import "./ScalableRectangleArea.css";

export enum RectStatus {
  INCOMPLETE = "INCOMPLETE",
  VALID = "VALID",
  TOO_HIGH = "TOO_HIGH",
}

const useRefDimensions = (ref: React.RefObject<HTMLDivElement>) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  useEffect(() => {
    if (ref.current) {
      const { current } = ref;
      const boundingRect = current.getBoundingClientRect();
      const { width, height } = boundingRect;
      const [widthRounded, heightRounded] = [Math.round(width), Math.round(height)];
      if (width && height && (widthRounded !== dimensions.width || heightRounded !== dimensions.height)) {
        setDimensions({ width: widthRounded, height: heightRounded });
      }
    }
  }, [ref, dimensions.height, dimensions.width]);
  return dimensions;
};

export const RectStatusContext = createContext<RectStatus>(RectStatus.INCOMPLETE);

export default function ScalableRectangleArea({ num, summands }: { num: number; summands: number[] }) {
  const ref = createRef<HTMLDivElement>();
  const dimensions = useRefDimensions(ref);

  const { width, height } = dimensions;

  const widthBy12 = width / 12.0;
  const heightBy9 = height / 9.0;

  const gridSize = Math.min(widthBy12, heightBy9);

  const status =
    getSum(summands) > num ? RectStatus.TOO_HIGH : summands.length < 2 ? RectStatus.INCOMPLETE : RectStatus.VALID;

  return (
    <div className="tupleContainer" ref={ref}>
      <div className="fixedHeightContainer">
        <RectStatusContext.Provider value={status}>
          {Array.from(Array(12), (_, i) => i).map((idx) => (
            <div key={idx} style={{ display: "inline-block" }}>
              <Column
                gridSize={gridSize}
                numBoxes={9}
                value={summands[idx]}
                columnIdx={idx}
                isLast={idx === summands.length - 1}
              />
            </div>
          ))}
        </RectStatusContext.Provider>
      </div>
    </div>
  );
}
