import React from 'react'
import {render, screen} from '@testing-library/react'
import {MockedProvider} from '@apollo/client/testing'
import Dashboard from './Dashboard'
import {gql} from '@apollo/client'

const mocks = [
  {
    request: {
      query: gql`
        query GetMessage {
          message
        }
      `,
    },
    result: {
      data: {
        message: 'Hello from the backend!',
      },
    },
  },
]

test('renders Dashboard component', () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Dashboard />
    </MockedProvider>,
  )
  expect(screen.getAllByText(/Dashboard/i)[0]).toBeInTheDocument()
  expect(screen.getByText(/Welcome to the dashboard!/i)).toBeInTheDocument()
  expect(screen.getByText(/Get Started/i)).toBeInTheDocument()
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument()
})
