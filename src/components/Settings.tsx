import {
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useAsync } from "react-async-hook";
import {
  getPlayerConfig,
  PlayerConfig,
  savePlayerConfig,
} from "../service/playerService";

export default function Settings() {
  const { loading, error, result } = useAsync(getPlayerConfig, []);
  const [config, setConfig] = useState<PlayerConfig | null>(null);

  useEffect(() => {
    setConfig(result as PlayerConfig);
  }, [result]);

  if (loading || error || !config) {
    return null;
  }

  const updateConfig = (cfg: PlayerConfig) => {
    try {
      savePlayerConfig(cfg);
      setConfig(cfg);
    } catch (ex) {
      console.log("Nope");
    }
  };

  return <SettingContent config={config} updateConfig={updateConfig} />;
}

function SettingContent({
  config,
  updateConfig,
}: {
  config: PlayerConfig;
  updateConfig: (cfg: PlayerConfig) => void;
}) {
  const savePlayerName = (idx: number, name: string) => {
    const updatedConfig: PlayerConfig = { ...config };
    updatedConfig.names[idx] = name;
    updateConfig(updatedConfig);
  };

  const setActivePlayer = (idx: number) => {
    const updatedConfig: PlayerConfig = { ...config };
    updatedConfig.activePlayer = idx;
    updateConfig(updatedConfig);
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
        <IonSelect
          slot="end"
          interface="popover"
          value={config.activePlayer}
          onIonChange={(e) => {
            if (e.detail.value !== config.activePlayer) {
              setActivePlayer(e.detail.value);
            }
          }}
        >
          {config.names.map((p: string, idx: number) => {
            return !!p ? (
              <IonSelectOption key={"select" + idx} value={idx}>
                {p}
              </IonSelectOption>
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
