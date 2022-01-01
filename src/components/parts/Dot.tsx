import "./Dot.css";

export function Dot({ colorClass }: { colorClass: string }) {
  return <span className={`dot ${colorClass}`}></span>;
}
