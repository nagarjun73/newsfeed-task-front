import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import axios from "axios"
import NewsCard from "./NewsCard"
import Dropdown from "./Dropdown"
import { Button } from "@mui/material"

const NewsFeed = (props) => {
  const iniOpt = localStorage.getItem('selectedOption')
  const [option, setOption] = useState(iniOpt ? iniOpt : 'recentStories')
  const [limit, setLimit] = useState(10)
  const [feeds, setFeeds] = useState([])
  console.log(option);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      (async () => {
        const getFeed = await axios.get(`http://localhost:3073/feeds?category=${option}&limit=${limit}`, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        setFeeds(getFeed.data);
        localStorage.setItem('selectedOption', option)
      })()
    }
  }, [option, limit])
    (async () => {
      const getFeed = await axios.get(`http://localhost:3073/feeds/${option}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      setFeeds(getFeed.data);
      localStorage.setItem('selectedOption', option)
    })()
}, [option])

//dropdown option updater function
const optionUpdater = (option) => {
  setOption(option)
}

//loadmore fuction
const handleLoadMore = () => {
  const newVar = limit + 10
  setLimit(newVar)
}

return (
  <Box paddingTop="10vh">
    <Box width="50vw" margin="auto">
      <Dropdown option={option} optionUpdater={optionUpdater} />
      {feeds.map((feed) => {
        return <NewsCard key={feed._id} feed={feed} />
      })}
      <Button variant="contained" onClick={handleLoadMore}>Load more</Button>
    </Box > :
    <Box>
      <Typography variant="h3" padding="auto">Please Login</Typography>
    </Box>
  </Box >
)
}

export default NewsFeed