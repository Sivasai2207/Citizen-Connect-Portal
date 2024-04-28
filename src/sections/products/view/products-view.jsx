import { useContext, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { AuthContext } from 'src/context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

import AppNewsUpdate from 'src/sections/overview/app-news-update';
import ProductCard from '../product-card';

// ----------------------------------------------------------------------

export default function ProductsView() {
  const { posts, notifications } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const product = posts.find((post) => post.id === id) || null;
  // if product not found navigate to 404
  useEffect(() => {
    if (!product) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  if (!product) {
    return null;
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Products
      </Typography>

      <Grid container justifyContent="center" spacing={3} mb={3}>
        <Grid xs={12}>
          <ProductCard product={product} />
        </Grid>
      </Grid>
      <AppNewsUpdate
        title="Cases Update"
        list={notifications.filter((notification) => notification.postId === product.id)}
      />
    </Container>
  );
}
