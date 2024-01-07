import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material"
import { Link } from 'react-router-dom'
import { useContext } from "react"
import { UserContext } from "../../App"

const NavBar = (props) => {
  const { userState, userDispatch } = useContext(UserContext)
  const userPresent = Object.keys(userState.currentUser).length !== 0

  const logoutButtonHandle = () => {
    userDispatch({ type: "LOGOUT" })
    localStorage.removeItem('token')
    localStorage.removeItem('selectedOption')
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
        {userPresent
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