import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import moment from 'moment'


export default function BlogCard({title,description,image,username,time}) {

const formattedDate = moment(`${time}`, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format('YYYY-MM-DD HH:mm');


  return (
    <Card sx={{ width: '40%', margin:'auto',mt:2,passing:2,boxShadow:'5px 5px 10px #ccc',':hover:':{boxShadow:'10px 10px 20px #ccc'} }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username}
          </Avatar>
        }
        /* action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        } */
        title={username}
        subheader={formattedDate.toString()}
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt={title}
      />
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      
    </Card>
  );
}