import React from 'react'
import {render, screen} from '@testing-library/react'
import About from './About'
import {ThemeProvider, createTheme} from '@mui/material/styles'
import {MemoryRouter} from 'react-router-dom'

// Create a theme for the test
const theme = createTheme()

test('renders About component', async () => {
  render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <About />
      </ThemeProvider>
    </MemoryRouter>,
  )

  // Check if the main title is present
  expect(screen.getByText(/About Us/i)).toBeInTheDocument()

  // Check if the body text is present
  expect(
    screen.getByText(/We are a team of dedicated professionals/i),
  ).toBeInTheDocument()
})
