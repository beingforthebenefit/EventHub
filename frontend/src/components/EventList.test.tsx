import React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import {MockedProvider} from '@apollo/client/testing'
import EventList from './EventList'
import {gql} from '@apollo/client'

const GET_EVENTS = gql`
  query GetEvents {
    events {
      id
      title
      description
      date
      location
    }
  }
`

const mocks = [
  {
    request: {
      query: GET_EVENTS,
    },
    result: {
      data: {
        events: [
          {
            id: 1,
            title: 'Event 1',
            description: 'Description 1',
            date: '2024-08-25T10:00:00.000Z',
            location: 'Location 1',
          },
          {
            id: 2,
            title: 'Event 2',
            description: 'Description 2',
            date: '2024-08-26T10:00:00.000Z',
            location: 'Location 2',
          },
        ],
      },
    },
  },
]

test('renders EventList component loading state', () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <EventList />
    </MockedProvider>,
  )

  expect(screen.getByRole('progressbar')).toBeInTheDocument()
})

test('renders EventList component', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <EventList />
    </MockedProvider>,
  )

  // Check if loading state is displayed
  expect(screen.getByRole('progressbar')).toBeInTheDocument()

  // Wait for the data to be loaded
  await waitFor(() => {
    expect(screen.getByText(/Event 1/i)).toBeInTheDocument()
    expect(screen.getByText(/Description 1/i)).toBeInTheDocument()
    expect(screen.getByText(/Location 1/i)).toBeInTheDocument()
    expect(screen.getByText(/Event 2/i)).toBeInTheDocument()
    expect(screen.getByText(/Description 2/i)).toBeInTheDocument()
    expect(screen.getByText(/Location 2/i)).toBeInTheDocument()
  })
})
