export enum filterVoicesValue {
  ALL = 'all',
  VEHICLES = 'vehicles',
  PLANETS = 'planets',
  STARSHIPS = 'starships',
  FILMS = 'films',
  SPECIES = 'species',
  PEOPLE = 'people',
}

export interface IFilter {
    text: string,
    value: string
}

export const filterVoices: IFilter[] = [
  {
    text: 'All',
    value: filterVoicesValue.ALL,
  },
  {
    text: 'People',
    value: filterVoicesValue.PEOPLE,
  },
  {
    text: 'Vehicles',
    value: filterVoicesValue.VEHICLES,
  },
  {
    text: 'Planets',
    value: filterVoicesValue.PLANETS,
  },
  {
    text: 'Starships',
    value: filterVoicesValue.STARSHIPS,
  },
  {
    text: 'Films',
    value: filterVoicesValue.FILMS,
  },
  {
    text: 'Species',
    value: filterVoicesValue.SPECIES,
  },
];
