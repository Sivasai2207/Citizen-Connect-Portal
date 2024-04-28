import PropTypes from 'prop-types';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

PostSearch.propTypes = {
  search: PropTypes.string,
  setSearch: PropTypes.func,
};

export default function PostSearch({ search, setSearch }) {
  return (
    <TextField
      placeholder="Search post..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Iconify
              icon="eva:search-fill"
              sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }}
            />
          </InputAdornment>
        ),
      }}
    />
  );
}
