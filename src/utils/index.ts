import { Abilities, PokeTypes, Pokemon } from '../types';
interface GraphQLData {
  id: number;
  name: string;
  order: number;
  height: number;
  weight: number;
  base_experience: number;
  pokemon_v2_pokemonabilities: PokeAbGQL[];
  pokemon_v2_pokemonsprites: PokeSprites[];
  pokemon_v2_pokemontypes: PokeTypesGQL[];
}

interface GraphQLData {
  data: {
    pokemon_v2_pokemon: GraphQLData[];
  };
}

interface PokeTypesGQL {
  pokemon_v2_type: {
    name: string;
  };
}

interface PokeAbGQL {
  pokemon_v2_ability: {
    name: string;
  };
}

interface PokeSprites {
  sprites: string;
}

export const remodelData = function (data: GraphQLData) {
  return data.data.pokemon_v2_pokemon.reduce(
    (acc: Pokemon[], curr: GraphQLData) => {
      acc.push({
        id: curr.id,
        name: curr.name,
        order: curr.order,
        height: curr.height,
        weight: curr.weight,
        types: curr.pokemon_v2_pokemontypes.reduce((acc: PokeTypes[], curr) => {
          acc.push({
            type: {
              name: curr.pokemon_v2_type.name,
            },
          });
          return acc;
        }, []),
        base_experience: curr.base_experience,
        abilities: curr.pokemon_v2_pokemonabilities.reduce(
          (acc: Abilities[], curr) => {
            acc.push({
              ability: {
                name: curr.pokemon_v2_ability.name,
              },
            });
            return acc;
          },
          [],
        ),
        sprites: JSON.parse(curr.pokemon_v2_pokemonsprites[0].sprites),
      });
      return acc;
    },
    [],
  );
};

const TOTAL_POKEMONS = 800;

export const getRandomNumber = () =>
  Math.floor(Math.random() * (TOTAL_POKEMONS - 0) + 0);

export const convertToRealUnit = function (number: number) {
  return number / 10;
};

export const capitalizeName = function (word: string) {
  return word[0].toUpperCase() + word.substring(1);
};
