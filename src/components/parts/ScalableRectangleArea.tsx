import React, { createRef, useEffect, useRef, useState } from "react";
import Column from "./Column";
import "./ScalableRectangleArea.css";

const useRefDimensions = (ref: React.RefObject<HTMLDivElement>) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  useEffect(() => {
    if (ref.current) {
      const { current } = ref;
      const boundingRect = current.getBoundingClientRect();
      const { width, height } = boundingRect;
      const [widthRounded, heightRounded] = [Math.round(width), Math.round(height)];
      if (!width || !height || widthRounded !== dimensions.width || heightRounded !== dimensions.height) {
        setDimensions({ width: widthRounded, height: heightRounded });
      }
    }
  }, [ref]);
  return dimensions;
};

export default function ScalableRectangleArea({ summands }: { summands: number[] }) {
  const ref = createRef<HTMLDivElement>();
  const dimensions = useRefDimensions(ref);

  const { width, height } = dimensions;

  const widthBy25 = width / 25.0;
  const heightBy11 = height / 11.0;

  const gridSize = Math.min(widthBy25, heightBy11);
  const numberOfCols = Math.ceil(width / gridSize);

  return (
    <div className="tupleContainer" ref={ref}>
      <div className="fixedHeightContainer" style={{ height }}>
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
      </div>
    </div>
  );
}
