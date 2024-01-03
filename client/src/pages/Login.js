import React from 'react'
import { toast} from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import {Box,Typography,TextField,Button} from '@mui/material'

const Login = () => {
        const notify = () => toast.success("Wow so easy!");

  return (
    <>
      <h1>Login Page</h1>
       <div>
        <button onClick={notify}>Notify!</button>
      </div>
    </>
  )
}

export default Login
