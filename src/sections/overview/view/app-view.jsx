import { useContext } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { AuthContext } from 'src/context/AuthContext';

import AppCurrentVisits from '../app-current-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppConversionRates from '../app-conversion-rates';
import AppNewsUpdate from '../app-news-update';

// ----------------------------------------------------------------------

export default function AppView() {
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);

  const { posts, notifications } = useContext(AuthContext);
  const statusCounts = posts.reduce((counts, post) => {
    counts[post.stage] = (counts[post.stage] || 0) + 1;
    return counts;
  }, {});
  const totalNewCase = statusCounts['New case'] || 0;
  const totalConfirmed = statusCounts.Confirmed || 0;
  const totalInProgress = statusCounts['Work in progress'] || 0;
  const totalCompleted = statusCounts.Completed || 0;
  const totalRejected = statusCounts.Rejected || 0;

  const statusCountsToday = posts.reduce((counts, post) => {
    if (new Date(post.date) > oneDayAgo) {
      counts[post.stage] = (counts[post.stage] || 0) + 1;
    }
    return counts;
  }, {});
  const newCaseToday = statusCountsToday['New case'] || 0;
  const confirmedToday = statusCountsToday.Confirmed || 0;
  const inProgressToday = statusCountsToday['Work in progress'] || 0;
  const completedToday = statusCountsToday.Completed || 0;
  const rejectedToday = statusCountsToday.Rejected || 0;

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={2.4}>
          <AppWidgetSummary
            title="Registerd"
            total={totalNewCase}
            color="success"
            icon={
              <img alt="icon" src="https://img.icons8.com/?size=256&id=nWjSvuqZmzdB&format=png" />
            }
          />
        </Grid>

        <Grid xs={12} sm={6} md={2.4}>
          <AppWidgetSummary
            title="Completed"
            total={totalCompleted}
            color="info"
            icon={
              <img alt="icon" src="https://img.icons8.com/?size=256&id=csYDya6dG4uS&format=png" />
            }
          />
        </Grid>

        <Grid xs={12} sm={6} md={2.4}>
          <AppWidgetSummary
            title="In Progress"
            total={totalInProgress}
            color="warning"
            icon={
              <img alt="icon" src="https://img.icons8.com/?size=256&id=sqtFXLm3EutZ&format=png" />
            }
          />
        </Grid>

        <Grid xs={12} sm={6} md={2.4}>
          <AppWidgetSummary
            title="Confirmed"
            total={totalConfirmed}
            color="error"
            icon={
              <img alt="icon" src="https://img.icons8.com/?size=256&id=IKHOcamyNxo4&format=png" />
            }
          />
        </Grid>
        <Grid xs={12} sm={6} md={2.4}>
          <AppWidgetSummary
            title="Rejected"
            total={totalRejected}
            color="error"
            icon={
              <img alt="icon" src="https://img.icons8.com/?size=256&id=2oBwy9E7koXj&format=png" />
            }
          />
        </Grid>
        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Today's Cases"
            subheader=""
            chart={{
              series: [
                { label: 'New case', value: newCaseToday },
                { label: 'Confirmed', value: confirmedToday },
                { label: 'Completed', value: completedToday },
                { label: 'Rejected', value: rejectedToday },
                { label: 'Work in progress', value: inProgressToday },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Overall Cases"
            chart={{
              series: [
                { label: 'New case', value: totalNewCase },
                { label: 'Confirmed', value: totalConfirmed },
                { label: 'Completed', value: totalCompleted },
                { label: 'Rejected', value: totalRejected },
                { label: 'Work in progress', value: totalInProgress },
              ],
            }}
          />
        </Grid>
        <Grid xs={12}>
          <AppNewsUpdate title="Cases Update" list={notifications} more />
        </Grid>
      </Grid>
    </Container>
  );
}
