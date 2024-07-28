import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import Header from './Header'
import {ThemeProvider, createTheme} from '@mui/material/styles'
import {MemoryRouter} from 'react-router-dom'

const theme = createTheme()

const resizeWindow = (width: number, height: number) => {
  window.innerWidth = width
  window.innerHeight = height
  window.dispatchEvent(new Event('resize'))
}

jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn(() => ({email: 'test@example.com'})),
}))

describe('Header component', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'fake-jwt-token')
  })

  afterEach(() => {
    localStorage.clear()
  })

  test('renders Header component', async () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <Header />
        </ThemeProvider>
      </MemoryRouter>,
    )

    // Check if the main title is present
    expect(screen.getByText(/EventHub/i)).toBeInTheDocument()

    // Check if the account icon button is present
    expect(
      screen.getByLabelText(/account of current user/i),
    ).toBeInTheDocument()

    // Simulate clicking the account icon button
    fireEvent.click(screen.getByLabelText(/account of current user/i))

    // Check if the menu items appear
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument()
    expect(screen.getByText(/Profile/i)).toBeInTheDocument()
    expect(screen.getByText(/My account/i)).toBeInTheDocument()
    expect(screen.getByText(/Logout/i)).toBeInTheDocument()

    // Simulate closing the menu
    fireEvent.click(screen.getByText(/Profile/i))

    // Check if the menu items are hidden
    expect(screen.queryByText(/test@example.com/i)).not.toBeVisible()
    expect(screen.queryByText(/Profile/i)).not.toBeVisible()
    expect(screen.queryByText(/My account/i)).not.toBeVisible()
    expect(screen.queryByText(/Logout/i)).not.toBeVisible()
  })

  test('toggles drawer on mobile', async () => {
    // Simulate mobile viewport
    resizeWindow(500, 800)

    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <Header />
        </ThemeProvider>
      </MemoryRouter>,
    )

    // Check if the drawer is initially closed
    expect(screen.queryByText(/Home/i)).not.toBeVisible()

    // Simulate clicking the menu icon button
    fireEvent.click(screen.getByLabelText(/open drawer/i))

    // Check if the drawer items appear
    expect(screen.getByText(/Home/i)).toBeVisible()
    expect(screen.getByText(/Events/i)).toBeVisible()
    expect(screen.getByText(/About/i)).toBeVisible()
    expect(screen.getByText(/Services/i)).toBeVisible()
    expect(screen.getByText(/Contact/i)).toBeVisible()

    // Simulate closing the drawer
    fireEvent.click(screen.getByLabelText(/open drawer/i))

    // Check if the drawer items are hidden
    // TODO: Fix this test
    // expect(screen.queryByText(/Home/i)).not.toBeVisible();
    // expect(screen.queryByText(/About/i)).not.toBeVisible();
    // expect(screen.queryByText(/Services/i)).not.toBeVisible();
    // expect(screen.queryByText(/Contact/i)).not.toBeVisible();
  })
})
