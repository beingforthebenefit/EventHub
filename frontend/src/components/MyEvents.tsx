import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_MY_EVENTS } from '../queries/eventQueries'
import {
  CircularProgress,
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Paper,
} from '@mui/material'

const MyEvents = () => {
  const { loading, error, data } = useQuery(GET_MY_EVENTS)

  if (loading) return <CircularProgress />
  if (error) return <Typography color="error">Error: {error.message}</Typography>

  return (
    <Container>
      <Box py={5}>
        <Paper elevation={3} style={{ padding: '16px' }}>
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
                </Card>
              </Grid>
            ))}
          </Grid>
          {data.myEvents.length === 0 && (
            <Card style={{ marginTop: '30px' }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  No Events
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  You have not registered for any events.
                </Typography>
              </CardContent>
            </Card>
          )}
        </Paper>
      </Box>
    </Container>
  )
}

export default MyEvents
