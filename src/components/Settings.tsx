import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
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
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t("settings")}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDismiss}>{t("close")}</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList lines="full">
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
        </IonList>
      </IonContent>
    </>
  );
}
