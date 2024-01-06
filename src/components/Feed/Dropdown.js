
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'

const Dropdown = (props) => {
  const { option, optionUpdater } = props

  const options = ["recentStories", "topStories", "india", "world", "nri", "business", "sports"]

  return (
    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="select-filled-label">categories</InputLabel>
      <Select
        labelId="select-filled-label"
        id="select-filled"
        value={option}
        onChange={(e) => optionUpdater(e.target.value)}
      >
        {options.map((ele, i) => {
          return <MenuItem key={i} value={ele}>{ele}</MenuItem>
        })}
      </Select>
    </FormControl>
  )
}

export default Dropdown