import { Grid, Typography } from '@mui/material';
import ReportIcon from '@mui/icons-material/Report';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/atoms/button/CustomButton';

interface Props {
  text: string;
}

const NotFound: React.FC<Props> = ({ text }) => {
  const navigate = useNavigate();
  const handleGoToDashboard = (id: string | undefined, type: string) => {
    navigate('/');
  };
  return (
    <Grid data-testid="not-found-page">
      <Grid container justifyContent="center">
        <ReportIcon color="error" />
        <Typography>{text}</Typography>
      </Grid>
      <Grid container justifyContent="center">
        <CustomButton text='Go to dashboard' onPress={handleGoToDashboard}/>
      </Grid>
    </Grid>
  );
};

export default NotFound;
