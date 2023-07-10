import { IFilm } from "../core/interfaces/IFilm";
import { IGenericTile } from "../core/interfaces/IGenericTile";
import { IPeople } from "../core/interfaces/IPeople";
import { IPlanet } from "../core/interfaces/IPlanet";
import { ISpecie } from "../core/interfaces/ISpecie";
import { IStarship } from "../core/interfaces/IStarship";
import { IVehicle } from "../core/interfaces/IVehicle";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import RocketLaunchTwoToneIcon from "@mui/icons-material/RocketLaunchTwoTone";
import MovieCreationTwoToneIcon from "@mui/icons-material/MovieCreationTwoTone";
import DirectionsCarFilledTwoToneIcon from "@mui/icons-material/DirectionsCarFilledTwoTone";
import CircleTwoToneIcon from "@mui/icons-material/CircleTwoTone";
import PetsTwoToneIcon from "@mui/icons-material/PetsTwoTone";
import AllInclusiveTwoToneIcon from "@mui/icons-material/AllInclusiveTwoTone";
import {
  IGenericDetail,
  IGenericDetailElement,
  LeftHand,
  RightHand,
} from "../core/interfaces/IGenericDetail";
import {
  FilmStringsLeft,
  FilmStringsRight,
  PeopleStringsLeft,
  PeopleStringsRight,
  PlanetsStringsLeft,
  PlanetsStringsRight,
  SpeciesStringsLeft,
  SpeciesStringsRight,
  StarshipStringsLeft,
  StarshipStringsRight,
  ValueDesc,
  VehicleStringsLeft,
  VehicleStringsRight,
} from "./mappers";

export enum filterVoicesValue {
  ALL = "all",
  VEHICLES = "vehicles",
  PLANETS = "planets",
  STARSHIPS = "starships",
  FILMS = "films",
  SPECIES = "species",
  PEOPLE = "people",
}

export interface IFilter {
  text: string;
  value: string;
}

export const filterVoices: IFilter[] = [
  {
    text: "All",
    value: filterVoicesValue.ALL,
  },
  {
    text: "People",
    value: filterVoicesValue.PEOPLE,
  },
  {
    text: "Vehicles",
    value: filterVoicesValue.VEHICLES,
  },
  {
    text: "Planets",
    value: filterVoicesValue.PLANETS,
  },
  {
    text: "Starships",
    value: filterVoicesValue.STARSHIPS,
  },
  {
    text: "Films",
    value: filterVoicesValue.FILMS,
  },
  {
    text: "Species",
    value: filterVoicesValue.SPECIES,
  },
];

export const mergeArrays = (
  planets: IPlanet[],
  species: ISpecie[],
  people: IPeople[],
  vehicle: IVehicle[],
  film: IFilm[],
  starship: IStarship[]
): IGenericTile[] => {
  let mergedArray: IGenericTile[] = [];

  planets.forEach((item, i) => {
    const id = getLastNumber(item.url);
    const mergedItem: IGenericTile = {
      section: [
        item.name,
        item.diameter,
        item.gravity,
        item.orbital_period,
        item.population,
        item.surface_water,
      ],
      id,
      type: filterVoicesValue.PLANETS,
    };

    mergedArray.push(mergedItem);
  });

  species.forEach((item, i) => {
    const id = getLastNumber(item.url);
    const mergedItem: IGenericTile = {
      section: [
        item.name,
        item.hair_colors,
        item.designation,
        item.language,
        item.classification,
        item.average_height,
      ],
      id,
      type: filterVoicesValue.SPECIES,
    };

    mergedArray.push(mergedItem);
  });

  vehicle.forEach((item, i) => {
    const id = getLastNumber(item.url);
    const mergedItem: IGenericTile = {
      section: [
        item.name,
        item.cargo_capacity,
        item.crew,
        item.manufacturer,
        item.cost_in_credits,
        item.consumables,
      ],
      id,
      type: filterVoicesValue.VEHICLES,
    };

    mergedArray.push(mergedItem);
  });

  people.forEach((item, i) => {
    const id = getLastNumber(item.url);
    const mergedItem: IGenericTile = {
      section: [
        item.name,
        item.birth_year,
        item.eye_color,
        item.mass,
        item.height,
        item.gender,
      ],
      id,
      type: filterVoicesValue.PEOPLE,
    };

    mergedArray.push(mergedItem);
  });

  film.forEach((item, i) => {
    const id = getLastNumber(item.url);
    const mergedItem: IGenericTile = {
      section: [
        item.director,
        item.producer,
        item.episode_id,
        item.opening_crawl,
        item.title,
        item.url,
      ],
      id,
      type: filterVoicesValue.FILMS,
    };

    mergedArray.push(mergedItem);
  });

  starship.forEach((item, i) => {
    const id = getLastNumber(item.url);
    const mergedItem: IGenericTile = {
      section: [
        item.cargo_capacity,
        item.name,
        item.cost_in_credits,
        item.crew,
        item.model,
        item.passengers,
      ],
      id,
      type: filterVoicesValue.STARSHIPS,
    };

    mergedArray.push(mergedItem);
  });

  return mergedArray;
};

