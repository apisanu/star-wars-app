import React, { useEffect, useState } from 'react';
import * as Api from '../../../../core/api/Api';
import _ from 'lodash';
import { IFilm } from '../../../../core/interfaces/IFilm';
import { IPeople } from '../../../../core/interfaces/IPeople';
import { IPlanet } from '../../../../core/interfaces/IPlanet';
import { ISpecie } from '../../../../core/interfaces/ISpecie';
import { IStarship } from '../../../../core/interfaces/IStarship';
import { IVehicle } from '../../../../core/interfaces/IVehicle';
import FilterChips from '../../molecules/filterList/FilterList';
import { Grid, Pagination } from '@mui/material';
import Tile from '../../atoms/tile/Tile';
import {
  filterVoicesValue,
  mergeArrays,
  selectIcon,
} from '../../../../utils/utils';
import { IGenericTile } from '../../../../core/interfaces/IGenericTile';
import { useNavigate } from 'react-router-dom';
import Search from '../../atoms/search/Search';
import styles from './DashboardPanel.module.scss';

const ITEMS_PER_PAGE = 10;

const DashboardPanel: React.FC = () => {
  const [planets, setPlanets] = useState<IPlanet[]>([]);
  const [people, setPeople] = useState<IPeople[]>([]);
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [films, setFilms] = useState<IFilm[]>([]);
  const [species, setSpecies] = useState<ISpecie[]>([]);
  const [starships, setStarships] = useState<IStarship[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resetSearch, setResetSearch] = useState(0);
  const [currentFilter, setCurrentFilter] = useState<IGenericTile[]>([]);
  const [standardCurrentFilter, setStandardCurrentFilter] = useState<
    IGenericTile[]
  >([]);
  const [defaultFilter, setDefaultFilter] = useState<IGenericTile[]>([]);
  const navigate = useNavigate();

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
        setStandardCurrentFilter(mergedData);
      }
    );
  }, []);

  const handleChipClick = (value: string) => {
    setCurrentPage(1);
    setResetSearch(1);
    if (value === filterVoicesValue.ALL) {
      setCurrentFilter(defaultFilter);
      setStandardCurrentFilter(defaultFilter);
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
      setStandardCurrentFilter(
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

  const handleGoToDetail = (id: string | undefined, type: string) => {
    if (id?.toString()) {
      navigate(`/detail/${id}?type=${type}`);
    }
  };

  const handleSearch = (result: IGenericTile[]) => {
    setResetSearch(0);
    setCurrentFilter(result);
  };

  return (
    <Grid
      container
      justifyContent="center"
      className={styles.dashboardContainer}
    >
      <FilterChips onChipClick={handleChipClick} />
      <Search
        data={currentFilter}
        dataStandard={standardCurrentFilter}
        reset={resetSearch}
        onSearchResult={handleSearch}
      />
      {currentItems.map((p) => (
        <Tile
          key={`${p.id}_${p.type}_tile`}
          onClick={() => handleGoToDetail(p.id, p.type)}
          icon={selectIcon(p.type)}
          section={p.section}
        />
      ))}
      <Pagination
        count={totalPageCount}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
      />
    </Grid>
  );
};

export default DashboardPanel;
