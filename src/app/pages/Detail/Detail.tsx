import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import DetailPanel from '../../components/organisms/DetailPanel/DetailPanel';

function Detail() {
  const { id } = useParams();
  return (
    <Grid data-testid="detail-page">
      <DetailPanel id={id} />
    </Grid>
  );
}

export default Detail;
