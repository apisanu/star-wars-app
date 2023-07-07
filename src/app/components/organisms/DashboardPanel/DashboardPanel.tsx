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
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import Tile from "../../atoms/tile/Tile";
import { mergeArrays, selectIcon } from "../../../../utils/utils";
import { IGenericTile } from "../../../../core/interfaces/IGenericTile";

const DashboardPanel: React.FC = () => {
  const [planets, setPlanets] = useState<IPlanet[]>([]);
  const [people, setPeople] = useState<IPeople[]>([]);
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [films, setFilms] = useState<IFilm[]>([]);
  const [species, setSpecies] = useState<ISpecie[]>([]);
  const [starships, setStarships] = useState<IStarship[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilter, setCurrentFilter] = useState<IGenericTile[]>([])

  useEffect(() => {
    Api.Planets.find().then((res) =>
      setPlanets(res.resources.map((m) => m.value))
    );
    Api.People.find().then((res) =>
      setPeople(res.resources.map((m) => m.value))
    );
    Api.Vehicles.find().then((res) =>
      setVehicles(res.resources.map((m) => m.value))
    );
    Api.Starships.find().then((res) =>
      setStarships(res.resources.map((m) => m.value))
    );
    Api.Films.find().then((res) => setFilms(res.resources.map((m) => m.value)));
    Api.Species.find().then((res) =>
      setSpecies(res.resources.map((m) => m.value))
    );
  }, []);

  const handleChipClick = (value: string) => {
    setCurrentFilter(mergeArrays(planets, species, people, vehicles, films, starships).filter(i => i.type === value));
  };

  return (
    <Grid container justifyContent="center">
      <div className="dashboard-panel">
        <FilterChips onChipClick={handleChipClick} />
        {currentFilter.map((p) => (
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
      </div>
    </Grid>
  );
};

export default DashboardPanel;
