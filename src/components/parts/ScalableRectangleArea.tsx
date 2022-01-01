import { useEffect, useRef, useState } from "react";
import Column from "./Column";
import "./ScalableRectangleArea.css";

export default function ScalableRectangleArea({ summands }: { summands: number[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [gridSize, setGridSize] = useState(0);
  const [innerHeight, setInnerHeight] = useState(0);
  const [numberOfCols, setNumberOfCols] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const width = ref.current.offsetWidth;
      const height = ref.current.offsetHeight;

      if (!width || !height) {
        return;
      }

      setInnerHeight(height);

      const widthBy25 = width / 25.0;
      const heightBy11 = height / 11.0;

      const gridSize = Math.min(widthBy25, heightBy11);
      setGridSize(gridSize);
      setNumberOfCols(Math.ceil(width / gridSize));
      //console.log("Grid size", gridSize, "num cols", Math.ceil(width / gridSize));
    }
  }, [ref.current]);

  return (
    <div className="tupleContainer" ref={ref}>
      <div className="fixedHeightContainer" style={{ height: innerHeight }}>
        {numberOfCols > 0
          ? Array.from(Array(numberOfCols), (_, i) => i).map((idx) => (
              <div style={{ display: "inline-block" }}>
                <Column key={idx} gridSize={gridSize} numBoxes={Math.ceil(innerHeight / gridSize)} />
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
