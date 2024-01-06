import { Card, CardContent, Typography, CardActions, Button, Link } from "@mui/material"

const NewsCard = (props) => {
  const { feed } = props

  return (
    <Card sx={{ marginY: '3vh', padding: "1.5vw", borderRadius: "15px" }} elevation={3}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {feed.category}
        </Typography>
        <Typography variant="h5" component="div">
          {feed.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {new Date(feed.pubDate).toLocaleString()}
        </Typography>
        <Typography variant="body2">
          {feed.description}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small">
          <Link target="_blank" rel="noopener" sx={{ color: "white", textDecoration: "none" }} href={feed.link}>Details</Link>
        </Button>
      </CardActions>
    </Card>
  )
}

export default NewsCard