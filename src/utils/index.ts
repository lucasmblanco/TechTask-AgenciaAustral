// export const remodelData = function (data) {
//   return data.data.pokemon_v2_pokemon.reduce((acc: Pokemon[], curr) => {
//     acc.push({
//       id: curr.id,
//       name: curr.name,
//       order: curr.order,
//       height: curr.height,
//       weight: curr.weight,
//       base_experience: curr.base_experience,
//       // abilities: curr.pokemon_v2_pokemonabilities.reduce((acc, curr) => {
//       //   acc.push({
//       //     name: curr.pokemon_v2_ability.name,
//       //     description:
//       //       curr.pokemon_v2_ability.pokemon_v2_abilityeffecttexts.find(
//       //         (ab) => ab.language_id === LANGUAGE_EN_ID,
//       //       )?.effect,
//       //   });
//       //   return acc;
//       // }, []),
//       sprites: JSON.parse(
//         curr.pokemon_v2_pokemonsprites.map((element) => element.sprites),
//       ),
//     });
//     return acc;
//   }, []);
// };

export const getRandomNumber = () => Math.floor(Math.random() * (1291 - 0) + 0);

export const convertToRealUnit = function (number: number) {
  return number / 10;
};

export const capitalizeName = function (word: string) {
  return word[0].toUpperCase() + word.substring(1);
};
