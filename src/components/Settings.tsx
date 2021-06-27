import {
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  IonToggle,
} from "@ionic/react";
import { useState } from "react";

export default function Settings() {
  const [checked, setChecked] = useState(true);

  return (
    <IonList lines="full">
      <IonItem>
        <IonLabel class="ion-text-center">
          <strong>Einstellungen</strong>
        </IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel slot="start">Spieler</IonLabel>
        <IonSelect slot="end" interface="popover" value="immi">
          <IonSelectOption value="immi">Immi</IonSelectOption>
          <IonSelectOption value="judith">Judith</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonLabel slot="start">Sprache</IonLabel>
        <IonSelect slot="end" interface="popover" value="deutsch">
          <IonSelectOption value="deutsch">deutsch</IonSelectOption>
          <IonSelectOption value="englisch">englisch</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonLabel slot="start">Ton</IonLabel>
        <IonToggle
          slot="end"
          checked={checked}
          onClick={() => setChecked(!checked)}
        />
      </IonItem>
    </IonList>
  );
}
