import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { closeCircleOutline } from "ionicons/icons";

export default function FixedHeading({ text, onDismiss }: { text: string; onDismiss: () => void }) {
  return (
    <IonItem>
      <IonLabel class="ion-text-center">
        <strong>{text}</strong>
      </IonLabel>
      <IonLabel slot="end">
        <IonIcon slot="icon-only" size="large" icon={closeCircleOutline} onClick={() => onDismiss()} />
      </IonLabel>
    </IonItem>
  );
}
