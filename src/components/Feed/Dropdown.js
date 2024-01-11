import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useContext } from 'react'
import { CategoryContext } from '../../App'

const Dropdown = (props) => {
  const { option, optionUpdater } = props
  const { categoryState } = useContext(CategoryContext)

  return (
    <FormControl variant="filled" sx={{ m: 1, minWidth: 140 }}>
      <InputLabel id="select-filled-label">categories</InputLabel>
      <Select
        labelId="select-filled-label"
        id="select-filled"
        value={option}
        onChange={(e) => optionUpdater(e.target.value)}
      >
        {categoryState.categories.map((ele, i) => {
          return <MenuItem key={i} value={ele._id}>{ele.name}</MenuItem>
        })}
      </Select>
    </FormControl>
  )
}

export default Dropdown