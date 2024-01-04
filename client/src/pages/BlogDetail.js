import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
  const [blog, setBlog] = useState({});
  const { id } = useParams();

  // Get blog details
  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
      if (data?.success) {
        setBlog(data?.blog);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetail();
  }, [id]);

  // Function to convert buffer data to data URL
  const bufferToDataUrl = (buffer) => {
    const binary = new Uint8Array(buffer).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ''
    );
    return `data:image/jpeg;base64,${btoa(binary)}`;
  };

  return (
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
        Blog Details
      </Typography>
      <Typography variant='h5'>{blog.title}</Typography>
      <Typography variant='body1'>{blog.description}</Typography>
      {blog.image && (
        <img
          src={bufferToDataUrl(blog.image.data)}
          alt={blog.title}
          style={{ marginBottom: '10px', maxWidth: '100%' }}
        />
      )}
    </Box>
  );
};

export default BlogDetail;
