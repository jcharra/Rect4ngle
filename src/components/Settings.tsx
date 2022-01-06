import { IonButton, IonInput, IonItem, IonLabel, IonList, IonSelect, IonSelectOption } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { Settings } from "../hooks/settingsHook";
import "./Settings.css";

const LANGUAGES: { code: string; name: string }[] = [
  { code: "de", name: "Deutsch" },
  { code: "en", name: "English" },
];

export default function SettingsWindow({ onDismiss, settings }: { onDismiss: () => void; settings: Settings }) {
  const { t, i18n } = useTranslation();

  const { activePlayerIndex, playerNames, selectPlayer, changePlayerName } = settings;
  console.log("Rerender with", playerNames);
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
          className="select-full-width"
          slot="end"
          interface="popover"
          value={activePlayerIndex}
          onIonChange={(e) => {
            selectPlayer(e.detail.value);
          }}
        >
          {playerNames.map((p: string, idx: number) => {
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
              value={playerNames[i]}
              maxlength={25}
              placeholder={t("player_name_placeholder")}
              onBlur={(e) => changePlayerName(e.target.value as string, i)}
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
