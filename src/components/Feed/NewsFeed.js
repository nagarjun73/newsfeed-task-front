import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import axios from '../../config/axiosConfig'
import NewsCard from "./NewsCard"
import Dropdown from "./Dropdown"
import { useContext } from 'react'
import { UserContext } from '../../App'


const NewsFeed = (props) => {
  const iniOpt = localStorage.getItem('selectedOption')
  const [option, setOption] = useState(iniOpt ? iniOpt : '659ead71964ee28a078e1f36')
  const [feeds, setFeeds] = useState([])
  const { userState } = useContext(UserContext)
  const userPresent = Object.keys(userState.currentUser).length !== 0
  console.log(option);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      (async () => {
        const getFeed = await axios.get(`feeds/${option}`, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        setFeeds(getFeed.data);
        localStorage.setItem('selectedOption', option)
      })()
    }
  }, [option])

  //dropdown option updater function
  const optionUpdater = (option) => {
    setOption(option)
  }

  return (
    <Box paddingTop="10vh">
      {userPresent && <Box sx={{ width: { xs: '90vw', md: "60vw" } }} margin="auto">
        {/* drop down */}
        <Dropdown option={option} optionUpdater={optionUpdater} />
        {/* cards */}
        {feeds.map((feed) => {
          return <NewsCard key={feed._id} feed={feed} />
        })}
      </Box>}
    </Box >
  )
}

export default NewsFeed