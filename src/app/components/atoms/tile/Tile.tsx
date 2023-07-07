import React from 'react';
import { Typography, Grid } from '@mui/material';
import styles from './Tile.module.scss';

interface TileProps {
  icon: React.ReactNode | undefined;
  info1: string;
  info2: string;
  info3: string;
  info4: string;
  info5: string;
  info6: string;
}

const Tile: React.FC<TileProps> = ({ info1, info2, info3, info4, info5, info6, icon }) => {

  return (
    <div className={styles.tile}>
      <div className={styles.icon}>{icon}</div>
      <div>
        <Grid container justifyContent={'space-between'} spacing={2}>
          <Grid item xs={2}>
            <Typography variant="body1">{info1}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1">{info2}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1">{info3}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1">{info4}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1">{info5}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1">{info6}</Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Tile;