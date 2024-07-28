import React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import {MockedProvider} from '@apollo/client/testing'
import {MemoryRouter, Route, Routes} from 'react-router-dom'
import EventDetail from './EventDetail'
import {gql} from '@apollo/client'

const GET_EVENT = gql`
  query GetEvent($id: Int!) {
    event(id: $id) {
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
      query: GET_EVENT,
      variables: {
        id: 1,
      },
    },
    result: {
      data: {
        event: {
          id: '1',
          title: 'Event 1',
          description: 'Description 1',
          date: '2024-08-25T10:00:00.000Z',
          location: 'Location 1',
        },
      },
    },
  },
]

test('renders EventDetail component and fetches event details', async () => {
  render(
    <MemoryRouter initialEntries={['/events/1']}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <Routes>
          <Route path="/events/:id" element={<EventDetail />} />
        </Routes>
      </MockedProvider>
    </MemoryRouter>,
  )

  // Check if loading state is displayed
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument()

  // Wait for the query to complete
  await waitFor(() => {
    expect(screen.getByText(/Event 1/i)).toBeInTheDocument()
    expect(screen.getByText(/Description 1/i)).toBeInTheDocument()
    expect(screen.getByText(/8\/25\/2024/i)).toBeInTheDocument()
    expect(screen.getByText(/Location 1/i)).toBeInTheDocument()
  })
})
