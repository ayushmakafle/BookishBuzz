import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SingleBlogCard from '../components/SingleBlogCard';

const UserBlog = () => {
  const [blogs, setBlogs] = useState([]);

  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem('userId');
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);

      if (data?.success) {
        setBlogs(data?.userBlog?.blogs || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {blogs && blogs.length > 0 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {blogs.map((blog) => (
            <SingleBlogCard
              key={blog._id}
              id={blog._id}
              isUser={true}
              title={blog.title}
              description={blog.description}
              image={blog.image && blog.image.dataUri}
              username={blog.user.username}
              time={blog.createdAt}
            />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <h2>You don't have any blogs</h2>
          <p style={{ marginBottom: '20px', marginTop: '10px' }}>We would love to read your thoughts on books!</p>
          <Link to="/create-blog">
            <button style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#f8408f', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>
              Create a Blog Now
            </button>
          </Link>
        </div>
      )}
      {!blogs || blogs.length === 0 && (
        <div style={{ textAlign: 'left', marginLeft: blogs.length > 0 ? '20px' : '0' }}>
          <img
            src="/images/isometric-young-girl-using-techn.png"
            alt="Empty blogs"
            style={{ width: '300px', marginBottom: '20px' }}
          />
        </div>
      )}
    </div>
  );
};

export default UserBlog;
