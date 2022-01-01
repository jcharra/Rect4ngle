import Blip from "./Blip";
import "./Column.css";

export default function Column({ gridSize, numBoxes }: { gridSize: number; numBoxes: number }) {
  console.log("Column with size", gridSize, "and boxes", numBoxes);
  return (
    <div className="vertical">
      {Array.from(Array(numBoxes), (_, i) => i).map((idx) => (
        <Blip key={idx} size={gridSize} />
      ))}
    </div>
  );
}
