import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  // Get all blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get('/api/v1/blog/all-blog');
      if (data?.success) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div style={{ margin: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {blogs &&
        blogs.map((blog) => (
            <BlogCard
              id={blog._id}
              isUser={localStorage.getItem('userId') === blog.user?._id}
              title={blog.title}
              description={blog.description}
              image={blog.image}
              username={blog.user ? blog.user.username : 'Unknown User'}
              time={blog.createdAt}
              style={{
                width: '100%',
                height: '400px', // Set your preferred fixed height for the cards
                objectFit: 'contain', // Ensure the image is fully visible
                marginBottom: '20px',
              }}
            />
        ))}
    </div>
  );
};

export default Blogs;
