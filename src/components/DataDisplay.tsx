import { IonLoading, IonGrid, IonRow, IonCol, IonToast } from '@ionic/react';
import Card from './Card';
import { Pokemon } from '../types';
import { FetchStatus } from '../constants';

export default function DataDisplay({
  status,
  data,
}: {
  status: FetchStatus.IDLE | FetchStatus.SUCCESS | FetchStatus.REJECTED;
  data: Pokemon[];
}) {
  if (status === FetchStatus.IDLE) {
    return <IonLoading isOpen message="Loading"></IonLoading>;
  }

  if (status === FetchStatus.REJECTED) {
    return (
      <IonToast
        isOpen
        message="Network Error"
        duration={5000}
        color={'danger'}
      ></IonToast>
    );
  }

  return (
    <>
      <IonGrid fixed={true}>
        <IonRow>
          {status === 'success' ? (
            data?.map((pokemon: Pokemon) => {
              return (
                <IonCol key={Math.random()} size="1">
                  <Card data={pokemon} />
                </IonCol>
              );
            })
          ) : (
            <IonLoading message="Loading..." spinner="circles" />
          )}
        </IonRow>
      </IonGrid>
    </>
  );
}
