/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// eslint-disable-next-line import/no-extraneous-dependencies
import dayjs from 'dayjs';
import Label from 'src/components/label';
import {
  Avatar,
  Button,
  CardHeader,
  FormControl,
  FormHelperText,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
// import AppOrderTimeline from '../overview/app-order-timeline';
// import { faker } from '@faker-js/faker';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from 'src/firebase/firebase';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Carousel } from 'react-responsive-carousel';

import { doc, setDoc, updateDoc } from 'firebase/firestore';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
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

export default function ShopProductCard({ product }) {
  const { stage, image, title, department, date, location, profileUrl, content, userName, images } =
    product;
  const [loading, setLoading] = useState(false);
  console.log(images);

  const [theDepartment, setDepartment] = useState(department);
  const [remark, setRemark] = useState('');
  const [theUpdateDoc, setUpdateDoc] = useState(false);

  const [theStage, setStage] = useState(stage);
  const handleChange = (event) => {
    setUpdateDoc(false);

    setDepartment(event.target.value);
  };
  const handleChangeStage = (event) => {
    setUpdateDoc(false);

    setStage(event.target.value);
  };

  const isChanged = theDepartment !== department || theStage !== stage;

  const reason =
    // eslint-disable-next-line no-nested-ternary
    theDepartment !== department && theStage !== stage
      ? ' department and stage'
      : theDepartment !== department
      ? ' department'
      : ' stage';

  // eslint-disable-next-line consistent-return
  const handleChangeUpdate = async () => {
    if (!remark) return alert('Please provide a reason for the change');
    let theContent;
    setLoading(true);
    // if stage is changed update the stage value to the new value also update the department value if it is changed
    if (theDepartment !== department && theStage !== stage) {
      theContent = `<p>The department of the case has been changed from <strong>${department}</strong> to <strong>${theDepartment}</strong> and the stage has been changed from <strong>${stage}</strong> to <strong>${theStage}</strong></p>`;
    } else if (theStage !== stage) {
      theContent = `<p>The stage of the case has been changed from <strong>${stage}</strong> to <strong>${theStage}</strong></p>`;
    } else if (theDepartment !== department) {
      theContent = `<p>The department of the case has been changed from <strong>${department}</strong> to <strong>${theDepartment}</strong></p>`;
    }

    const { success } = await addNotification(
      {
        postId: product.id,
        sender: 'admin',
        recipient: userName,
        read: false,
        type: 'status',
        createdAt: Date.now(),
        theContent,
        remark,
        title,
        image,
        department: theDepartment,
      },
      product.id
    );

    if (success) {
      const { success: successUpdate } = await updatePost(product.id, {
        department: theDepartment,
        stage: theStage,
      });
      if (successUpdate) {
        setUpdateDoc(true);
        setRemark('');
      }
    }
    setLoading(false);
  };
  const renderStatus = (
    <Label
      variant="filled"
      color={getStageColor(theStage)}
      sx={{
        zIndex: 9,
        top: 16,
        left: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      {theStage}
    </Label>
  );
  const renderImg = (
    <Carousel>
      {images?.length > 0 ? (
        images.map((img) => (
          <img
            src={img}
            alt="product"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ))
      ) : (
        <img
          src={image}
          alt="product"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      )}
    </Carousel>
  );

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        height: '100%',
        minHeight: 480,
        borderRadius: 2,
        gap: 2,
      }}
    >
      <Box sx={{ width: '50%', height: '100%', position: 'relative' }}>
        {renderStatus}

        {renderImg}
      </Box>
      <Stack spacing={2} sx={{ flex: 1, px: 1.5, py: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <CardHeader
            sx={{
              position: 'relative',
              pl: 0,
            }}
            avatar={
              <Avatar aria-label="recipe" src={profileUrl}>
                R
              </Avatar>
            }
            title={userName}
            subheader={dayjs(date).format('ddd, MMM DD, YYYY, HH:mm A')}
          />
          <img
            src={departmants[theDepartment]}
            alt="department"
            style={{
              width: 50,
              height: 50,
              marginTop: 10,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          />
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
          sx={{
            mb: -1,
            mt: -1,
          }}
        >
          <Link variant="caption">{location}</Link>
        </Stack>

        <Typography variant="h5">{title}</Typography>

        <Typography variant="body1">{content}</Typography>

        <Stack direction="row" spacing={2} sx={{}}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Department</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={theDepartment}
              defaultValue={department}
              label="Department"
              onChange={handleChange}
            >
              <MenuItem value="Water">Water</MenuItem>
              <MenuItem value="Road">Road</MenuItem>
              <MenuItem value="Railways">Railways</MenuItem>
              <MenuItem value="Electricity">Electricity</MenuItem>
              <MenuItem value="Eduction">Eduction</MenuItem>
              <MenuItem value="Medical">Medical</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Stage</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={theStage}
              defaultValue={stage}
              label="Stage"
              onChange={handleChangeStage}
            >
              <MenuItem value="New case">New case</MenuItem>
              <MenuItem value="Confirmed">Confirmed</MenuItem>
              <MenuItem value="Work in progress">Work in progress</MenuItem>
              <MenuItem value="Ready for Completion">Ready for Completion</MenuItem>
              <MenuItem value="Completed" disabled>
                Completed
              </MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        {isChanged && !theUpdateDoc && (
          <>
            <FormControl fullWidth>
              <FormHelperText sx={{ mb: 1 }}>
                Reason for changing the
                {reason}
              </FormHelperText>
              <TextField
                id="outlined-multiline-flexible"
                label="Remark"
                multiline
                rows={3}
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
              />
            </FormControl>
            <Stack direction="row" spacing={2} sx={{}}>
              <Button variant="contained" fullWidth onClick={handleChangeUpdate}>
                Update
              </Button>
              <Button
                variant="contained"
                fullWidth
                color="error"
                onClick={() => {
                  setDepartment(department);
                  setStage(stage);
                  setRemark('');
                }}
              >
                Cancel
              </Button>
            </Stack>
            {loading && <LinearProgress />}
          </>
        )}
      </Stack>
    </Card>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
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

const addNotification = async (notificationData, postId) => {
  try {
    await setDoc(
      doc(db, 'notifications', `${postId}|${Date.now().toString(36)}`),
      notificationData
    );

    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false, msg: e.message };
  }
};

export const updatePost = async (id, data) => {
  try {
    const userRef = doc(db, 'posts', id);
    await updateDoc(userRef, {
      ...data,
    });
    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false, msg: e.message };
  }
};
