import { Box, Stack, Typography, TextField, Button, Card } from '@mui/material'
import { useState } from 'react'
import _ from 'lodash'
import axios from 'axios'
import runValidaion from './Validations/Login-validation'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../App'


const Login = (props) => {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [formError, setFormError] = useState({})
  const { userDispatch } = useContext(UserContext)
  const navigate = useNavigate()
  const fields = ['email', 'password']
  const loginHandleFunction = async (e) => {
    e.preventDefault()
    //Validation
    const formValidation = runValidaion(formData)
    try {
      if (_.isEmpty(formValidation)) {
        const result = await axios.post('http://localhost:3073/users/login', formData)
        localStorage.setItem('token', result.data.token)
        //get user details
        const getAccount = await axios.get('http://localhost:3073/users/account', {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        userDispatch({ type: "USER_LOGIN", payload: getAccount.data })
        setFormError({})
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
      <Card component="form"
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "auto",
          padding: "3vw",
          width: '60vw',
          borderRadius: "15px"
        }} onSubmit={loginHandleFunction}>
        <Stack justifyContent='center' width="50vw" spacing={3}>
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
      </Card>
    </Box>
  )
}

export default Login