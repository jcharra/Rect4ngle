import React from "react";

export default function Timer({ seconds }: { seconds: number }) {
  return (
    <>
      {Math.floor(seconds / 60)}:{seconds % 60}
    </>
  );
}
