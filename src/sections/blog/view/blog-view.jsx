import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { useContext, useState } from 'react';

import { AuthContext } from 'src/context/AuthContext';

import PostCard from '../post-card';
import PostSearch from '../post-search';

// ----------------------------------------------------------------------

export default function BlogView() {
  const { posts } = useContext(AuthContext);
  const [search, setSearch] = useState('');

  // filter post by search
  const filterPosts = posts.filter((post) =>
    JSON.stringify(post).toLowerCase().includes(search.toLowerCase())
  );
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Blog</Typography>
      </Stack>

      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        <PostSearch search={search} setSearch={setSearch} />
      </Stack>

      <Grid container spacing={3}>
        {filterPosts.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </Grid>
    </Container>
  );
}
