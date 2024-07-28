import React, {useState} from 'react'
import {gql, useMutation} from '@apollo/client'
import {Container, TextField, Button, Typography, Box} from '@mui/material'

const REGISTER_EVENT = gql`
  mutation RegisterEvent($eventId: Int!) {
    registerEvent(eventId: $eventId) {
      id
      userId
      eventId
      createdAt
    }
  }
`

const RegisterEvent: React.FC = () => {
  const [eventId, setEventId] = useState('')
  const [registerEvent] = useMutation(REGISTER_EVENT)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await registerEvent({variables: {eventId: parseInt(eventId)}})
      alert('Registered for event successfully!')
    } catch (err) {
      alert('Error registering for event')
    }
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{mt: 5}}>
        <Typography variant="h4" gutterBottom>
          Register for Event
        </Typography>
        <form onSubmit={handleRegister}>
          <TextField
            label="Event ID"
            type="number"
            fullWidth
            margin="normal"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{mt: 2}}
          >
            Register
          </Button>
        </form>
      </Box>
    </Container>
  )
}

export default RegisterEvent