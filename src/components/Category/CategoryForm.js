import { Modal, Box, Stack, TextField, Button } from '@mui/material'
import { modalStyle } from './styles/modalStyle'
import { useState } from 'react'
import _ from 'lodash'
import axios from '../../config/axiosConfig'

import { CategoryContext } from '../../App'
import { useContext } from 'react'

const CategoryForm = (props) => {
  const { category, button } = props
  const { categoryDispatch } = useContext(CategoryContext)
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState(
    {
      name: category.name ? category.name : '',
      url: category.url ? category.url : ''
    })

  const [formError, setFormError] = useState({})
  console.log(formData);

  const errors = {}

  //Validation
  const runValidation = () => {
    if (formData.name.trim().length === 0) {
      errors.name = "name should not be Empty."
    }

    if (formData.url.trim().length === 0) {
      errors.url = "url should not be Empty."
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    runValidation()
    try {
      if (_.isEmpty(errors)) {
        if (button === 'edit') {
          const result = await axios.put(`http://localhost:3073/categories/edit/${category._id}`, formData, {
            headers: {
              Authorization: localStorage.getItem('token')
            }
          })
          categoryDispatch({ type: "EDIT_CATEGORY", payload: result.data })
        } else if (button === 'add') {
          const result = await axios.post(`http://localhost:3073/categories/add`, formData, {
            headers: {
              Authorization: localStorage.getItem('token')
            }
          })
          categoryDispatch({ type: "ADD_CATEGORY", payload: result.data })
        }
        //reset form
        setFormError({})
        setFormData({ name: "", url: "" })
        setOpen(false)
      } else {
        setFormError(errors)
      }

    } catch (e) {
      console.log(e);
    }

  }

  //Edit handle function
  const editHandleFunction = () => {
    setOpen(true)
    if (Object.keys(category)?.length !== 0) {
    }
  }

  //handle close
  const handleClose = () => {
    setOpen(false)
    if (button == "add") {
      setFormData({ name: "", url: "" })
    }
  }

  return (
    <>
      <Button variant='contained' onClick={editHandleFunction} >
        {button}
      </Button>

      <Modal
        open={open}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...modalStyle, width: '50vw' }}>
          <h2 id="parent-modal-title">{button} Category</h2>
          <form onSubmit={handleSubmit} >
            <Stack spacing={2} >
              <TextField
                label="Name"
                name="name"
                variant="outlined"
                type='text'
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={formError.name && true}
                helperText={formError.name}
                sx={{ backgroundColor: "white" }} />

              <TextField
                label="Link"
                variant="outlined"
                name="Link"
                type='text'
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                error={formError.url && true}
                helperText={formError.url}
                sx={{ backgroundColor: "white" }} />

              <Button type="submit" variant="contained">submit</Button>
            </Stack>
          </form>

          <Button variant='contained' onClick={handleClose} sx={{
            marginTop: "10px",
            width: "100%"
          }}>Close</Button>
        </Box>
      </Modal>
    </>
  )
}

export default CategoryForm