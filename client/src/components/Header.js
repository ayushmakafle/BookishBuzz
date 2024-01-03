import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Button, Typography,Tabs,Tab } from '@mui/material';
import { Link , useNavigate} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { authActions } from '../redux/store';
import { toast } from 'react-toastify';


const Header = () => {

    const navigate = useNavigate()

    //global state
    const isLogin = useSelector((state) => state.isLogin)
    const dispatch = useDispatch()
    console.log(isLogin)
    //states
    const [value,setValue]= useState()

    //logout 
    const handleLogout = () => {
        try{
            dispatch(authActions.logout())
            toast.success('Logout successful')
            navigate('/login')
        }catch(error){
            console.log(error)
        }
    }
    
  return (
    <>
      <AppBar position='sticky' sx={{ background: '#f8408f'  }}>
        <Toolbar>
          <Typography variant='h4' sx={{ flexGrow: 1, color: 'white' }}>
            Bookish Buzz
          </Typography>
          {isLogin && (
            <Box display={'flex'} marginLeft='auto' marginRight={'auto'}>
            <Tabs textColor='inherit' value = {value}  onChange={(e,val) => setValue(val)}  indicatorColor='primary' // Set the default indicator color
                sx={{ "& .MuiTabs-indicator": { backgroundColor: '#fcadcf' } }} // Customize the indicator color
            >
                
                <Tab label="Blogs" LinkComponent={Link} to='/blogs'/>
                <Tab label="My Blogs" LinkComponent={Link} to='/my-blogs'/>
            </Tabs>
          </Box>
          )}

          <Box display={'flex'} marginLeft='auto'>
            {!isLogin && (
                <>
                    <Button sx={{ margin: 1, color: 'white' }}
                        LinkComponent={Link} 
                        to ='/login'> Login</Button>
                    <Button sx={{ margin: 1, color: 'white' }}
                        LinkComponent={Link} 
                        to ='/register'>Register</Button>
                </>
            )}
            {isLogin && (
                <Button onClick={handleLogout} sx={{ margin: 1, color: 'white' }}>Logout</Button>)}
            
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
