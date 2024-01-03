import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {Box,Typography,TextField,Button} from '@mui/material'

const Register = () => {
    
    const navigate = useNavigate()

    //state
    const [inputs , setInputs] = useState({
        name : '',
        email : '',
        password: ''
    })

    //handle input change
    const handleChange = (e) => {
        setInputs(prevState=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    //form handle
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(inputs)
    }


  return (
    <>
    <form onSubmit={handleSubmit}>
      <Box
      maxWidth={450}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      margin='auto'
      boxShadow={'10px 10px 20px #ccc'}
      padding={3}
      borderRadius={5}
      sx={{ backgroundColor: 'white', '& .MuiTextField-root': { margin: '8px' } }}
    >
      <Typography variant='h4' padding={3} textAlign={'center'}>
        SIGN UP
      </Typography>

      <TextField
        placeholder='Enter your name'
        value = {inputs.name}
        onChange={handleChange}
        name='name'
        margin='normal'
        type='text'
        variant='outlined'
        fullWidth
        sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#f8408f' } }}
      />
      <TextField
        placeholder='Enter your email'
        value={inputs.email}
        onChange={handleChange}
        name='email'
        margin='normal'
        type='text'
        variant='outlined'
        fullWidth
        sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#f8408f' } }}
      />
      <TextField
        placeholder='Enter your password'
        value = {inputs.password}
        onChange={handleChange}
        name='password'
        margin='normal'
        type='password'
        variant='outlined'
        fullWidth
        sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#f8408f' } }}
      />

      <Button type='submit' fullWidth sx={{ borderRadius: 1, marginTop: 3, backgroundColor: '#f8408f', color: 'white', '&:hover': {backgroundColor: '#f8408f' }, }} >
        Submit
      </Button>
      <Button onClick={()=>navigate('/login')} sx={{ color: '#f8408f' }}>
        Already Registered? Login</Button>
    </Box>
    </form>
    </>
  )
}

export default Register
