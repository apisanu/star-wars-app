import React, { useEffect, useState } from "react";
import * as Api from "../../../../core/api/Api";
import _ from "lodash";
import { IFilm } from "../../../../core/interfaces/IFilm";
import { IPeople } from "../../../../core/interfaces/IPeople";
import { IPlanet } from "../../../../core/interfaces/IPlanet";
import { ISpecie } from "../../../../core/interfaces/ISpecie";
import { IStarship } from "../../../../core/interfaces/IStarship";
import { IVehicle } from "../../../../core/interfaces/IVehicle";
import CustomButton from "../../atoms/button/CustomButton";
import Navbar from "../../molecules/navbar/Navbar";

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

  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return <div className="dashboard-panel">
    <CustomButton text="Toggle Navbar" onPress={handleToggle}></CustomButton>
    <Navbar open={open} onClose={handleToggle} />
  </div>;
};

export default DashboardPanel;
