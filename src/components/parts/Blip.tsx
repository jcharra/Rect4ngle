import { useContext } from "react";
import { RectStatusContext } from "./ScalableRectangleArea";

const colorForStatus = {
  INCOMPLETE: "gray",
  VALID: "green",
  TOO_HIGH: "orange",
};

export default function Blip({ size, filled, content }: { size: number; filled: boolean; content?: number }) {
  const rectStatus = useContext(RectStatusContext);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderWidth: "1px 0 0 1px",
        borderColor: "white",
        borderStyle: "solid",
        display: "inline-block",
        background: filled ? colorForStatus[rectStatus] : "transparent",
        fontSize: size - 6,
      }}
    >
      <div style={{ color: "white", display: "flex", justifyContent: "center", alignContent: "center" }}>{content}</div>
    </div>
  );
}
