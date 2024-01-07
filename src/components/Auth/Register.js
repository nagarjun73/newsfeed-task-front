import { Box, Stack, Typography, TextField, Button, Card } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import runValidaion from './Validation'
import _ from 'lodash'
import toast, { Toaster } from 'react-hot-toast'

const Register = (props) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" })
  const [formError, setFormError] = useState({})

  console.log(formData);

  const fields = ["name", "email", "password"]

  const signInHandleFunction = async (e) => {
    e.preventDefault()

    //Validation
    const formValidation = runValidaion(formData)
    try {
      if (_.isEmpty(formValidation)) {
        const result = await axios.post(`http://localhost:3073/users/register`, formData)
        toast.success(result.data.msg);
        setFormData({ name: "", email: "", password: "" })
        setFormError({})
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
    <Box paddingTop="20vh">
      <Toaster />
      <Card component="form"
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "40vw",
          margin: "auto",
          padding: "3vw",
          paddingBottom: "3vw",
          borderRadius: "15px"
        }} onSubmit={signInHandleFunction}>
        <Stack justifyContent='center' width="50vw" spacing={3}>
          <Typography variant="h3">Register</Typography>
          {fields.map((fld, i) => {
            return <TextField
              key={i}
              label={fld}
              variant="outlined"
              type='text'
              value={formData[fld]}
              onChange={(e) => setFormData({ ...formData, [fld]: e.target.value })}
              error={formError[fld] && true}
              helperText={formError[fld]}
              sx={{ backgroundColor: "white" }} />
          })}
          <Button type="submit" variant="contained">Register</Button>
        </Stack>
      </Card>
    </Box>
  )
}

export default Register