import React, {useState} from 'react'
import {useMutation} from '@apollo/client'
import {Container, TextField, Button, Typography, Box, Paper} from '@mui/material'
import {useNotification} from '../contexts/NotificationContext'
import {LOGIN} from '../queries/userQueries'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login] = useMutation(LOGIN)
  const { showNotification } = useNotification()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data } = await login({ variables: { email, password } })
      localStorage.setItem('token', data.login)
      showNotification('User logged in successfully!', 'success')
      window.location.href = '/'
    } catch (err) {
      showNotification('Error logging in', 'error')
    }
  }

  return (
    <Container maxWidth="sm">
      <Box py={5}>
        <Paper elevation={3} style={{ padding: '16px' }}>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleLogin}>
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
              style={{ marginTop: '20px' }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  )
}

export default Login
