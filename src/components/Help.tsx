import { IonButton, IonButtons, IonCol, IonGrid, IonHeader, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { Trans, useTranslation } from "react-i18next";
import "./Help.css";

export default function Help({ onDismiss }: { onDismiss: () => void }) {
  const { t } = useTranslation();

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t("rectangle_rules")}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDismiss}>{t("close")}</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonGrid style={{ width: "100%" }} class="helpContainer">
        <IonRow>
          <IonCol>
            {/* eslint-disable-next-line */}
            <Trans i18nKey="help_1" t={t} components={{ h5: <h5 /> }}></Trans>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            {/* eslint-disable-next-line */}
            <Trans i18nKey="help_2" t={t} components={{ h5: <h5 /> }}></Trans>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            {/* eslint-disable-next-line */}
            <Trans i18nKey="help_3" t={t} components={{ h5: <h5 /> }}></Trans>
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
}
