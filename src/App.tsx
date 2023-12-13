import './App.css';
import {
  setupIonicReact,
  IonApp,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonFooter,
  IonRefresher,
  IonRefresherContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonIcon,
} from '@ionic/react';
import { logoGithub } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import PokemonLogo from './assets/pokemon-logo.png';
import DataDisplay from './components/DataDisplay';
import { Pokemon } from './types';
import { FetchStatus, apiUrl } from './constants';
import { getRandomNumber } from './utils';
import { RefresherEventDetail, PrimitiveData } from './types';
import { urlParameters } from './constants';

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

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextPage, setNextPage] = useState('');
  const [status, setStatus] = useState(FetchStatus.IDLE);
  const [randomNumber, setRandomNumber] = useState(getRandomNumber());

  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      setRandomNumber(getRandomNumber());
      fetchPokemons();
      event.detail.complete();
    }, 5000);
  }

  // async function fetchPokemons() {
  //   try {
  //     setStatus('pending');
  //     const response = await fetch('https://beta.pokeapi.co/graphql/v1beta', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         query: query2,
  //       }),
  //     });
  //     const data = await response.json();
  //     // console.log(data);
  //     const pokemonData = remodelData(data);
  //     setPokemons(pokemonData);
  //     setStatus('succesful');
  //   } catch (err) {
  //     setStatus('rejected');
  //     console.error(err);
  //   }
  // }

  async function fetchPokemons(
    url = `${apiUrl + urlParameters + randomNumber}`,
    preserve = false,
  ) {
    try {
      const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      setNextPage(data.next);
      const urls = data.results.map((element: PrimitiveData) => element.url);
      const pokemonsData = await Promise.all(
        urls.map(async (url: string) => {
          const response = await fetch(url, {
            headers: { 'Content-Type': 'application/json' },
          });
          const data = await response.json();
          return data;
        }),
      );
      setPokemons((prevState) => {
        if (preserve) {
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
    setRandomNumber(getRandomNumber());
    fetchPokemons();
  }, []);

  return (
    <>
      <IonApp>
        <IonHeader>
          <IonToolbar>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={PokemonLogo} alt="" width={200} />
            </div>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
          <DataDisplay status={status} data={pokemons}></DataDisplay>
          <IonInfiniteScroll
            threshold="5%"
            onIonInfinite={(ev) => {
              setRandomNumber(getRandomNumber());
              fetchPokemons(nextPage, true);
              setTimeout(() => ev.target.complete(), 5000);
            }}
          >
            <IonInfiniteScrollContent></IonInfiniteScrollContent>
          </IonInfiniteScroll>
        </IonContent>
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
      </IonApp>
    </>
  );
}

export default App;
