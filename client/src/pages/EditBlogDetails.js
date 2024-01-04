import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';

const EditBlogDetails = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState({});
  const id = useParams().id;
  const [inputs, setInputs] = useState({});
  const [currentImage, setCurrentImage] = useState(null);

// Get blog details
const getBlogDetail = async () => {
  try {
    const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
    if (data?.success) {
      setBlog(data?.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
        image: data?.blog.image?.dataUri || null,
      });

      // Ensure that dataUri is a string
      const imageUri = typeof data?.blog.image?.dataUri === 'object'
        ? data.blog.image.dataUri.toString()
        : data?.blog.image?.dataUri || null;
      setCurrentImage(imageUri);
    }
  } catch (error) {
    console.log(error);
  }
};




  useEffect(() => {
    getBlogDetail();
  }, [id]);

  // Input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // File input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setInputs((prevState) => ({
      ...prevState,
      image: file,
    }));
    setCurrentImage(URL.createObjectURL(file)); // Display the selected image
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', inputs.title);
      formData.append('description', inputs.description);
      formData.append('image', inputs.image);

      const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (data?.success) {
        toast.success('Blog updated successfully');
        navigate('/my-blogs');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          width={'50%'}
          border={3}
          borderRadius={10}
          padding={3}
          margin='auto'
          boxShadow={'10px 10px 20px #fff5f8'}
          display='flex'
          flexDirection={'column'}
          marginTop='30px'
        >
          <Typography
            variant='h4'
            textAlign={'center'}
            fontWeight='bold'
            padding={3}
            color='#f8408f'
          >
            Edit your Blog
          </Typography>
          <InputLabel
            sx={{
              mb: 1,
              mt: 2,
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#f8408f',
            }}
          >
            Title
          </InputLabel>
          <TextField
            name='title'
            value={inputs.title}
            onChange={handleChange}
            variant='outlined'
            required
            sx={{
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#f8408f',
              },
            }}
          />
          <InputLabel
            sx={{
              mb: 1,
              mt: 2,
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#f8408f',
            }}
          >
            Description
          </InputLabel>
          <TextField
            name='description'
            value={inputs.description}
            onChange={handleChange}
            variant='outlined'
            required
            sx={{
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#f8408f',
              },
            }}
          />
          <InputLabel
            sx={{
              mb: 1,
              mt: 2,
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#f8408f',
            }}
          >
            Image
          </InputLabel>
          {currentImage && (
            <img src={currentImage}  style={{ marginBottom: '10px', maxWidth: '100%' }} />
          )}
          <input
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            style={{ marginBottom: '10px' }}
          />
          <Button
            type='submit'
            color='primary'
            variant='contained'
            sx={{
              backgroundColor: '#f8408f',
              mt: 2,
              height: '50px',
              '&:hover': { backgroundColor: '#d82776' },
            }}
          >
            UPDATE
          </Button>
        </Box>
      </form>
    </>
  );
};

export default EditBlogDetails;
