import { IonButton, IonIcon } from "@ionic/react";
import { backspaceOutline, trashOutline } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import "./ControlArea.css";
import AddButtonRow from "./parts/AddButtonRow";

interface ControlAreaProps {
  functions: {
    add: (n: number) => void;
    check: () => void;
    skip: () => void;
    backspace: () => void;
    checkPrime: () => void;
    retry: () => void;
  };
  summands: number[];
  disabled: boolean;
}

export default function ControlArea(props: ControlAreaProps) {
  const { functions, summands, disabled: controlsDisabled } = props;
  const { add, check, skip, backspace, checkPrime, retry } = functions;
  const { t } = useTranslation();

  return (
    <div className="controlContainer">
      <AddButtonRow
        add={add}
        selectedValue={summands.length > 0 ? summands[0] : undefined}
        disabled={controlsDisabled}
      />

      {!controlsDisabled && (
        <div className="actionsContainer">
          <IonButton size="large" disabled={summands.length < 2} color="success" onClick={() => check()}>
            {t("check")}
          </IonButton>
          <IonButton onClick={() => skip()}>{t("skip")}</IonButton>
          <IonButton onClick={() => backspace()}>
            <IonIcon icon={backspaceOutline} />
          </IonButton>
          <IonButton onClick={() => retry()}>
            <IonIcon icon={trashOutline} />
          </IonButton>
          <IonButton color="warning" onClick={() => checkPrime()} size="large">
            {t("prime")}
          </IonButton>
        </div>
      )}
    </div>
  );
}
