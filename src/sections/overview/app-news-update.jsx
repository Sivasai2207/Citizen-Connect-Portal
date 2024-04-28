import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

import { fToNow } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// ----------------------------------------------------------------------

export default function AppNewsUpdate({ title, subheader, list, more, ...other }) {
  const [all, setAll] = useState(more);

  const handleMore = () => {
    setAll(!all);
  };

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {list.slice(0, all === true ? 5 : list.length).map((news) => (
            <NewsItem key={news.id} news={news} />
          ))}
        </Stack>
      </Scrollbar>

      <Divider sx={{ borderStyle: 'dashed' }} />

      {more && (
        <Box sx={{ p: 2, textAlign: 'right' }} onClick={handleMore}>
          <Button
            size="small"
            color="inherit"
            endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
          >
            {all === true ? 'Show more' : 'Show less'}
          </Button>
        </Box>
      )}
    </Card>
  );
}

AppNewsUpdate.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
  more: PropTypes.bool,
};

// ----------------------------------------------------------------------

function NewsItem({ news }) {
  const { postId, title, remark, image, theContent, createdAt } = news;
  const navigate = useNavigate();
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={title}
        src={image}
        sx={{ width: 60, height: 60, borderRadius: 1.5, flexShrink: 0 }}
      />

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Typography
          variant="caption"
          sx={{ display: 'block', color: 'green', mb: -1.75 }}
          dangerouslySetInnerHTML={{ __html: theContent }}
        />
        <Link
          color="inherit"
          variant="subtitle2"
          underline="hover"
          noWrap
          sx={{
            cursor: 'pointer',
          }}
          onClick={() => navigate(`/products/${postId}`)}
        >
          {title}
        </Link>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {remark}
        </Typography>
      </Box>

      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {fToNow(createdAt)}
      </Typography>
    </Stack>
  );
}

NewsItem.propTypes = {
  news: PropTypes.shape({
    postId: PropTypes.string,
    title: PropTypes.string,
    remark: PropTypes.string,
    image: PropTypes.string,
    theContent: PropTypes.string,
    sender: PropTypes.string,
    recipient: PropTypes.string,
    read: PropTypes.bool,
    type: PropTypes.string,
    createdAt: PropTypes.number,
  }),
};
