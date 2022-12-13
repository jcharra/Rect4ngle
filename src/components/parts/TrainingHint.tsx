import { useHint } from "../../hooks/hintHook";
import "./TrainingHint.css";

export default function TrainingHint() {
  const { hint } = useHint();

  return hint ? <div className="hint">{hint}</div> : null;
}
