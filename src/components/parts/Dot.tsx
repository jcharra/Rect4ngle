import "./Dot.css";

export function Dot({ colorClass }: { colorClass: string }) {
  return <div className={`dot ${colorClass}`}></div>;
}
