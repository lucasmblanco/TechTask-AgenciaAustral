import { IonHeader, IonToolbar } from '@ionic/react';
import PokemonLogo from '../assets/pokemon-logo.png';

export default function Header() {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={PokemonLogo} alt="" width={200} />
          </div>
        </IonToolbar>
      </IonHeader>
    </>
  );
}
