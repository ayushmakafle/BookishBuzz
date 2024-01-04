import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'

const CreateBlog = () => {

    const [inputs,setInputs] = useState({
        title : '',
        description:'',
        image:''
    })

    //form
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(inputs)
    }

  return (
    <>
        <form onSubmit={handleSubmit}>
            <Box width={'80%'} border={3} borderRadius={10} padding={3} margin="auto" boxShadow={"10px 10px 10px #ccc"} display={'flex'} flexDirection={'column'}>
                <Typography variant='h2' text-align={'center'} fontWeight={'bold'} padding={3} color='gray'>
                    Create a Blog
                </Typography>
            </Box>
        </form>
    </>
  )
}

export default CreateBlog
