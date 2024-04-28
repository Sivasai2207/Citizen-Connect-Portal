import { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { AuthContext } from 'src/context/AuthContext';
import { Navigate } from 'react-router-dom';

import Nav from './nav';
import Main from './main';
import Header from './header';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);
  const { user } = useContext(AuthContext);
  // if user is undefined, return null if user is null return login page
  if (user === undefined) return null;
  if (user === null) return <Navigate to="/login" />;

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main>{children}</Main>
      </Box>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
