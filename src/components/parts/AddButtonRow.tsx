import { IonButton } from "@ionic/react";
import "./AddButtonRow.css";

interface AddButtonRowProps {
  add: (n: number) => void;
  selectedValue?: number;
  disabled: boolean;
  getBonus: (n: number) => number;
}

export default function AddButtonRow(props: AddButtonRowProps) {
  const { add, selectedValue, disabled, getBonus } = props;

  return (
    <>
      <div className="buttonContainer">
        {Array.from(Array(4), (_, i) => i + 2).map((num) => (
          <IonButton
            className="addButton"
            key={num}
            onClick={() => add(num)}
            disabled={disabled || (!!selectedValue && num !== selectedValue)}
          >
            <span className={getBonus(num) > 1 ? "bonused" : ""}>+{num}</span>
            {getBonus(num) > 1 && <span className="bonus">x{getBonus(num)}</span>}
          </IonButton>
        ))}
      </div>
      <div className="buttonContainer">
        {Array.from(Array(4), (_, i) => i + 6).map((num) => (
          <IonButton
            className="addButton"
            key={num}
            onClick={() => add(num)}
            disabled={disabled || (!!selectedValue && num !== selectedValue)}
          >
            <span className={getBonus(num) > 1 ? "bonused" : ""}>+{num}</span>
            {getBonus(num) > 1 && <span className="bonus">x{getBonus(num)}</span>}
          </IonButton>
        ))}
      </div>
    </>
  );
}
