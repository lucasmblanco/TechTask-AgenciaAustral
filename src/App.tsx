import './App.css';
import {
  setupIonicReact,
  IonApp,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonButton,
} from '@ionic/react';

import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import DataDisplay from './components/DataDisplay';
import { Pokemon, RefresherEventDetail } from './types';
import {
  FetchStatus,
  apiRestUrl,
  apiGraphUrl,
  elementQuantity,
  FetchType,
  graphQlQuery,
} from './constants';
import { getRandomNumber, remodelData } from './utils';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

setupIonicReact({ mode: 'ios' });

interface FetchOptions {
  preserve: boolean;
}

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [status, setStatus] = useState(FetchStatus.IDLE);
  const [fetchFn, setFetchFn] = useState<
    (options?: FetchOptions) => Promise<void>
  >(() => () => fetchPokemonsRest());

  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      fetchFn();
      event.detail.complete();
    }, 5000);
  }

  function setNewFetchFn(type: string) {
    setPokemons([]);
    if (type === FetchType.GRAPHQL) {
      setFetchFn(() => fetchPokemonsGraphQL);
    } else if (type === FetchType.REST) {
      setFetchFn(() => fetchPokemonsRest);
    }
  }

  async function fetchPokemonsGraphQL(options?: FetchOptions) {
    try {
      const response = await fetch(apiGraphUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: graphQlQuery,
        }),
      });

      const primitiveData = await response.json();
      const pokemonsData = remodelData(primitiveData);
      setPokemons((prevState) => {
        if (options?.preserve) {
          return [...prevState, ...pokemonsData];
        } else {
          return pokemonsData;
        }
      });
      setStatus(FetchStatus.SUCCESS);
    } catch (err) {
      setStatus(FetchStatus.REJECTED);
      console.error(err);
    }
  }

  async function fetchPokemonsRest(options?: FetchOptions) {
    try {
      const pokemonUrls = Array(elementQuantity)
        .fill(undefined)
        .map(() => {
          return apiRestUrl + getRandomNumber();
        });
      const pokemonsData = await Promise.all(
        pokemonUrls.map(async (url: string) => {
          const response = await fetch(url, {
            headers: { 'Content-Type': 'application/json' },
          });
          const data = await response.json();
          return data;
        }),
      );
      setPokemons((prevState) => {
        if (options?.preserve) {
          return [...prevState, ...pokemonsData];
        } else {
          return pokemonsData;
        }
      });
      setStatus(FetchStatus.SUCCESS);
    } catch (err) {
      setStatus(FetchStatus.REJECTED);
      console.log(err);
    }
  }
  useEffect(() => {
    fetchFn();
  }, [fetchFn]);

  return (
    <>
      <IonApp>
        <Header />
        <div className="button-container">
          {' '}
          <span>use: </span>
          <IonButton
            fill="solid"
            type="button"
            size="small"
            onClick={() => setNewFetchFn(FetchType.REST)}
          >
            API REST
          </IonButton>
          <IonButton
            fill="solid"
            type="button"
            size="small"
            onClick={() => setNewFetchFn(FetchType.GRAPHQL)}
          >
            GRAPHQL
          </IonButton>
        </div>

        <IonContent className="ion-padding">
          <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
          <DataDisplay status={status} data={pokemons}></DataDisplay>
          <IonInfiniteScroll
            threshold="5%"
            onIonInfinite={(ev) => {
              fetchFn({ preserve: true });
              setTimeout(() => ev.target.complete(), 5000);
            }}
          >
            <IonInfiniteScrollContent></IonInfiniteScrollContent>
          </IonInfiniteScroll>
        </IonContent>
        <Footer />
      </IonApp>
    </>
  );
}

export default App;
