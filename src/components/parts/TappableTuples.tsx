import Tappable from "./Tappable";

export function TappableTuples({
  add,
  selectedValue,
  disabled,
}: {
  add: Function;
  selectedValue: number | null;
  disabled: boolean;
}) {
  const tappables = [2, 3, 4, 5, 6, 7, 8, 9].map((n) => {
    const isDisabled = disabled || (!!selectedValue && n !== selectedValue);
    return <Tappable value={n} onClick={() => add(n)} disabled={isDisabled} />;
  });

  return <div className="headerTuples">{tappables}</div>;
}
