import VisualTupel from "./VisualTupel";

export default function Tappable({
  value,
  onClick,
  disabled,
}: {
  value: number;
  onClick: Function;
  disabled: boolean;
}) {
  return (
    <div className="block" onClick={() => !disabled && onClick()}>
      <VisualTupel
        colorClass={disabled ? "disabledDot" : "activeDot"}
        n={value}
        offset={0}
      />
    </div>
  );
}
