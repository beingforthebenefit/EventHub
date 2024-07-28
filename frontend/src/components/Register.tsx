import React, {useState} from 'react'
import {useMutation} from '@apollo/client'
import {Container, TextField, Button, Typography, Box} from '@mui/material'
import {REGISTER} from '../queries/userQueries'
import {useNotification} from '../contexts/NotificationContext'

const Register: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [register] = useMutation(REGISTER)
  const {showNotification} = useNotification()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await register({variables: {email, password}})
      showNotification('User registered successfully!', 'success')
    } catch (err) {
      showNotification('Error registering user', 'error')
    }
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{mt: 5}}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleRegister}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

export default Register
