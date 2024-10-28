import { IonChip } from "@ionic/react";
import { t } from "i18next";
import { Trans } from "react-i18next";
import i18n from "../i18n";
import "./WelcomeScreen.css";

export default function WelcomeScreen() {
  return (
    <>
      <div className="languageSelector">
        <IonChip color="primary" onClick={() => i18n.changeLanguage("de")}>
          🇩🇪
        </IonChip>
        <IonChip color="primary" onClick={() => i18n.changeLanguage("fr")}>
          🇫🇷
        </IonChip>
        <IonChip color="primary" onClick={() => i18n.changeLanguage("en")}>
          🇬🇧
        </IonChip>
      </div>
      <Trans i18nKey="tutorial" t={t} components={{ h5: <h5 /> }}></Trans>
    </>
  );
}
