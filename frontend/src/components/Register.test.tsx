import React from 'react'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'
import {MockedProvider} from '@apollo/client/testing'
import Register from './Register'
import {gql} from '@apollo/client'
import {NotificationProvider} from '../contexts/NotificationContext'

const REGISTER = gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      id
      email
    }
  }
`

const mocks = [
  {
    request: {
      query: REGISTER,
      variables: {
        email: 'test@example.com',
        password: 'password',
      },
    },
    result: {
      data: {
        register: {
          id: '1',
          email: 'test@example.com',
        },
      },
    },
  },
]

test('renders Register component and registers a user', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <NotificationProvider>
        <Register />
      </NotificationProvider>
    </MockedProvider>,
  )

  // Check if the register form is displayed
  expect(screen.getByRole('heading', {name: /Register/i})).toBeInTheDocument()

  // Simulate user input
  fireEvent.change(screen.getByLabelText(/Email/i), {
    target: {value: 'test@example.com'},
  })
  fireEvent.change(screen.getByLabelText(/Password/i), {
    target: {value: 'password'},
  })

  // Simulate form submission
  fireEvent.click(screen.getByRole('button', {name: /Register/i}))

  // Wait for the mutation to complete
  await waitFor(() => {
    expect(
      screen.getByText(/User registered successfully!/i),
    ).toBeInTheDocument()
  })
})
