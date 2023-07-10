import React from "react";
import { Typography, Grid } from "@mui/material";
import styles from "./Tile.module.scss";

interface TileProps {
  icon: React.ReactNode | undefined;
  section: string[];
  onClick: () => void;
}

const Tile: React.FC<TileProps> = ({
  section,
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
        {section.map((item, i) => (
          <Grid item key={`${item}_${i}`} className={styles.cell}>
            <Typography variant="body1">{item}</Typography>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Tile;
