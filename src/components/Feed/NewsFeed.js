import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import axios from "axios"
import NewsCard from "./NewsCard"
import Dropdown from "./Dropdown"
import { useContext } from 'react'
import { UserContext } from '../../App'

const NewsFeed = (props) => {
  const iniOpt = localStorage.getItem('selectedOption')
  const [option, setOption] = useState(iniOpt ? iniOpt : 'recentStories')
  const [feeds, setFeeds] = useState([])
  const { userState } = useContext(UserContext)
  const userPresent = Object.keys(userState.currentUser).length !== 0
  console.log(option);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      (async () => {
        const getFeed = await axios.get(`http://localhost:3073/feeds/${option}`, {
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
        <Dropdown option={option} optionUpdater={optionUpdater} />
        {feeds.map((feed) => {
          return <NewsCard key={feed._id} feed={feed} />
        })}
      </Box>}
    </Box >
  )
}

export default NewsFeed