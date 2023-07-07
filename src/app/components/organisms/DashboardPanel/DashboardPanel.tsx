import React, { useEffect, useState } from "react";
import * as Api from "../../../../core/api/Api";
import _ from "lodash";
import { IFilm } from "../../../../core/interfaces/IFilm";
import { IPeople } from "../../../../core/interfaces/IPeople";
import { IPlanet } from "../../../../core/interfaces/IPlanet";
import { ISpecie } from "../../../../core/interfaces/ISpecie";
import { IStarship } from "../../../../core/interfaces/IStarship";
import { IVehicle } from "../../../../core/interfaces/IVehicle";
import FilterChips from "../../molecules/filterList/FilterList";
import { Grid, Pagination } from "@mui/material";
import Tile from "../../atoms/tile/Tile";
import {
  filterVoicesValue,
  mergeArrays,
  selectIcon,
} from "../../../../utils/utils";
import { IGenericTile } from "../../../../core/interfaces/IGenericTile";

const ITEMS_PER_PAGE = 10;

const DashboardPanel: React.FC = () => {
  const [planets, setPlanets] = useState<IPlanet[]>([]);
  const [people, setPeople] = useState<IPeople[]>([]);
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [films, setFilms] = useState<IFilm[]>([]);
  const [species, setSpecies] = useState<ISpecie[]>([]);
  const [starships, setStarships] = useState<IStarship[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilter, setCurrentFilter] = useState<IGenericTile[]>([]);
  const [defaultFilter, setDefaultFilter] = useState<IGenericTile[]>([]);

  useEffect(() => {
    Promise.all([
      Api.Planets.find(),
      Api.People.find(),
      Api.Vehicles.find(),
      Api.Starships.find(),
      Api.Films.find(),
      Api.Species.find(),
    ]).then(
      ([
        planetsResponse,
        peopleResponse,
        vehiclesResponse,
        starshipsResponse,
        filmsResponse,
        speciesResponse,
      ]) => {
        setPlanets(planetsResponse.resources.map((m) => m.value));
        setPeople(peopleResponse.resources.map((m) => m.value));
        setVehicles(vehiclesResponse.resources.map((m) => m.value));
        setStarships(starshipsResponse.resources.map((m) => m.value));
        setFilms(filmsResponse.resources.map((m) => m.value));
        setSpecies(speciesResponse.resources.map((m) => m.value));

        const mergedData = mergeArrays(
          planetsResponse.resources.map((m) => m.value),
          speciesResponse.resources.map((m) => m.value),
          peopleResponse.resources.map((m) => m.value),
          vehiclesResponse.resources.map((m) => m.value),
          filmsResponse.resources.map((m) => m.value),
          starshipsResponse.resources.map((m) => m.value)
        );
        setDefaultFilter(mergedData);
        setCurrentFilter(mergedData);
      }
    );
  }, []);

  const handleChipClick = (value: string) => {
    setCurrentPage(1);
    if (value === filterVoicesValue.ALL) {
      setCurrentFilter(defaultFilter);
    } else {
      setCurrentFilter(
        mergeArrays(
          planets,
          species,
          people,
          vehicles,
          films,
          starships
        ).filter((i) => i.type === value)
      );
    }
  };

  const totalPageCount = Math.ceil(currentFilter.length / ITEMS_PER_PAGE);

  const currentItems = currentFilter.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (event: any, page: number) => {
    setCurrentPage(page);
  };

  return (
    <Grid container justifyContent="center">
      <div className="dashboard-panel">
        <FilterChips onChipClick={handleChipClick} />
        <>
          {currentItems.map((p) => (
            <Tile
              icon={selectIcon(p.type)}
              info1={p.info1}
              info2={p.info2}
              info3={p.info3}
              info4={p.info4}
              info5={p.info5}
              info6={p.info6}
            />
          ))}
          <Pagination
            count={totalPageCount}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </>
      </div>
    </Grid>
  );
};

export default DashboardPanel;
