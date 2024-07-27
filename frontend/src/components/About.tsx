import React from 'react'
import { Container, Typography, Box, Paper } from '@mui/material'

const About: React.FC = () => {
  return (
    <Container>
      <Box py={5}>
        <Paper elevation={3} style={{ padding: '16px' }}>
          <Typography variant="h4" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body1">
            We are a team of dedicated professionals committed to delivering high-quality products and services. Our mission is to provide the best solutions to our clients.
          </Typography>
        </Paper>
      </Box>
    </Container>
  )
}

export default About
