import { Box, Stack, Typography, TextField, Button } from '@mui/material'
import { useState } from 'react'


const Register = (props) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" })
  const [formError, setFormError] = useState({})

  console.log(formData);

  const fields = ["name", "email", "password"]

  const signInHandleFunction = (e) => {
    e.preventDefault()
  }

  return (
    <Box>
      <Box component="form" sx={{ display: "flex", justifyContent: "center" }} onSubmit={signInHandleFunction}>
        <Stack justifyContent='center' width="50vw" spacing={5}>
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
      </Box>
    </Box>
  )
}

export default Register