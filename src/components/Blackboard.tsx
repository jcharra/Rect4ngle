import React from "react";
import "./Blackboard.css";

export default function Blackboard({ num, summands }: { num: number; summands: number[] }) {
  return (
    <div className="currentCalculation">
      {num}
      <br />
      <span className={`calculationFactored ${summands.length === 0 ? "invisible" : ""}`}>
        {!!summands.length ? `= ${summands.length} x ${summands[0]}` : "x"}
      </span>
    </div>
  );
}
