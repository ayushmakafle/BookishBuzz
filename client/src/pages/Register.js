import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from '@mui/material';
import axios from 'axios';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Register = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    showPassword: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    // Clear validation errors on input change
    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: '',
    }));
  };

  const handleClickShowPassword = () => {
    setInputs((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!inputs.email || !emailRegex.test(inputs.email)) {
      newErrors.email = 'Enter a valid email address';
      valid = false;
    }


     const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[?.,!]).{8,}$/;
     if (!inputs.password || !passwordRegex.test(inputs.password)) {
      newErrors.password =
        'Password must have at least one uppercase letter, one number, one special character (?, ., or !), and be at least 8 characters long';
        valid = false;
      }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const { data } = await axios.post('/api/v1/user/register', {
          username: inputs.name,
          email: inputs.email,
          password: inputs.password,
        });

        if (data.success) {
          toast.success('User registration successful');
          navigate('/login');
        }
      } catch (error) {
        console.error(error);
      }
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
          marginTop={'10px'}
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
            value={inputs.name}
            onChange={handleChange}
            name='name'
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
            placeholder='Enter your email'
            value={inputs.email}
            onChange={handleChange}
            name='email'
            margin='normal'
            type='text'
            variant='outlined'
            fullWidth
            error={!!errors.email}
            helperText={errors.email}
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
            type={inputs.showPassword ? 'text' : 'password'}
            variant='outlined'
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {inputs.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={!!errors.password}
            helperText={errors.password}
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
          <Button onClick={() => navigate('/login')} sx={{ color: '#f8408f' }}>
            Already Registered? Login
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Register;
