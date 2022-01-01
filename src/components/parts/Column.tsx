import Blip from "./Blip";
import "./Column.css";

export default function Column({
  gridSize,
  numBoxes,
  value,
  columnIdx,
  isLast,
}: {
  gridSize: number;
  numBoxes: number;
  value: number;
  columnIdx: number;
  isLast: boolean;
}) {
  return (
    <div className="vertical">
      {Array.from(Array(numBoxes), (_, i) => i).map((idx) => (
        <Blip
          key={idx}
          size={gridSize}
          filled={idx !== 0 && value >= idx}
          content={idx === value && isLast ? columnIdx * value : undefined}
          incomplete={isLast && columnIdx === 1}
        />
      ))}
    </div>
  );
}
