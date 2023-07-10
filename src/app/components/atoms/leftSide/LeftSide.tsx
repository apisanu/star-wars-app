import { Box, Typography } from '@mui/material';
import { LeftHand } from '../../../../core/interfaces/IGenericDetail';
import styles from './LeftSide.module.scss';

interface Props {
  data: LeftHand;
  borderTop: boolean
}

const LeftSide: React.FC<Props> = ({ data, borderTop }) => {
  return (
    <Box display="flex" justifyContent="space-between" className={borderTop ? styles.borderTop : ''}>
      <Typography
        variant="body1"
        sx={{ fontWeight: 'bold' }}
        className={styles.leftHandCell}
      >
        {data.key}
      </Typography>
      <Typography variant="body1" className={styles.leftHandCell}>
        {data.value}
      </Typography>
    </Box>
  );
};

export default LeftSide;
