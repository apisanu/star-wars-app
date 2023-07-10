import React from 'react';
import { Typography, Grid } from '@mui/material';
import styles from './Tile.module.scss';

interface TileProps {
  icon: React.ReactNode | undefined;
  section: string[];
  onClick: () => void;
}

const Tile: React.FC<TileProps> = ({ section, icon, onClick }) => {
  return (
    <Grid
      container
      className={styles.tile}
      justifyContent={'space-between'}
      spacing={2}
      onClick={onClick}
    >
      <Grid item className={styles.cell}>
        <Typography variant="body1" className={styles.icon}>
          {icon}
        </Typography>
      </Grid>
      {section.map((item, i) => (
        <Grid item key={`${item}_${i}`} className={styles.cell}>
          <Typography variant="body1" className={styles.cellTypo}>{item}</Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default Tile;
