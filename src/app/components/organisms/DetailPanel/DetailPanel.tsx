import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Api from "../../../../core/api/Api";
import { IFilm } from "../../../../core/interfaces/IFilm";
import { IPeople } from "../../../../core/interfaces/IPeople";
import { IPlanet } from "../../../../core/interfaces/IPlanet";
import { ISpecie } from "../../../../core/interfaces/ISpecie";
import { IStarship } from "../../../../core/interfaces/IStarship";
import { IVehicle } from "../../../../core/interfaces/IVehicle";
import { filterVoicesValue } from "../../../../utils/utils";

interface Props {
  id: string | undefined
}

const DetailPanel: React.FC<Props> = ({id}) => {
  const [planets, setPlanets] = useState<IPlanet[]>([]);
  let params = new URLSearchParams(window.location.search);
  const type = params.get('type');

  useEffect(() => {
    Api.getOne(type, id);
  }, []);

  return <div className="detail-panel"></div>;
};

export default DetailPanel;
