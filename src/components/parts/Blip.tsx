import { useContext } from "react";
import { RectStatusContext } from "./ScalableRectangleArea";
import "./Blip.css";

const colorForStatus = {
  INCOMPLETE: "gray",
  VALID: "green",
  TOO_HIGH: "orange",
  EMPTY: "",
  CORRECT: "green", // don't give a color clue here ... :)
};

export default function Blip({
  filled,
  content,
  isBottomEnd,
  isRightEnd,
}: {
  filled: boolean;
  content?: number;
  isBottomEnd: boolean;
  isRightEnd: boolean;
}) {
  const rectStatus = useContext(RectStatusContext);
  return (
    <div
      style={{
        borderWidth: `1px ${isRightEnd ? "1px" : 0} ${isBottomEnd ? "1px" : 0} 1px`,
        borderColor: "white",
        borderStyle: "solid",
      }}
      className={`blip ${filled ? colorForStatus[rectStatus] : "transparent"}`}
    >
      <div style={{ color: "white", display: "flex", justifyContent: "center", alignContent: "center" }}>{content}</div>
    </div>
  );
}
