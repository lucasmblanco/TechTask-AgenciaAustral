import { IonFooter, IonToolbar, IonTitle, IonIcon } from '@ionic/react';
import { logoGithub } from 'ionicons/icons';

export default function Footer() {
  return (
    <>
      <IonFooter>
        <IonToolbar>
          <IonTitle>
            <a href="https://github.com/lucasmblanco/TechTask-AgenciaAustral">
              {' '}
              <IonIcon icon={logoGithub} size="large"></IonIcon>
            </a>
          </IonTitle>
        </IonToolbar>
      </IonFooter>
    </>
  );
}