const getLastNumber = (url: string): string => {
  const regex = /(\d+)\/?$/;
  const match = url.match(regex);
  if (match) {
    return match[1].toString();
  }
  return '';
};

export const getFieldsForLeftHand = (
  obj: object,
  fields: ValueDesc[]
): LeftHand[] => {
  const newArray: LeftHand[] = fields.map((field) => ({
    value: obj[field.value as keyof typeof obj],
    key: field.description,
  }));

  return newArray;
};

export const getFieldsForRightHand = (
  obj: any,
  fields: ValueDesc[]
): RightHand[] => {
  const newArray: RightHand[] = fields.map((field) => ({
    values: obj[field.value as keyof typeof obj],
    key: field.description,
  }));

  return newArray;
};

export const mapDetail = (
  obj: IGenericDetailElement
): IGenericDetail | undefined => {
  switch (obj.type) {
    case filterVoicesValue.FILMS:
      const film: IFilm = obj.data;
      return {
        title: film.title,
        type: obj.type,
        leftHand: getFieldsForLeftHand(film, FilmStringsLeft),
        rightHand: getFieldsForRightHand(film, FilmStringsRight),
      };
    case filterVoicesValue.VEHICLES:
      const vehicle: IVehicle = obj.data;
      return {
        title: vehicle.name,
        type: obj.type,
        leftHand: getFieldsForLeftHand(vehicle, VehicleStringsLeft),
        rightHand: getFieldsForRightHand(vehicle, VehicleStringsRight),
      };
    case filterVoicesValue.PLANETS:
      const planet: IPlanet = obj.data;
      return {
        title: planet.name,
        type: obj.type,
        leftHand: getFieldsForLeftHand(planet, PlanetsStringsLeft),
        rightHand: getFieldsForRightHand(planet, PlanetsStringsRight),
      };
    case filterVoicesValue.PEOPLE:
      const people: IPeople = obj.data;
      return {
        title: people.name,
        type: obj.type,
        leftHand: getFieldsForLeftHand(people, PeopleStringsLeft),
        rightHand: getFieldsForRightHand(people, PeopleStringsRight),
      };
    case filterVoicesValue.SPECIES:
      const specie: ISpecie = obj.data;
      return {
        title: specie.name,
        type: obj.type,
        leftHand: getFieldsForLeftHand(specie, SpeciesStringsLeft),
        rightHand: getFieldsForRightHand(specie, SpeciesStringsRight),
      };
    case filterVoicesValue.STARSHIPS:
      const starship: IStarship = obj.data;
      return {
        title: starship.name,
        type: obj.type,
        leftHand: getFieldsForLeftHand(starship, StarshipStringsLeft),
        rightHand: getFieldsForRightHand(starship, StarshipStringsRight),
      };
    default:
      return undefined;
  }
};

export const selectIcon = (value: string): React.ReactElement | undefined => {
  switch (value) {
    case filterVoicesValue.ALL:
      return <AllInclusiveTwoToneIcon />;
    case filterVoicesValue.FILMS:
      return <MovieCreationTwoToneIcon />;
    case filterVoicesValue.VEHICLES:
      return <DirectionsCarFilledTwoToneIcon />;
    case filterVoicesValue.PLANETS:
      return <CircleTwoToneIcon />;
    case filterVoicesValue.PEOPLE:
      return <PeopleAltTwoToneIcon />;
    case filterVoicesValue.SPECIES:
      return <PetsTwoToneIcon />;
    case filterVoicesValue.STARSHIPS:
      return <RocketLaunchTwoToneIcon />;
    default:
      return undefined;
  }
};
