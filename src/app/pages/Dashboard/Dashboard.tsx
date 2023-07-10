import { Grid } from '@mui/material';
import DashboardPanel from '../../components/organisms/DashboardPanel/DashboardPanel';

function Dashboard() {
  return (
    <Grid data-testid="dashboard-page">
      <DashboardPanel />
    </Grid>
  );
}

export default Dashboard;
