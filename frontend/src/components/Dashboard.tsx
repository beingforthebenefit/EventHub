import React from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Message from './Message'

const Dashboard: React.FC = () => {
  return (
    <main style={{padding: '16px', flexGrow: 1}}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper style={{padding: '16px'}}>
            <Typography variant="h5">Dashboard</Typography>
            <Typography>Welcome to the dashboard!</Typography>
            <Button variant="contained" color="primary" sx={{mr: 2}}>
              Get Started
            </Button>
            <Button variant="contained" color="secondary">
              Learn More
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{padding: '16px'}}>
            <Typography>
              <Message />
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </main>
  )
}

export default Dashboard
