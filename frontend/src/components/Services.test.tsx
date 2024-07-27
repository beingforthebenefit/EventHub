import React from 'react'
import { render, screen } from '@testing-library/react'
import Services from './Services'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { MemoryRouter } from 'react-router-dom'

// Create a theme for the test
const theme = createTheme()

test('renders Services component', async () => {
  render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <Services />
      </ThemeProvider>
    </MemoryRouter>
  )

  // Check if the main title is present
  expect(screen.getByText(/Our Services/i)).toBeInTheDocument()

  // Check if the service titles are present
  expect(screen.getByText(/Service 1/)).toBeInTheDocument()
  expect(screen.getByText(/Service 2/)).toBeInTheDocument()
  expect(screen.getByText(/Service 3/)).toBeInTheDocument()

  // Check if the service descriptions are present
  expect(screen.getByText(/Description of service 1/i)).toBeInTheDocument()
  expect(screen.getByText(/Description of service 2/i)).toBeInTheDocument()
  expect(screen.getByText(/Description of service 3/i)).toBeInTheDocument()

  // Check if the buttons are present
  expect(screen.getAllByText(/Learn More/i).length).toBe(3)
})
