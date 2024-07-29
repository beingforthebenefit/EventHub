import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import CreateEvent from './CreateEvent'
import { CREATE_EVENT } from '../queries/eventQueries'
import { NotificationProvider } from '../contexts/NotificationContext'

const mocks = [
  {
    request: {
      query: CREATE_EVENT,
      variables: {
        title: 'New Event',
        description: 'Event Description',
        date: '2024-08-30T10:00:00.000Z',
        location: 'Event Location',
      },
    },
    result: {
      data: {
        createEvent: {
          id: 1,
          title: 'New Event',
          description: 'Event Description',
          date: '2024-08-30T10:00:00.000Z',
          location: 'Event Location',
        },
      },
    },
  },
]

test('renders CreateEvent component and submits the form', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <NotificationProvider>
        <CreateEvent />
      </NotificationProvider>
    </MockedProvider>
  )

  fireEvent.change(screen.getByLabelText(/Title/i), {
    target: { value: 'New Event' },
  })
  fireEvent.change(screen.getByLabelText(/Description/i), {
    target: { value: 'Event Description' },
  })
  fireEvent.change(screen.getByLabelText(/Date/i), {
    target: { value: '2024-08-30T10:00' },
  })
  fireEvent.change(screen.getByLabelText(/Location/i), {
    target: { value: 'Event Location' },
  })

  fireEvent.click(screen.getByRole('button', { name: /Create Event/i }))

  await waitFor(() => {
    expect(screen.getByText(/Event created successfully!/i)).toBeInTheDocument()
  })
})

test('shows error notification when event creation fails', async () => {
  const errorMocks = [
    {
      request: {
        query: CREATE_EVENT,
        variables: {
          title: 'New Event',
          description: 'Event Description',
          date: '2024-08-30T10:00:00.000Z',
          location: 'Event Location',
        },
      },
      error: new Error('Event creation failed'),
    },
  ]

  render(
    <MockedProvider mocks={errorMocks} addTypename={false}>
      <NotificationProvider>
        <CreateEvent />
      </NotificationProvider>
    </MockedProvider>
  )

  fireEvent.change(screen.getByLabelText(/Title/i), {
    target: { value: 'New Event' },
  })
  fireEvent.change(screen.getByLabelText(/Description/i), {
    target: { value: 'Event Description' },
  })
  fireEvent.change(screen.getByLabelText(/Date/i), {
    target: { value: '2024-08-30T10:00' },
  })
  fireEvent.change(screen.getByLabelText(/Location/i), {
    target: { value: 'Event Location' },
  })

  fireEvent.click(screen.getByRole('button', { name: /Create Event/i }))

  await waitFor(() => {
    expect(screen.getByText(/Error creating event/i)).toBeInTheDocument()
  })
})
