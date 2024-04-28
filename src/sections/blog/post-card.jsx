import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';
import SvgColor from 'src/components/svg-color';
import { Stack } from '@mui/material';
import Label from 'src/components/label';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------
const departmants = {
  Water: 'https://img.icons8.com/?size=256&id=26264&format=png',
  Road: 'https://img.icons8.com/?size=256&id=DKG5EanykiIZ&format=png',

  Railways: 'https://img.icons8.com/?size=256&id=u1DomTMEHl1A&format=png',

  Electricity: 'https://img.icons8.com/?size=256&id=69682&format=png',

  Eduction: 'https://img.icons8.com/?size=256&id=12197&format=png',

  Medical: 'https://img.icons8.com/?size=256&id=EtrvEl4qafJw&format=png',

  Others: 'https://img.icons8.com/?size=256&id=13746&format=png',
};

export default function PostCard({ post, index }) {
  const navigate = useNavigate();
  const { userName, title, department, stage, date, profileUrl, image, content, id } = post;
  const latestPostLarge = false;

  const latestPost = false;

  const renderAvatar = (
    <Avatar
      alt={userName}
      src={profileUrl}
      sx={{
        zIndex: 9,
        width: 32,
        height: 32,
        position: 'absolute',
        left: (theme) => theme.spacing(3),
        bottom: (theme) => theme.spacing(-2),
        ...((latestPostLarge || latestPost) && {
          zIndex: 9,
          top: 24,
          left: 24,
          width: 40,
          height: 40,
        }),
      }}
    />
  );
  const renderDept = (
    <Avatar
      alt={userName}
      src={departmants[department]}
      sx={{
        zIndex: 9,
        width: 40,
        height: 40,
        position: 'absolute',
        right: 10,
        // left: (theme) => theme.spacing(3),
        bottom: (theme) => theme.spacing(-2.5),
        backgroundColor: '#fff',
      }}
    />
  );
  const renderTitle = (
    <Link
      color="inherit"
      variant="subtitle2"
      underline="hover"
      sx={{
        height: 44,
        overflow: 'hidden',
        WebkitLineClamp: 2,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        ...(latestPostLarge && { typography: 'h5', height: 60 }),
        ...((latestPostLarge || latestPost) && {
          color: 'common.white',
        }),
      }}
    >
      {title}
    </Link>
  );

  const renderContent = (
    <Link
      color="inherit"
      variant="subtitle2"
      underline="hover"
      sx={{
        height: 44,
        overflow: 'hidden',
        WebkitLineClamp: 2,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        ...(latestPostLarge && { typography: 'h6', height: 60 }),
        ...((latestPostLarge || latestPost) && {
          color: 'common.white',
        }),
      }}
    >
      {content}
    </Link>
  );

  const renderCover = (
    <Box
      component="img"
      alt={title}
      src={image}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderDate = (
    <Stack
      direction="row"
      flexWrap="wrap"
      spacing={1.5}
      sx={{
        mb: 1.5,
        ...((latestPostLarge || latestPost) && {
          color: 'common.white',
        }),
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography
        variant="caption"
        component="div"
        sx={{
          mb: 2,
          color: 'text.disabled',
          ...((latestPostLarge || latestPost) && {
            opacity: 0.48,
            color: 'common.white',
          }),
        }}
      >
        {fDate(date)}
      </Typography>
      <Label color={getStageColor(stage)}>{stage}</Label>
    </Stack>
  );

  const renderShape = (
    <SvgColor
      color="paper"
      src="/assets/icons/shape-avatar.svg"
      sx={{
        width: 80,
        height: 36,
        zIndex: 9,
        bottom: -15,
        position: 'absolute',
        color: 'background.paper',
        ...((latestPostLarge || latestPost) && { display: 'none' }),
      }}
    />
  );

  return (
    <Grid xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      <Card
        onClick={() => {
          navigate(`/products/${id}`);
        }}
        sx={{
          cursor: 'pointer',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            pt: 'calc(100% * 3 / 4)',
            ...((latestPostLarge || latestPost) && {
              pt: 'calc(100% * 4 / 3)',
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
            }),
            ...(latestPostLarge && {
              pt: {
                xs: 'calc(100% * 4 / 3)',
                sm: 'calc(100% * 3 / 4.66)',
              },
            }),
          }}
        >
          {renderShape}

          {renderAvatar}
          {renderDept}

          {renderCover}
        </Box>

        <Box
          sx={{
            p: (theme) => theme.spacing(4, 3, 3, 3),
            ...((latestPostLarge || latestPost) && {
              width: 1,
              bottom: 0,
              position: 'absolute',
            }),
          }}
        >
          {renderDate}
          {renderTitle}
          {renderContent}
        </Box>
      </Card>
    </Grid>
  );
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};
const getStageColor = (stage) => {
  const mapStage = {
    'Ready for Completion': 'success',
    Completed: 'success',
    'Work in progress': 'warning',
    'New case': 'info',
    Rejected: 'error',
    Confirmed: 'secondary',
  };
  return mapStage[stage];
};
