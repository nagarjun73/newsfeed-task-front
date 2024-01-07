//packages
import { Box, Stack, Typography, TextField, Button, Card } from '@mui/material'
import axios from '../../config/axiosConfig'
import { useState } from 'react'
import _ from 'lodash'
import toast, { Toaster } from 'react-hot-toast'

//helpers
import cardCompCss from './styles/RegisterStyles'
import runValidaion from './Validations/Reg-validation'
import clientErrorHandler from './helpers/errorHandleFunc'

const Register = (props) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" })
  const [formError, setFormError] = useState({})
  const fields = ["name", "email", "password"]

  //Signup form Submission handler
  const signInHandleFunction = async (e) => {
    e.preventDefault()

    //Validation
    const formValidation = runValidaion(formData)
    try {
      //if no errors
      if (_.isEmpty(formValidation)) {
        const result = await axios.post(`users/register`, formData)
        toast.success(result.data.msg);
        //reset form
        setFormData({ name: "", email: "", password: "" })
        setFormError({})
      } else {
        //if errors
        setFormError(formValidation)
      }
    } catch (e) {
      clientErrorHandler(e)
    }
  }

  return (
    <Box paddingTop="20vh">
      <Toaster />
      <Card component="form"
        sx={cardCompCss} onSubmit={signInHandleFunction}>
        <Stack justifyContent='center' width="50vw" spacing={3}>
          <Typography variant="h3">Register</Typography>

          {fields.map((fld, i) => {
            return <TextField
              key={i}
              label={fld}
              variant="outlined"
              type={fld === 'password' ? 'password' : 'text'}
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