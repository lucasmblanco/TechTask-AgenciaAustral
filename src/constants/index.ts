export enum FetchStatus {
  SUCCESS = 'success',
  IDLE = 'idle',
  REJECTED = 'rejected',
}

export const query2 = `{
  pokemon_v2_pokemon(limit: 10) {
    name
    order
    id
    base_experience
    height
    weight
    pokemon_v2_pokemonsprites {
      sprites
    }
    pokemon_v2_pokemonabilities {
      pokemon_v2_ability {
        name
        pokemon_v2_abilityeffecttexts {
          language_id
          effect
        }
      }
    }
  }
}

`;

export const query3 = ` {
  pokemon_v2_pokemon {
    name
    order
    id
    height
    base_experience
    weight
    pokemon_v2_pokemonabilities {
      pokemon_v2_ability {
        name
        pokemon_v2_abilityeffecttexts {
          language_id
          effect
        }
      }
    }
    pokemon_v2_pokemonsprites {
      sprites
    }
    pokemon_v2_pokemontypes {
      pokemon_v2_type {
        name
      }
    }
  }
}
`;

export const LANGUAGE_EN_ID = '9';

export const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

export const urlParameters = '?offset=';
