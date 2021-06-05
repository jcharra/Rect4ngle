import {
  IonApp,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonIcon,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";
import {
  ellipsisHorizontal,
  ellipsisVertical,
  personCircle,
  search,
} from "ionicons/icons";
import { MainArea } from "./components/MainArea";
/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => (
  <IonApp>
    <IonContent>
      <MainArea />
    </IonContent>
    <IonFooter>
      <IonToolbar color="dark">
        <IonButtons slot="secondary">
          <IonButton>
            <IonIcon slot="icon-only" icon={personCircle} />
          </IonButton>
          <IonButton>
            <IonIcon slot="icon-only" icon={search} />
          </IonButton>
        </IonButtons>
        <IonButtons slot="primary">
          <IonButton color="danger">
            <IonIcon
              slot="icon-only"
              ios={ellipsisHorizontal}
              md={ellipsisVertical}
            />
          </IonButton>
        </IonButtons>
        <IonTitle>Dark Toolbar</IonTitle>
      </IonToolbar>
    </IonFooter>
  </IonApp>
);

export default App;
