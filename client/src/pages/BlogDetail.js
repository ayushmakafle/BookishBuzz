import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useNavigate } from 'react-router-dom';

const BlogDetail = () => {
  const [blog, setBlog] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

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
      width={'80%'}
      border={3}
      borderRadius={10}
      padding={3}
      margin='auto'
      boxShadow={'10px 10px 20px #fff5f8'}
      display='flex'
      flexDirection={'column'}
      marginTop='30px'
      marginBottom={'10px'}
    >
      {/* Back button */}
      <IconButton
        onClick={() => navigate(-1)}
        style={{ alignSelf: 'flex-start', color: '#f8408f' }}
      >
        <ArrowBackIcon />
      </IconButton>

      {/* Blog Details */}
      <Box textAlign={'center'}>
        <Typography variant='h4' fontWeight='bold' color='#f8408f'>
          {blog.title}
        </Typography>
        

        {/* User Info */}
        <Box mt={2} display='flex' justifyContent='space-between'>
          <Typography variant='body1' color='black'>
            Author: {blog.user?.username}
          </Typography>
          <Typography variant='body2' color='black'>
            {new Date(blog.createdAt).toLocaleString()}
          </Typography>
        </Box>

        {/* Blog Image */}
        {blog.image && (
          <img
            src={bufferToDataUrl(blog.image.data)}
            alt={blog.title}
            style={{ marginBottom: '10px', maxWidth: '100%' }}
          />
        )}

        <Typography variant='body1'>{blog.description}</Typography>
      </Box>
    </Box>
  );
};

export default BlogDetail;
