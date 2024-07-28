import React from 'react'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'
import {MockedProvider} from '@apollo/client/testing'
import Login from './Login'
import {gql} from '@apollo/client'
import {NotificationProvider} from '../contexts/NotificationContext'

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`

const mocks = [
  {
    request: {
      query: LOGIN,
      variables: {
        email: 'test@example.com',
        password: 'password',
      },
    },
    result: {
      data: {
        login: 'fake-jwt-token',
      },
    },
  },
]

test('renders Login component and logs in a user', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <NotificationProvider>
        <Login />
      </NotificationProvider>
    </MockedProvider>,
  )

  // Check if the login form is displayed
  expect(screen.getByRole('heading', {name: /Login/i})).toBeInTheDocument()

  // Simulate user input
  fireEvent.change(screen.getByLabelText(/Email/i), {
    target: {value: 'test@example.com'},
  })
  fireEvent.change(screen.getByLabelText(/Password/i), {
    target: {value: 'password'},
  })

  // Simulate form submission
  fireEvent.click(screen.getByRole('button', {name: /Login/i}))

  // Wait for the mutation to complete
  await waitFor(() => {
    expect(localStorage.getItem('token')).toBe('fake-jwt-token')
    expect(
      screen.getByText(/User logged in successfully!/i),
    ).toBeInTheDocument()
  })
})
