import React, {useState} from 'react'
import {gql, useMutation} from '@apollo/client'
import {Container, TextField, Button, Typography, Box} from '@mui/material'

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login] = useMutation(LOGIN)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const {data} = await login({variables: {email, password}})
      localStorage.setItem('token', data.login)
      alert('User logged in successfully!')
    } catch (err) {
      alert('Error logging in')
    }
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{mt: 5}}>
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
            sx={{mt: 2}}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  )
}

export default Login
