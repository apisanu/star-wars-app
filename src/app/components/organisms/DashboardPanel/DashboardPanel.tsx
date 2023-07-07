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

const DashboardPanel: React.FC = () => {
  const [planets, setPlanets] = useState<IPlanet[]>([]);
  const [people, setPeople] = useState<IPeople[]>([]);
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [films, setFilms] = useState<IFilm[]>([]);
  const [species, setSpecies] = useState<ISpecie[]>([]);
  const [starship, setStarship] = useState<IStarship[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

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
      setStarship(res.resources.map((m) => m.value))
    );
    Api.Films.find().then((res) => setFilms(res.resources.map((m) => m.value)));
    Api.Species.find().then((res) =>
      setSpecies(res.resources.map((m) => m.value))
    );
  }, []);

  const handleChipClick = (value: string) => {
    console.log("Chip selezionata:", value);
  };

  return (
    <Grid container justifyContent="center">
      <div className="dashboard-panel">
        <FilterChips onChipClick={handleChipClick} />
        
      </div>
    </Grid>
  );
};

export default DashboardPanel;
