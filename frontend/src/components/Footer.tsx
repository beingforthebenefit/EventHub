import React from 'react'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

const Footer: React.FC = () => {
  return (
    <footer>
      <Container maxWidth="sm">
        <Typography variant="body1" align="center">
          &copy; 2024 My App. All rights reserved.
        </Typography>
      </Container>
    </footer>
  )
}

export default Footer
