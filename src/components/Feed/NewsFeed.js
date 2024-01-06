import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import axios from "axios"
import NewsCard from "./NewsCard"
import Dropdown from "./Dropdown"

const NewsFeed = (props) => {
  const [option, setOption] = useState("recentStories")
  const [feeds, setFeeds] = useState([])
  console.log(option);

  useEffect(() => {
    (async () => {
      const getFeed = await axios.get(`http://localhost:3073/feeds/${option}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      setFeeds(getFeed.data);
    })()
  }, [option])

  const optionUpdater = (option) => {
    setOption(option)
  }

  return (
    <Box paddingTop="20vh">
      <Dropdown option={option} optionUpdater={optionUpdater} />
      {feeds.map((feed) => {
        return <NewsCard key={feed._id} feed={feed} />
      })}
    </Box>
  )
}

export default NewsFeed