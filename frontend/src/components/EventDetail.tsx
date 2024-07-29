import React from 'react'
import {useParams} from 'react-router-dom'
import {useQuery} from '@apollo/client'
import {GET_EVENT} from '../queries/eventQueries'
import {
  CircularProgress,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
} from '@mui/material'

const EventDetail: React.FC = () => {
  const {id} = useParams<{id: string}>()
  const {loading, error, data} = useQuery(GET_EVENT, {
    variables: {id: id ? parseInt(id) : undefined},
  })

  if (loading) return <CircularProgress />
  if (error)
    return <Typography color="error">Error: {error.message}</Typography>

  const {event} = data

  return (
    <Container>
      <Box py={5}>
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {event.title}
            </Typography>
            <Typography variant="body1" paragraph>
              {event.description}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Date: {new Date(event.date).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Location: {event.location}
            </Typography>
          </CardContent>
          <Box p={2}>
            <Button variant="contained" color="primary">
              Register
            </Button>
          </Box>
        </Card>
      </Box>
    </Container>
  )
}

export default EventDetail
