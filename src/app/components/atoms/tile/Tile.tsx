import React from "react";
import { Typography, Grid } from "@mui/material";
import styles from "./Tile.module.scss";

interface TileProps {
  icon: React.ReactNode | undefined;
  info1: string;
  info2: string;
  info3: string;
  info4: string;
  info5: string;
  info6: string;
  onClick: () => void;
}

const Tile: React.FC<TileProps> = ({
  info1,
  info2,
  info3,
  info4,
  info5,
  info6,
  icon,
  onClick
}) => {
  return (
    <div className={styles.tile} onClick={onClick}>
      <div className={styles.icon}>{icon}</div>
      <Grid
        container
        className={styles.container}
        justifyContent={"space-between"}
        spacing={2}
      >
        <Grid item className={styles.cell}>
          <Typography variant="body1">{info1}</Typography>
        </Grid>
        <Grid item className={styles.cell}>
          <Typography variant="body1">{info2}</Typography>
        </Grid>
        <Grid item className={styles.cell}>
          <Typography variant="body1">{info3}</Typography>
        </Grid>
        <Grid item className={styles.cell}>
          <Typography variant="body1">{info4}</Typography>
        </Grid>
        <Grid item className={styles.cell}>
          <Typography variant="body1">{info5}</Typography>
        </Grid>
        <Grid item className={styles.cell}>
          <Typography variant="body1">{info6}</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Tile;
