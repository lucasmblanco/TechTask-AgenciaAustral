import { getRandomNumber } from '../utils';

export enum FetchStatus {
  SUCCESS = 'success',
  IDLE = 'idle',
  REJECTED = 'rejected',
}

export enum FetchType {
  GRAPHQL = 'graph',
  REST = 'rest',
}

export const orderBy = [
  '{id: asc}',
  '{id: desc}',
  '{base_experience: asc}',
  '{base_experience: desc}',
  '{name: asc}',
  '{name: desc}',
  '{order: asc}',
  '{order: desc}',
];

export const graphQlQuery = `{
  pokemon_v2_pokemon(limit: 20, offset: ${getRandomNumber()}, order_by: ${
    orderBy[Math.floor(Math.random() * orderBy.length)]
  }) {
    name
    order
    id
    base_experience
    height
    weight
    pokemon_v2_pokemontypes {
      pokemon_v2_type {
        name
      }
    }
    pokemon_v2_pokemonsprites {
      sprites
    }
    pokemon_v2_pokemonabilities {
      pokemon_v2_ability {
        name
      }
    }
  }
}
`;

export const LANGUAGE_EN_ID = '9';

export const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
