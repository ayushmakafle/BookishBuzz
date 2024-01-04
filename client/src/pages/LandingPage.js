import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Check the initial login status
    const isLoggedIn = localStorage.getItem('userId');
    console.log('Initial isLoggedIn:', isLoggedIn);

    // Redirect to /login if not logged in, or /blogs if logged in
    const redirectPath = isLoggedIn ? '/blogs' : '/login';
    console.log('Redirecting to:', redirectPath);
    navigate(redirectPath);
  };

  // Log the login status when the component mounts
  React.useEffect(() => {
    const isLoggedIn = localStorage.getItem('userId');
    console.log('Component mounted. isLoggedIn:', isLoggedIn);
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="50px"
      backgroundColor="#f8408f"
      color="white"
    >
      {/* Left side - Welcome message */}
      <Box flex="1">
        <Typography variant="h2" marginBottom="20px">
          Welcome to Bookish Buzz
        </Typography>
        <Typography variant="body1">
          Bookish Buzz allows users to update blogs about various books they've read.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{ marginTop: '20px' }}
          component={Link}
          to="/login"
          onClick={handleGetStarted}
        >
          Get Started
        </Button>
      </Box>

      {/* Right side - Image */}
      <Box flex="1">
        {/* Replace the URL with the actual URL of your image */}
        <img
          src="https://placekitten.com/400/400" // Example image URL
          alt="Bookish Buzz Image"
          style={{ width: '100%', borderRadius: '10px' }}
        />
      </Box>
    </Box>
  );
};

export default LandingPage;
