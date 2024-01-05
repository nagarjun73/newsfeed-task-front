import { Box, Stack, Typography, TextField, Button } from '@mui/material'
import { useState } from 'react'
import _ from 'lodash'
import runValidaion from './Validation'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [formError, setFormError] = useState({})

  const navigate = useNavigate()
  console.log(formError);

  const fields = ['email', 'password']

  const loginHandleFunction = async (e) => {
    e.preventDefault()

    //Validation
    const formValidation = runValidaion(formData)
    try {
      if (_.isEmpty(formValidation)) {
        const result = await axios.post('http://localhost:3073/users/login', formData)
        localStorage.setItem('token', result.data.token)
        navigate('/')
      } else {
        setFormError(formValidation)
      }
    } catch (e) {
      if (e.response.data.errors) {
        e.response.data.errors.forEach((ele) => {
          toast.error(ele.msg);
        })
      } else {
        console.log(e);
      }
    }
  }

  return (
    <Box paddingTop="20vh" >
      <Toaster />
      <Box component="form" sx={{ display: "flex", justifyContent: "center" }} onSubmit={loginHandleFunction}>
        <Stack justifyContent='center' width="50vw" spacing={5}>
          <Typography variant="h3">Login</Typography>

          {fields.map((filed, i) => {
            return <TextField
              label={filed}
              key={i}
              variant="outlined"
              type='text'
              value={formData[filed]}
              onChange={(e) => setFormData({ ...formData, [filed]: e.target.value })}
              error={formError[filed] && true}
              helperText={formError[filed]}
              sx={{ backgroundColor: "white" }} />
          })}

          <Button type="submit" variant="contained">Login</Button>
        </Stack>
      </Box>
    </Box>
  )
}

export default Login