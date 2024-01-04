import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from './BlogCard';

const UserBlog = () => {
  const [blogs, setBlogs] = useState([]);

  // get blogs of the user
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem('userId');
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
      console.log(data);
      if (data?.success) {
        setBlogs(data?.UserBlog);
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
            key={blog._id} // Make sure to add a unique key for each mapped item
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
