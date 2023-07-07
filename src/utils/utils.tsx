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

  planets.forEach((item) => {
    const mergedItem: IGenericTile = {
      info1: item.name,
      info2: item.diameter,
      info3: item.gravity,
      info4: item.orbital_period,
      info5: item.population,
      info6: item.surface_water,
      type: filterVoicesValue.PLANETS,
    };

    mergedArray.push(mergedItem);
  });

  species.forEach((item) => {
    const mergedItem: IGenericTile = {
      info1: item.name,
      info2: item.hair_colors,
      info3: item.designation,
      info4: item.language,
      info5: item.classification,
      info6: item.average_height,
      type: filterVoicesValue.SPECIES,
    };

    mergedArray.push(mergedItem);
  });

  vehicle.forEach((item) => {
    const mergedItem: IGenericTile = {
      info1: item.name,
      info2: item.cargo_capacity,
      info3: item.crew,
      info4: item.manufacturer,
      info5: item.cost_in_credits,
      info6: item.consumables,
      type: filterVoicesValue.VEHICLES,
    };

    mergedArray.push(mergedItem);
  });

  people.forEach((item) => {
    const mergedItem: IGenericTile = {
      info1: item.name,
      info2: item.birth_year,
      info3: item.eye_color,
      info4: item.mass,
      info5: item.height,
      info6: item.gender,
      type: filterVoicesValue.PEOPLE,
    };

    mergedArray.push(mergedItem);
  });

  film.forEach((item) => {
    const mergedItem: IGenericTile = {
      info1: item.director,
      info2: item.producer,
      info3: item.episode_id,
      info4: item.opening_crawl,
      info5: item.title,
      info6: item.url,
      type: filterVoicesValue.FILMS,
    };

    mergedArray.push(mergedItem);
  });

  starship.forEach((item) => {
    const mergedItem: IGenericTile = {
      info1: item.cargo_capacity,
      info2: item.name,
      info3: item.cost_in_credits,
      info4: item.crew,
      info5: item.model,
      info6: item.passengers,
      type: filterVoicesValue.STARSHIPS,
    };

    mergedArray.push(mergedItem);
  });

  mergedArray = mergedArray.map((m, index) => {return {...m, id: index.toString()}});

  return mergedArray;
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