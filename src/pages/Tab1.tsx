import { IonContent, IonPage } from "@ionic/react";
import { MainArea } from "../components/MainArea";
import "./Tab1.css";

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <MainArea />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
