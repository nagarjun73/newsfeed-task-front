import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material"
import { Link } from 'react-router-dom'

const NavBar = (props) => {

  const logoutButtonHandle = () => {

  }

  return (
    <AppBar component="nav">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          NEWS FEED
        </Typography>
        {localStorage.getItem('token')
          ?
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button onClick={logoutButtonHandle} sx={{ color: '#fff' }}>
              <Link style={{ textDecoration: "none", color: '#ffffff' }} to='/login'>Logout</Link>
            </Button>
          </Box>
          :
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button sx={{ color: '#fff' }}>
              <Link style={{ textDecoration: "none", color: '#ffffff' }} to='/login'>Login</Link>
            </Button>
            <Button sx={{ color: '#fff' }}>
              <Link style={{ textDecoration: "none", color: '#ffffff' }} to='/register'>Register</Link>
            </Button>
          </Box>
        }
      </Toolbar>
    </AppBar>
  )
}

export default NavBar