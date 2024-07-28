import React from 'react'
import {useQuery} from '@apollo/client'
import {GET_EVENTS} from '../queries/eventQueries'
import {
  CircularProgress,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'

const EventList = () => {
  const {loading, error, data} = useQuery(GET_EVENTS)

  if (loading) return <CircularProgress />
  if (error)
    return <Typography color="error">Error: {error.message}</Typography>

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Event List
      </Typography>
      <List>
        {data.events.map((event: any) => (
          <ListItem key={event.id} divider>
            <ListItemText
              primary={event.title}
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    {event.description}
                  </Typography>
                  <br />
                  <Typography
                    component="span"
                    variant="body2"
                    color="textSecondary"
                  >
                    {new Date(event.date).toLocaleDateString()}
                  </Typography>
                  <br />
                  <Typography
                    component="span"
                    variant="body2"
                    color="textSecondary"
                  >
                    {event.location}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

export default EventList
