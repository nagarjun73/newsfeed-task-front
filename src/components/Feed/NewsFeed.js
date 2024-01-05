import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import axios from "axios"
import NewsCard from "./NewsCard"

const NewsFeed = (props) => {
  const [option, setOption] = useState("recentStories")
  const [feeds, setFeeds] = useState([])
  console.log(feeds);

  useEffect(() => {
    (async () => {
      const getFeed = await axios.get(`http://localhost:3073/feeds/${option}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      setFeeds(getFeed.data);
    })()
  }, [])


  return (
    <Box paddingTop="20vh">
      {feeds.map((feed) => {
        return <NewsCard key={feed._id} feed={feed} />
      })}
    </Box>
  )
}

export default NewsFeed