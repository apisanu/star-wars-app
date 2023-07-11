import { Box, Typography } from '@mui/material';
import { RightHand } from '../../../../core/interfaces/IGenericDetail';
import styles from './RightSide.module.scss';

interface Props {
  data: RightHand;
}

const RightSide: React.FC<Props> = ({ data }) => {
  return (
    <Box width={4}>
      <Typography
        variant="body1"
        sx={{ fontWeight: 'bold' }}
        className={styles.rightHandCell}
      >
        {data.key}
      </Typography>
      {Array.isArray(data.values) ? (
        data.values.map((el, index) => (
          <Typography variant="subtitle1" key={`${el[1]}_${index}}`} className={(styles.rightHandCell, styles.rightHandCellArray)}>
            {el}
          </Typography>
        ))
      ) : (
        <Typography variant="body1" className={styles.rightHandCell}>
          {data.values}
        </Typography>
      )}
    </Box>
  );
};

export default RightSide;
