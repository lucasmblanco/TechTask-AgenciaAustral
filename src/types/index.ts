export interface Sprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  order: number;
  sprites: Sprites;
  abilities: Abilities[];
  types: Types[];
}

export interface Types {
  type: {
    name: string;
  };
}

export interface Abilities {
  ability: {
    name: string;
  };
}

export interface RefresherEventDetail {
  complete(): void;
}

export interface PrimitiveData {
  name: string;
  url: string;
}
