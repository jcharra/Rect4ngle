import { IonButton, IonIcon } from "@ionic/react";
import { arrowForwardCircleOutline, backspaceOutline, checkmarkCircleOutline, trashOutline } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import { useSettings } from "../hooks/settingsHook";
import { GameType } from "../types/GameType";
import "./ControlArea.css";
import AddButtonRow from "./parts/AddButtonRow";
import TrainingHint from "./parts/TrainingHint";

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
  getBonus: (n: number) => number;
  gameType?: GameType;
}

export default function ControlArea(props: ControlAreaProps) {
  const { functions, summands, gameType, getBonus } = props;
  const { add, check, skip, backspace, checkPrime, retry } = functions;
  const { t } = useTranslation();
  const { activePlayerName } = useSettings();

  if (!activePlayerName) {
    return null;
  }

  const controlsDisabled = !gameType;

  return (
    <div className="controlContainer">
      <AddButtonRow
        add={add}
        selectedValue={summands.length > 0 ? summands[0] : undefined}
        disabled={controlsDisabled || summands.length === 12}
        getBonus={getBonus}
      />

      <div className="actionsContainer">
        <IonButton
          size="large"
          disabled={controlsDisabled || summands.length < 2}
          color="success"
          onClick={() => check()}
        >
          <IonIcon icon={checkmarkCircleOutline} />
        </IonButton>
        <IonButton onClick={() => backspace()} disabled={controlsDisabled || summands.length === 0}>
          <IonIcon icon={backspaceOutline} />
        </IonButton>
        <IonButton onClick={() => retry()} disabled={controlsDisabled || summands.length === 0}>
          <IonIcon icon={trashOutline} />
        </IonButton>
        <IonButton onClick={() => skip()} disabled={controlsDisabled} color="warning">
          <IonIcon icon={arrowForwardCircleOutline} />
        </IonButton>
        <IonButton color="success" onClick={() => checkPrime()} size="large" disabled={controlsDisabled}>
          {t("prime")}
        </IonButton>
      </div>

      {(gameType === GameType.TRAINING || gameType === GameType.TUTORIAL) && <TrainingHint />}
    </div>
  );
}
