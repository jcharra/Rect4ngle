import { useContext } from "react";
import { RectStatusContext } from "./ScalableRectangleArea";
import "./Blip.css";

const colorForStatus = {
  INCOMPLETE: "gray",
  VALID: "green",
  TOO_HIGH: "orange",
};

export default function Blip({
  size,
  filled,
  content,
  isBottomEnd,
  isRightEnd,
}: {
  size: number;
  filled: boolean;
  content?: number;
  isBottomEnd: boolean;
  isRightEnd: boolean;
}) {
  const rectStatus = useContext(RectStatusContext);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderWidth: `1px ${isRightEnd ? "1px" : 0} ${isBottomEnd ? "1px" : 0} 1px`,
        borderColor: "white",
        borderStyle: "solid",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size / 2,
      }}
      className={filled ? colorForStatus[rectStatus] : "transparent"}
    >
      <div style={{ color: "white", display: "flex", justifyContent: "center", alignContent: "center" }}>{content}</div>
    </div>
  );
}
