import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonLabel,
  IonBadge,
} from '@ionic/react';
import { convertToRealUnit, capitalizeName } from '../utils';
import { Pokemon } from '../types';

export default function Card({ data }: { data: Pokemon }) {
  return (
    <>
      <IonCard>
        <div className="top-container">
          <div className="exp-container">
            <IonLabel>Nº</IonLabel>
            <IonBadge color="success">{data.id}</IonBadge>
          </div>
          <div className="exp-container">
            <IonLabel>EXP</IonLabel>
            <IonBadge>{data.base_experience}</IonBadge>
          </div>
        </div>
        <div className="img-container">
          <img alt="" src={data.sprites.front_default || undefined} />
        </div>
        <IonCardHeader>
          <IonCardTitle>{capitalizeName(data.name)}</IonCardTitle>
          <IonCardSubtitle>
            <div className="type-container">
              {data.types.map((d) => (
                <span key={Math.random()}>{d.type.name}</span>
              ))}
            </div>
          </IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <div className="basic-stats">
            <span>{`Height: ${convertToRealUnit(data.height)} m. `}</span>
            <span>{`Weight: ${convertToRealUnit(data.weight)} kg.`}</span>
          </div>
          <div className="abilities-container">
            <h2>Abilities</h2>
            <div className="abilities-list">
              {data.abilities.map((a) => (
                <span key={Math.random()}>{a.ability.name}</span>
              ))}
            </div>
          </div>
        </IonCardContent>
      </IonCard>
    </>
  );
}
