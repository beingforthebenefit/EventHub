import React from 'react'
import {render, screen} from '@testing-library/react'
import {MockedProvider} from '@apollo/client/testing'
import App from './App'

test('renders App component', () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <App />
    </MockedProvider>,
  )
  expect(screen.getAllByText(/EventHub/i)[0]).toBeInTheDocument()
  expect(screen.getByText(/Welcome to the dashboard!/i)).toBeInTheDocument()
  expect(screen.getByText(/Get Started/i)).toBeInTheDocument()
})
