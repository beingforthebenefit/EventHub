import React from 'react'
import {render, screen} from '@testing-library/react'
import {MockedProvider} from '@apollo/client/testing'
import Message, {GET_MESSAGE} from './Message'

const mocks = [
  {
    request: {
      query: GET_MESSAGE,
    },
    result: {
      data: {
        message: 'Hello from the backend!',
      },
    },
  },
]

test('renders Message component', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Message />
    </MockedProvider>,
  )
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument()
  const resolvedMessage = await screen.findByText(/Hello from the backend!/i)
  expect(resolvedMessage).toBeInTheDocument()
})
