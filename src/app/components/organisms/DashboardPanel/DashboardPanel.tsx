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
import { Box, Grid, Pagination, Skeleton } from '@mui/material';
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
  const [resetSearch, setResetSearch] = useState(0);
  const [currentFilter, setCurrentFilter] = useState<IGenericTile[]>([]);
  const [standardCurrentFilter, setStandardCurrentFilter] = useState<
    IGenericTile[]
  >([]);
  const [defaultFilter, setDefaultFilter] = useState<IGenericTile[] | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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
        const totalPages = Math.ceil(mergedData.length / ITEMS_PER_PAGE);
        setTotalPages(totalPages);
      }
    );
  }, []);

  const handleChipClick = (value: string) => {
    setResetSearch(1);
    setCurrentPage(1);

    if (value === filterVoicesValue.ALL) {
      setCurrentFilter(defaultFilter as IGenericTile[]);
      setStandardCurrentFilter(defaultFilter as IGenericTile[]);
    } else {
      const filtered = mergeArrays(
        planets,
        species,
        people,
        vehicles,
        films,
        starships
      ).filter((i) => i.type === value);
      setCurrentFilter(filtered);
      setStandardCurrentFilter(filtered);
      const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
      setTotalPages(totalPages);
    }
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

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const getCurrentItems = (): IGenericTile[] => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return currentFilter.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const skeletons: JSX.Element[] = Array.from({ length: 10 }).map(
    (val, index) => (
      <Box key={index} padding={2}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={1160}
          height={49}
          sx={{ borderRadius: '5px' }}
        />
      </Box>
    )
  );

  return (
    <Grid
      container
      justifyContent="center"
      className={styles.dashboardContainer}
      data-testid="dashboard-panel"
    >
      <Grid item data-testid="filter-chips">
        <FilterChips onChipClick={handleChipClick} />
      </Grid>
      <Grid item data-testid="filter-chips">
        <Search
          data={currentFilter}
          dataStandard={standardCurrentFilter}
          reset={resetSearch}
          onSearchResult={handleSearch}
        />
      </Grid>
      {defaultFilter === null ? (
        <Grid item xs={12} container justifyContent="center" data-testid="tile">
          {skeletons}
        </Grid>
      ) : (
        <Grid item xs={12} container justifyContent="center" data-testid="tile">
          {getCurrentItems().map((p) => (
            <Tile
              key={`${p.id}_${p.type}_tile`}
              onClick={() => handleGoToDetail(p.id, p.type)}
              icon={selectIcon(p.type)}
              section={p.section}
            />
          ))}
        </Grid>
      )}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
      />
    </Grid>
  );
};

export default DashboardPanel;
