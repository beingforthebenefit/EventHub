import React from 'react'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'
import {MockedProvider} from '@apollo/client/testing'
import RegisterEvent from './RegisterEvent'
import {gql} from '@apollo/client'
import {NotificationProvider} from '../contexts/NotificationContext'

const REGISTER_EVENT = gql`
  mutation RegisterEvent($eventId: Int!) {
    registerEvent(eventId: $eventId) {
      id
      userId
      eventId
      createdAt
    }
  }
`

const mocks = [
  {
    request: {
      query: REGISTER_EVENT,
      variables: {
        eventId: 1,
      },
    },
    result: {
      data: {
        registerEvent: {
          id: '1',
          userId: '1',
          eventId: '1',
          createdAt: '2024-08-25T10:00:00.000Z',
        },
      },
    },
  },
]

test('renders RegisterEvent component and registers for an event', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <NotificationProvider>
        <RegisterEvent />
      </NotificationProvider>
    </MockedProvider>,
  )

  // Check if the register event form is displayed
  expect(
    screen.getByRole('heading', {name: /Register for Event/i}),
  ).toBeInTheDocument()

  // Simulate user input
  fireEvent.change(screen.getByLabelText(/Event ID/i), {
    target: {value: '1'},
  })

  // Simulate form submission
  fireEvent.click(screen.getByRole('button', {name: /Register/i}))

  // Wait for the mutation to complete
  await waitFor(() => {
    expect(
      screen.getByText(/Registered for event successfully!/i),
    ).toBeInTheDocument()
  })
})
