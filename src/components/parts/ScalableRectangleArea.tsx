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
  }, [ref]);
  return dimensions;
};

export const RectStatusContext = createContext<RectStatus>(RectStatus.INCOMPLETE);

export default function ScalableRectangleArea({ num, summands }: { num: number; summands: number[] }) {
  const ref = createRef<HTMLDivElement>();
  const dimensions = useRefDimensions(ref);

  const { width, height } = dimensions;

  const widthBy25 = width / 25.0;
  const heightBy11 = height / 11.0;

  const gridSize = Math.min(widthBy25, heightBy11);
  const numberOfCols = Math.ceil(width / gridSize);

  const status =
    getSum(summands) > num ? RectStatus.TOO_HIGH : summands.length < 2 ? RectStatus.INCOMPLETE : RectStatus.VALID;

  return (
    <div className="tupleContainer" ref={ref}>
      <div className="fixedHeightContainer" style={{ height }}>
        <RectStatusContext.Provider value={status}>
          {numberOfCols > 0
            ? Array.from(Array(numberOfCols), (_, i) => i).map((idx) => (
                <div key={idx} style={{ display: "inline-block" }}>
                  <Column
                    gridSize={gridSize}
                    numBoxes={Math.ceil(height / gridSize)}
                    value={summands[idx - 1]}
                    columnIdx={idx}
                    isLast={idx === summands.length}
                  />
                </div>
              ))
            : null}
        </RectStatusContext.Provider>
      </div>
    </div>
  );
}
