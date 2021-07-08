import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useAsync } from "react-async-hook";
import { useTranslation } from "react-i18next";
import {
  getPlayerConfig,
  PlayerConfig,
  savePlayerConfig,
} from "../service/playerService";

const LANGUAGES: { code: string; name: string }[] = [
  { code: "de", name: "Deutsch" },
  { code: "en", name: "English" },
];

export default function Settings({ onDismiss }: { onDismiss: () => void }) {
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

  return (
    <SettingContent
      config={config}
      updateConfig={updateConfig}
      onDismiss={onDismiss}
    />
  );
}

function SettingContent({
  config,
  updateConfig,
  onDismiss,
}: {
  config: PlayerConfig;
  updateConfig: (cfg: PlayerConfig) => void;
  onDismiss: () => void;
}) {
  const { t, i18n } = useTranslation();

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
          <strong>{t("settings")}</strong>
        </IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel slot="start">{t("active_player")}</IonLabel>
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
            <IonLabel>
              {t("player")} {i + 1}
            </IonLabel>
            <IonInput
              slot="end"
              type="text"
              value={config.names[i]}
              placeholder={t("player_name_placeholder")}
              onBlur={(e) => savePlayerName(i, e.target.value as string)}
            ></IonInput>
          </IonItem>
        );
      })}
      <IonItem>
        <IonLabel slot="start">{t("language")}</IonLabel>
        <IonSelect
          slot="end"
          interface="popover"
          value={i18n.language}
          onIonChange={(e) => i18n.changeLanguage(e.detail.value)}
        >
          {LANGUAGES.map((lang) => (
            <IonSelectOption key={lang.code} value={lang.code}>
              {lang.name}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonButton expand="block" onClick={() => onDismiss()}>
          {t("close")}
        </IonButton>
      </IonItem>
    </IonList>
  );
}
