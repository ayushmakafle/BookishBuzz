import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams,useNavigate } from 'react-router-dom'
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";

const BlogDetails = () => {

    const navigate = useNavigate();
    const [blog,setBlog] = useState({})
    const id = useParams().id
    const [inputs, setInputs] = useState({});

    //get blog details
    const getBlogDetail = async() => {
        try{
            const {data} = await axios.get(`/api/v1/blog/get-blog/${id}`)
            if(data?.success){
                setBlog(data?.blog)
                setInputs({
                    title:data.blog.title,
                    description:data.blog.description,
                    image:data?.blog.image
                })
            }
        }catch(error){
            console.log(error)
    }
    }

    useEffect(() => {
        getBlogDetail()
    }, [id])

  // Input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image
      });
      if (data?.success) {
        toast.success("Blog updated successfully");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
    <form onSubmit={handleSubmit}>
      <Box
        width={"50%"}
        border={3}
        borderRadius={10}
        padding={3}
        margin="auto"
        boxShadow={"10px 10px 20px #fff5f8"}
        display="flex"
        flexDirection={"column"}
        marginTop="30px"
      >
        <Typography
          variant="h4"
          textAlign={"center"}
          fontWeight="bold"
          padding={3}
          color="#f8408f"
        >
          Edit your Blog
        </Typography>
        <InputLabel sx={{ mb: 1, mt: 2, fontSize: "20px", fontWeight: "bold", color: "#f8408f" }}>
          Title
        </InputLabel>
        <TextField
          name="title"
          value={inputs.title}
          onChange={handleChange}
          
          variant="outlined"
          required
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#f8408f", // Pink border when selected
            },
          }}
        />
        <InputLabel sx={{ mb: 1, mt: 2, fontSize: "20px", fontWeight: "bold", color: "#f8408f" }}>
          Description
        </InputLabel>
        <TextField
          name="description"
          value={inputs.description}
          onChange={handleChange}
          
          variant="outlined"
          required
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#f8408f",
            },
          }}
        />
        <InputLabel sx={{ mb: 1, mt: 2, fontSize: "20px", fontWeight: "bold", color: "#f8408f" }}>
          Image
        </InputLabel>
        <TextField
          name="image"
          value={inputs.image}
          onChange={handleChange}
          
          variant="outlined"
          required
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#f8408f",
            },
          }}
        />
        <Button
            type="submit"
            color="primary"
            variant="contained"
            sx={{ backgroundColor: "#f8408f", mt: 2, height: '50px', '&:hover': { backgroundColor: "#d82776", },}}
        >
            UPDATE
        </Button>
      </Box>
    </form>
    </>
  )
}

export default BlogDetails