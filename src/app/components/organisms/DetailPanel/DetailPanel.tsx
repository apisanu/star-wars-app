import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Api from "../../../../core/api/Api";
import { IFilm } from "../../../../core/interfaces/IFilm";
import { IGenericDetail } from "../../../../core/interfaces/IGenericDetail";
import { IPeople } from "../../../../core/interfaces/IPeople";
import { IPlanet } from "../../../../core/interfaces/IPlanet";
import { ISpecie } from "../../../../core/interfaces/ISpecie";
import { IStarship } from "../../../../core/interfaces/IStarship";
import { IVehicle } from "../../../../core/interfaces/IVehicle";
import { filterVoicesValue, mapDetail } from "../../../../utils/utils";

interface Props {
  id: string | undefined;
}

const DetailPanel: React.FC<Props> = ({ id }) => {
  const [value, setValue] = useState<IGenericDetail | undefined>(undefined);
  let params = new URLSearchParams(window.location.search);
  const type = params.get("type");

  useEffect(() => {
    Api.getOne(type, id).then((res) => {
      setValue(mapDetail(res));
    });
  }, []);

  return (
    <div className="detail-panel">
      <div>
      {value?.leftHand.map((left, index) => (
        <div key={`${left.key}_${index}`}>
          <div>{left.key}</div>
          <div>{left.value}</div>
        </div>
      ))}
      </div>
      <div>
      {value?.rightHand.map((right, index) => (
        <div key={`${right.key}_${index}`}>
          <div>{right.key}</div>
          <div>{right.values}</div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default DetailPanel;
