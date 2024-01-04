// UserBlog.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';

// ...

const UserBlog = () => {
  const [blogs, setBlogs] = useState([]);

  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem('userId');
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);

      if (data?.success) {
        // Update the line below to correctly access the blogs from the user object
        setBlogs(data?.userBlog?.blogs || []); 
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  useEffect(() => {
    console.log(blogs);
  }, [blogs]);

  return (
    <div>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user.username}
            time={blog.createdAt}
          />
        ))
      ) : (
        <h1>You don't have any blogs</h1>
      )}
    </div>
  );
};

export default UserBlog;

