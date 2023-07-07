import React from 'react';
import { makeStyles } from '@mui/styles';
import { Typography, Grid } from '@mui/material';

const useStyles = makeStyles({
  tile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  icon: {
    marginRight: '16px',
  },
});

interface TileProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  info1: string;
  info2: string;
  info3: string;
  info4: string;
}

const Tile: React.FC<TileProps> = ({ icon, title, subtitle, info1, info2, info3, info4 }) => {
  const classes = useStyles();

  return (
    <div className={classes.tile}>
      <div className={classes.icon}>{icon}</div>
      <div>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="subtitle1">{subtitle}</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1">{info1}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{info2}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{info3}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{info4}</Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Tile;