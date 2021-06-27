import {
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { useAsync } from "react-async-hook";
import { getPlayerConfig, savePlayer } from "../service/playerService";

const savePlayerName = async (idx: number, s: string) => {
  // TODO: prevent idx 0 from being emptied
  savePlayer(idx, s);
};

export default function Settings() {
  const { loading, error, result: config } = useAsync(getPlayerConfig, []);

  if (loading || error || !config) {
    console.log("Loading:", loading, "error", error, "config", config);
    return null;
  }

  return (
    <IonList lines="full">
      <IonItem>
        <IonLabel class="ion-text-center">
          <strong>Einstellungen</strong>
        </IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel slot="start">Aktiver Spieler</IonLabel>
        <IonSelect
          slot="end"
          interface="popover"
          value={config.names[config.activePlayer]}
        >
          {config.names.map((p: string) => {
            return !!p ? (
              <IonSelectOption value={p}>{p}</IonSelectOption>
            ) : null;
          })}
        </IonSelect>
      </IonItem>
      {[0, 1, 2, 3, 4].map((i) => {
        return (
          <IonItem key={"player" + i}>
            <IonLabel>Spieler {i + 1}</IonLabel>
            <IonInput
              slot="end"
              type="text"
              value={config.names[i]}
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
