import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { Box, IconButton, Button } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const SingleBlogCard = ({ title, image, username, time, id, isUser }) => {
  const navigate = useNavigate();
  const formattedDate = moment(time).format('YYYY-MM-DD HH:mm:ss');

  const handleEdit = () => {
    navigate(`/edit-blog-details/${id}`);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
        toast.success('Blog deleted successfully');
        navigate('/my-blogs');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewMore = () => {
    navigate(`/blog-detail/${id}`);
  };

  return (
    <Card sx={{ width: '100%', margin: 'auto', mt: 2, padding: 2, boxShadow: '5px 5px 10px #ccc', ':hover:': { boxShadow: '10px 10px 20px #ccc' } }}>
      
      {isUser && (
        <Box display={'flex'}>
          <IconButton onClick={handleEdit} sx={{ marginLeft: 'auto' }}>
            <EditIcon sx={{ color: '#f8408f' }} />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteForeverIcon sx={{ color: '#f8408f' }} />
          </IconButton>
        </Box>
      )}

      <CardHeader title={username} subheader={formattedDate} />
      
      {image && (
        <CardMedia 
          component="img" 
          height="150" 
          image={image} 
          alt={title} 
          sx={{ objectFit: 'contain' }} 
        />
      )}
      
      <CardContent>

        <Typography variant="h5" color="#f8408f" sx={{ marginBottom: '8px' }}>
          {title}
        </Typography>
    
        <Button 
          variant="outlined" 
          style={{ color: '#f8408f', borderColor: '#f8408f', marginLeft: 'auto', marginTop: '10px' }} 
          onClick={handleViewMore}
        >
          View More
        </Button>

      </CardContent>
    </Card>
  );
};

export default SingleBlogCard;
