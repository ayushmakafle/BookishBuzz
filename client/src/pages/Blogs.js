import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BlogCard from '../components/BlogCard'

const Blogs = () => {

    const [blogs,setBlogs] = useState([])

    //get all blogs
    const getAllBlogs = async () => {
        try{
            const {data} = await axios.get('/api/v1/blog/all-blog')
            if(data?.success){
                setBlogs(data.blogs)
            }
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getAllBlogs();
    },[])

  return (
    <div style={{ margin: '30px' }}>
        {blogs && blogs.map(blog => (
            <BlogCard 
                id = {blog._id}
                isUser = {localStorage.getItem('userId') === blog.user?._id}
                title={blog.title}
                description = {blog.description}
                image = {blog.image}
                username={blog.user ? blog.user.username : 'Unknown User'}
                time = {blog.createdAt}
            />
        ))}
    </div>
  )
}

export default Blogs
