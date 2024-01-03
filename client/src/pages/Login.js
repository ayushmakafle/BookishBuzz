import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../redux/store';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // state
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });

    // handle input change
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    // form handle
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/v1/user/login', {
                username: inputs.name,
                email: inputs.email,
                password: inputs.password,
            });

            if (data.success) {
                dispatch(authActions.login())
                toast.success('User login successful');
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    };

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
            LOGIN
          </Typography>

          <TextField
            placeholder='Enter your email'
            value={inputs.email}
            onChange={handleChange}
            name='email'
            margin='normal'
            type='text'
            variant='outlined'
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#f8408f',
              },
            }}
          />
          <TextField
            placeholder='Enter your password'
            value={inputs.password}
            onChange={handleChange}
            name='password'
            margin='normal'
            type='password'
            variant='outlined'
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#f8408f',
              },
            }}
          />

          <Button
            type='submit'
            fullWidth
            sx={{
              borderRadius: 1,
              marginTop: 3,
              backgroundColor: '#f8408f',
              color: 'white',
              '&:hover': { backgroundColor: '#f8408f' },
            }}
          >
            Submit
          </Button>
          <Button onClick={() => navigate('/register')} sx={{ color: '#f8408f' }}>
            Not a User? Sign Up
          </Button>
        </Box>
      </form>
    </>
  );
}

export default Login
