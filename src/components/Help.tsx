import { IonButton, IonCol, IonGrid, IonRow } from "@ionic/react";
import { Trans, useTranslation } from "react-i18next";
import "./Help.css";

export default function Help({ onDismiss }: { onDismiss: () => void }) {
  const { t } = useTranslation();

  return (
    <IonGrid style={{ width: "100%" }} class="helpContainer">
      <IonRow class="helpHeader ion-text-center">
        <IonCol>{t("rectangle_rules")}</IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <Trans i18nKey="help_1" t={t}></Trans>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <Trans i18nKey="help_2" t={t} components={{ h5: <h5 /> }}></Trans>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <Trans i18nKey="help_3" t={t} components={{ h5: <h5 /> }}></Trans>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonButton expand="block" onClick={() => onDismiss()}>
            Close
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}
