import React from 'react'
import {useQuery} from '@apollo/client'
import {GET_EVENTS} from '../queries/eventQueries'
import {
  CircularProgress,
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material'
import {Link} from 'react-router-dom'

const EventList = () => {
  const {loading, error, data} = useQuery(GET_EVENTS)

  if (loading) return <CircularProgress />
  if (error)
    return <Typography color="error">Error: {error.message}</Typography>

  return (
    <Container>
      <Box py={5}>
        <Typography variant="h4" gutterBottom>
          Event List
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/create-event"
          style={{marginBottom: '20px'}}
        >
          Create New Event
        </Button>
        <Grid container spacing={3}>
          {data.events.map((event: any) => (
            <Grid item xs={12} md={4} key={event.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(event.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.location}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    component={Link}
                    to={`/events/${event.id}`}
                  >
                    Learn More
                  </Button>
                  <Button size="small" color="secondary">
                    Register
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}

export default EventList
