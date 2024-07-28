import React from 'react'
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material'

const Services: React.FC = () => {
  const services = [
    {title: 'Service 1', description: 'Description of service 1'},
    {title: 'Service 2', description: 'Description of service 2'},
    {title: 'Service 3', description: 'Description of service 3'},
  ]

  return (
    <Container>
      <Box py={5}>
        <Typography variant="h4" gutterBottom>
          Our Services
        </Typography>
        <Grid container spacing={3}>
          {services.map((service, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {service.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}

export default Services
