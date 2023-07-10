import { Grid, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as Api from "../../../../core/api/Api";
import { IGenericDetail } from "../../../../core/interfaces/IGenericDetail";
import { mapDetail } from "../../../../utils/utils";
import LeftSide from "../../atoms/leftSide/LeftSide";
import RightSide from "../../atoms/rightSide/RightSide";
import styles from "./DetailPanel.module.scss";

interface Props {
  id: string | undefined;
}

const DetailPanel: React.FC<Props> = ({ id }) => {
  const [value, setValue] = useState<IGenericDetail | undefined>(undefined);
  let params = new URLSearchParams(window.location.search);
  const type = params.get("type");

  useEffect(() => {
    Api.getOne(type, id).then((res) => {
      //TODO Remove timeout, it's setted just to show Skeleton Element
      setTimeout(() => setValue(mapDetail(res)), 0);
    });
  }, [id, type]);

  return (
    <div className="detail-panel">
      
      <Grid container spacing={2}>
        {value ? (
          <>
            <Grid item xs={6} className={styles.leftSideContainer}>
              {value?.leftHand.map((left, index) => (
                <LeftSide data={left} key={`${left.key}_${index}`}/>
              ))}
            </Grid>
            <Grid item xs={6} className={styles.rightSideContainer}>
              {value?.rightHand.map((right, index) => (
                <RightSide data={right} key={`${right.key}_${index}`}/>
              ))}
            </Grid>
          </>
        ) : (
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={500}
            height={500}
          />
        )}
      </Grid>
    </div>
  );
};

export default DetailPanel;
