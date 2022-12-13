import React from "react";
import "./Blackboard.css";

export default function Blackboard({ num, summands }: { num: number; summands: number[] }) {
  return (
    <div className="currentCalculation">
      {num}
      <br />
      <span className={`calculationFactored ${summands.length === 0 ? "invisible" : ""}`}>
        {!!summands.length ? `= ${summands[0]} x ${summands.length}` : "x"}
      </span>
    </div>
  );
}
