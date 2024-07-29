import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useNotification } from '../contexts/NotificationContext'
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from '@mui/material'
import { CREATE_EVENT } from '../queries/eventQueries'

const CreateEvent: React.FC = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [createEvent] = useMutation(CREATE_EVENT)
  const { showNotification } = useNotification()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    console.log(token)
    try {
      await createEvent({
        variables: {
          title,
          description,
          date: new Date(date).toISOString(),
          location,
        },
      })
      showNotification('Event created successfully!', 'success')
    } catch (err: any) {
      showNotification(`Error creating event: ${err.message}`, 'error')
    }
  }

  return (
    <Container maxWidth="sm">
      <Box py={5}>
        <Paper elevation={3} style={{ padding: '16px' }}>
          <Typography variant="h4" gutterBottom>
            Create New Event
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              fullWidth
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <TextField
              label="Date"
              type="datetime-local"
              fullWidth
              margin="normal"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
            <TextField
              label="Location"
              fullWidth
              margin="normal"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: '20px' }}
            >
              Create Event
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  )
}

export default CreateEvent
