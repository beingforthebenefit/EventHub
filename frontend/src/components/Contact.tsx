import React from 'react'
import { Container, Typography, Box, Paper, TextField, Button } from '@mui/material'

const Contact: React.FC = () => {
  return (
    <Container>
      <Box py={5}>
        <Paper elevation={3} style={{ padding: '16px' }}>
          <Typography variant="h4" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            If you have any questions, feel free to reach out to us. We would love to hear from you.
          </Typography>
          <form noValidate autoComplete="off">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="message"
              label="Message"
              name="message"
              multiline
              rows={4}
            />
            <Button type="submit" variant="contained" color="primary">
              Send
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  )
}

export default Contact
