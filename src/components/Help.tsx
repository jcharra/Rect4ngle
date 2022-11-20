import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { Trans, useTranslation } from "react-i18next";
import "./Help.css";
import FixedHeading from "./parts/FixedHeading";

export default function Help({ onDismiss }: { onDismiss: () => void }) {
  const { t } = useTranslation();

  return (
    <>
      <FixedHeading text={t("rectangle_rules")} onDismiss={onDismiss} />
      <IonGrid style={{ width: "100%" }} class="helpContainer">
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
      </IonGrid>
    </>
  );
}
