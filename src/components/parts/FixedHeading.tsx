import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { closeCircleOutline } from "ionicons/icons";

export default function FixedHeading({ text, onDismiss }: { text: string; onDismiss: () => void }) {
  return (
    <IonItem>
      <IonLabel class="ion-text-center">
        <strong>{text}</strong>
        <IonIcon
          className="ion-float-right"
          slot="icon-only"
          size="large"
          icon={closeCircleOutline}
          onClick={() => onDismiss()}
        />
      </IonLabel>
    </IonItem>
  );
}
