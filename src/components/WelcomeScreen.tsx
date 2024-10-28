import { IonChip } from "@ionic/react";
import { t } from "i18next";
import { Trans } from "react-i18next";
import i18n from "../i18n";
import "./WelcomeScreen.css";

export default function WelcomeScreen() {
  return (
    <>
      <div className="languageSelector">
        <IonChip color={i18n.language === "de" ? "primary" : "light"} onClick={() => i18n.changeLanguage("de")}>
          <span className="flag">🇩🇪</span>
        </IonChip>
        <IonChip color={i18n.language === "fr" ? "primary" : "light"} onClick={() => i18n.changeLanguage("fr")}>
          <span className="flag">🇫🇷</span>
        </IonChip>
        <IonChip color={i18n.language === "en" ? "primary" : "light"} onClick={() => i18n.changeLanguage("en")}>
          <span className="flag">🇬🇧</span>
        </IonChip>
      </div>
      {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
      <Trans i18nKey="tutorial" t={t} components={{ h5: <h5 /> }}></Trans>
    </>
  );
}
