import React from 'react'
import {useQuery} from '@apollo/client'
import {GET_MY_EVENTS} from '../queries/eventQueries'
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

const MyEvents: React.FC = () => {
  const {loading, error, data} = useQuery(GET_MY_EVENTS)

  if (loading) return <CircularProgress />
  if (error)
    return <Typography color="error">Error: {error.message}</Typography>

  return (
    <Container>
      <Box py={5}>
        <Typography variant="h4" gutterBottom>
          My Events
        </Typography>
        <Grid container spacing={3}>
          {data.myEvents.map((event: any) => (
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
                  <Button size="small" color="primary">
                    Learn More
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

export default MyEvents
