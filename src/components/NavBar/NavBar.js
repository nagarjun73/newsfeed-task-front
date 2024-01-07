import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material"
import { Link } from 'react-router-dom'
import { useContext } from "react"
import { UserContext } from "../../App"
import logoutButtonHandle from "./helpers/LogoutButtonHandle"
import { typographyCss, boxCss, linkCss } from './helpers/NavBarStyles'

const NavBar = (props) => {
  const { userState, userDispatch } = useContext(UserContext)
  const userPresent = Object.keys(userState.currentUser).length !== 0

  return (
    <AppBar component="nav">
      <Toolbar>
        <Typography variant="h6" component="div" sx={typographyCss}>
          NEWS FEED
        </Typography>
        {userPresent
          ? //logged in
          <Box sx={boxCss}>
            <Button onClick={() => logoutButtonHandle(userDispatch)} sx={{ color: '#fff' }}>
              <Link style={linkCss} to='/login'>Logout</Link>
            </Button>
          </Box>
          : //logged out
          <Box sx={boxCss}>
            <Button sx={{ color: '#fff' }}>
              <Link style={linkCss} to='/login'>Login</Link>
            </Button>
            <Button sx={{ color: '#fff' }}>
              <Link style={linkCss} to='/register'>Register</Link>
            </Button>
          </Box>
        }
      </Toolbar>
    </AppBar>
  )
}

export default NavBar