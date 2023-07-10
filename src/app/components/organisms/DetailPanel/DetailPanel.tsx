import { Box, Grid, Paper, Skeleton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Api from '../../../../core/api/Api';
import { IGenericDetail } from '../../../../core/interfaces/IGenericDetail';
import { filterVoicesValue, mapDetail } from '../../../../utils/utils';
import CustomButton from '../../atoms/button/CustomButton';
import LeftSide from '../../atoms/leftSide/LeftSide';
import RightSide from '../../atoms/rightSide/RightSide';
import styles from './DetailPanel.module.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Props {
  id: string | undefined;
}

const DetailPanel: React.FC<Props> = ({ id }) => {
  const [value, setValue] = useState<IGenericDetail | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  let params = new URLSearchParams(window.location.search);
  const type = params.get('type');
  const navigate = useNavigate();

  useEffect(() => {
    const retrieveData = async () => {
      const response = await Api.getOne(type, id);
      setValue(mapDetail(response));
      setIsLoading(false);
    };

    retrieveData();
  }, [id, type]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sx={{ marginBottom: '1rem' }}>
        <CustomButton text="Back" onPress={handleBack}>
          <ArrowBackIcon />
        </CustomButton>
      </Grid>

      {isLoading ? (
        <Box padding={2}>
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={100}
            height={20}
            sx={{ borderRadius: '5px' }}
          />
        </Box>
      ) : (
        <Typography variant="h5" gutterBottom>
          {value?.type === filterVoicesValue.PEOPLE
            ? `${value?.title} bio`
            : `${value?.title} details`}
        </Typography>
      )}

      <Grid container spacing={2}>
        {isLoading ? (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box padding={2}>
              <Skeleton
                variant="rectangular"
                animation="wave"
                width={568}
                height={263}
                sx={{ borderRadius: '5px' }}
              />
            </Box>
            <Box padding={2}>
              <Skeleton
                variant="rectangular"
                animation="wave"
                width={568}
                height={263}
                sx={{ borderRadius: '5px' }}
              />
            </Box>
          </Grid>
        ) : (
          <>
            <Grid item xs={6}>
              <Paper elevation={3} className={styles.leftSideContainer}>
                {value?.leftHand.map((left, index) => (
                  <LeftSide
                    data={left}
                    key={`${left.key}_${index}`}
                    borderTop={index !== 0}
                  />
                ))}
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper elevation={3} className={styles.rightSideContainer}>
                <Grid container spacing={1}>
                  {value?.rightHand.map((right, index) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      key={`${right.key}_${index}`}
                    >
                      <RightSide data={right} />
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default DetailPanel;
