import {
  IonInput,
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

  const players = ["Peter", "Hans", ""];

  const savePlayerName = (idx: number, s: string) => {
    console.log("Saving player", idx, "as", s);
  };

  return (
    <IonList lines="full">
      <IonItem>
        <IonLabel class="ion-text-center">
          <strong>Einstellungen</strong>
        </IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel slot="start">Aktiver Spieler</IonLabel>
        <IonSelect slot="end" interface="popover" value={players[0]}>
          {players.map((p) => {
            return !!p ? (
              <IonSelectOption value={p}>{p}</IonSelectOption>
            ) : null;
          })}
        </IonSelect>
      </IonItem>
      {[0, 1, 2, 3, 4].map((i) => {
        return (
          <IonItem>
            <IonLabel>Spieler {i + 1}</IonLabel>
            <IonInput
              slot="end"
              type="text"
              value={players[i]}
              placeholder="Name eingeben"
              onBlur={(e) => savePlayerName(i, e.target.value as string)}
            ></IonInput>
          </IonItem>
        );
      })}
      <IonItem>
        <IonLabel slot="start">Sprache</IonLabel>
        <IonSelect slot="end" interface="popover" value="deutsch">
          <IonSelectOption value="deutsch">deutsch</IonSelectOption>
          <IonSelectOption value="englisch">englisch</IonSelectOption>
        </IonSelect>
      </IonItem>
    </IonList>
  );
}
