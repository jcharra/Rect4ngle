import React from "react";
import { COLUMN_LIMIT } from "../utils/numberUtils";
import VisualTupel from "./parts/VisualTupel";

export function RectangleArea({ summands }: { summands: number[] }) {
  let tupels: JSX.Element[] = [];
  let sum = 0;
  summands.forEach((n, idx) => {
    tupels.push(
      <VisualTupel
        key={idx + "-" + n}
        n={n}
        offset={sum}
        fillTo={9}
        colorClass="activeDot"
      />
    );
    sum += n;
  });

  for (let i = COLUMN_LIMIT; i > summands.length; i--) {
    tupels.push(
      <VisualTupel
        key={"empty" + i}
        n={0}
        fillTo={9}
        colorClass="outlinedDot"
      />
    );
  }

  return (
    <div className="mainArea">
      <div className="mainAreaGeoPanel">{tupels}</div>
    </div>
  );
}
