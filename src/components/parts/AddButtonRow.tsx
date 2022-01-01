import { IonButton } from "@ionic/react";
import "./AddButtonRow.css";

interface AddButtonRowProps {
  add: (n: number) => void;
  selectedValue?: number;
  disabled: boolean;
}

export default function AddButtonRow(props: AddButtonRowProps) {
  const { add, selectedValue, disabled } = props;

  return (
    <div className="buttonContainer">
      {Array.from(Array(8), (_, i) => i + 2).map((num) => (
        <IonButton
          className="addButton"
          key={num}
          onClick={() => add(num)}
          disabled={disabled || (!!selectedValue && num !== selectedValue)}
        >
          +{num}
        </IonButton>
      ))}
    </div>
  );
}
