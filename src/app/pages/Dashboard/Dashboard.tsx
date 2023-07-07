import React, { useEffect, useState } from "react";
import * as Api from "../../../core/api/Api";
import _ from "lodash";
import { IPlanet } from "../../../core/interfaces/IPlanet";
import { IPeople } from "../../../core/interfaces/IPeople";
import { IVehicle } from "../../../core/interfaces/IVehicle";
import { IFilm } from "../../../core/interfaces/IFilm";
import { ISpecie } from "../../../core/interfaces/ISpecie";
import { IStarship } from "../../../core/interfaces/IStarship";
import DashboardPanel from "../../components/organisms/DashboardPanel/DashboardPanel";

function Dashboard() {
  const [planets, setPlanets] = useState<IPlanet[]>([]);
  const [people, setPeople] = useState<IPeople[]>([]);
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [films, setFilms] = useState<IFilm[]>([]);
  const [species, setSpecies] = useState<ISpecie[]>([]);
  const [starship, setStarship] = useState<IStarship[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    Api.Planets.find().then((res) => setPlanets(res.resources.map((m) => m.value)));
    Api.People.find().then((res) => setPeople(res.resources.map((m) => m.value)));
    Api.Vehicles.find().then((res) => setVehicles(res.resources.map((m) => m.value)));
    Api.Starships.find().then((res) => setStarship(res.resources.map((m) => m.value)));
    Api.Films.find().then((res) => setFilms(res.resources.map((m) => m.value)));
    Api.Species.find().then((res) => setSpecies(res.resources.map((m) => m.value)));
  }, []);

  return <div className="dashboard">
    <DashboardPanel/>
  </div>;
}

export default Dashboard;
