import { Grid, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Api from '../../../../core/api/Api';
import { IGenericDetail } from '../../../../core/interfaces/IGenericDetail';
import { mapDetail } from '../../../../utils/utils';
import CustomButton from '../../atoms/button/CustomButton';
import LeftSide from '../../atoms/leftSide/LeftSide';
import RightSide from '../../atoms/rightSide/RightSide';
import styles from './DetailPanel.module.scss';

interface Props {
  id: string | undefined;
}

const DetailPanel: React.FC<Props> = ({ id }) => {
  const [value, setValue] = useState<IGenericDetail | undefined>(undefined);
  let params = new URLSearchParams(window.location.search);
  const type = params.get('type');
  const navigate = useNavigate();

  useEffect(() => {
    Api.getOne(type, id).then((res) => {
      setValue(mapDetail(res));
    });
  }, [id, type]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Grid justifyContent="center">
      <Grid spacing={4}>
        <CustomButton text="Back" onPress={handleBack} />
      </Grid>
      <Grid container spacing={2}>
        {value ? (
          <>
            <Grid item xs={6} className={styles.leftSideContainer}>
              {value?.leftHand.map((left, index) => (
                <LeftSide data={left} key={`${left.key}_${index}`} />
              ))}
            </Grid>
            <Grid item xs={6} className={styles.rightSideContainer}>
              {value?.rightHand.map((right, index) => (
                <RightSide data={right} key={`${right.key}_${index}`} />
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
    </Grid>
  );
};

export default DetailPanel;
