import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import dayjs from 'dayjs';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

// ----------------------------------------------------------------------

export default function UserTableRow({
  userName,
  title,
  department,
  stage,
  date,
  location,
  profileUrl,
  id,
}) {
  return (
    <TableRow hover>
      <TableCell>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={userName} src={profileUrl} />
          <Typography variant="subtitle2" noWrap>
            {userName}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell align="left">{title}</TableCell>

      <TableCell align="left">{department}</TableCell>
      <TableCell align="left">
        <Label color={getStageColor(stage)}>{stage}</Label>
      </TableCell>
      <TableCell align="left">{dayjs(+date).format('ddd, DD MMM YYYY HH:mm')}</TableCell>
      <TableCell align="left">{location}</TableCell>

      <TableCell align="left">
        <Link to={`/products/${id}`}>
          <Button>
            <Iconify icon="eva:eye-fill" sx={{ mr: 2 }} />
            View
          </Button>
        </Link>
      </TableCell>
    </TableRow>
  );
}

UserTableRow.propTypes = {
  userName: PropTypes.any,
  title: PropTypes.any,
  department: PropTypes.any,
  stage: PropTypes.any,
  date: PropTypes.any,
  location: PropTypes.any,
  profileUrl: PropTypes.any,
  id: PropTypes.any,
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
