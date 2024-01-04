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
  <Typography variant="h6" marginBottom="3px" color="white">
    <span style={{ color: '#fcadcf', fontSize: '1.2em', fontWeight: 'bold', marginBottom: '0', padding: '0' }}>
      <Typography component="h3" variant="h3" style={{ color: 'white', margin: 0 }}>
        Discover,
      </Typography>
    </span>{' '}
    <br />
    <span style={{ color: '#fcadcf', fontSize: '1.2em', fontWeight: 'bold', marginBottom: '0', padding: '0' }}>
      <Typography component="h3" variant="h3" style={{ color: 'white', margin: 0 }}>
        Connect,
      </Typography>
    </span>{' '}
    <br />
    <span style={{ color: '#fcadcf', fontSize: '1.2em', fontWeight: 'bold', marginBottom: '0', padding: '0' }}>
      <Typography component="h3" variant="h3" style={{ color: 'white', margin: 0 }}>
        Share
      </Typography>
    </span>{' '}
    <br />
    your Bookish Tales <br />
    Join the Buzz at Bookish Buzz!
  </Typography>

  <Button
    variant="contained"
    color="secondary"
    size="large"
    sx={{
      marginTop: '20px',
      backgroundColor: 'white',
      color: '#f8408f',
      '&:hover': {
      backgroundColor: '#fce4ec', 
    },
    }}
    onClick={handleGetStarted}
  >
    Get Started
  </Button>
</Box>


    {/* Right side - Image */}
    <Box flex="1">
      
      <img
        src="/images/cute-girl-reading-book-illustrat.png" 
        alt="Bookish Buzz Image"
        style={{ width: '100%', maxWidth: '500px', borderRadius: '10px' }}
      />
    </Box>
  </Box>
);

};

export default LandingPage;
