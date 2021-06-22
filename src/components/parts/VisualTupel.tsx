import { Dot } from "./Dot";

export default function VisualTupel({
  n,
  offset,
  colorClass,
  fillTo,
}: {
  n: number;
  offset?: number;
  colorClass: string;
  fillTo?: number;
}) {
  const dots = Array.from(Array(n))
    .map((_, idx) => <Dot colorClass={colorClass} key={idx} />)
    .concat(
      fillTo && fillTo > n
        ? Array.from(Array(9 - n)).map((_, idx) => (
            <Dot colorClass="outlinedDot" key={"out" + idx} />
          ))
        : []
    );
  return (
    <div>
      {dots}
      {(!!offset || offset === 0) && (
        <div className="tupelCaption">{offset + n}</div>
      )}
    </div>
  );
}
