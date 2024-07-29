import {gql} from '@apollo/client'

export const GET_EVENT = gql`
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

export const GET_MY_EVENTS = gql`
  query GetMyEvents {
    myEvents {
      id
      title
      description
      date
      location
    }
  }
`

export const GET_EVENTS = gql`
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

export const CREATE_EVENT = gql`
  mutation CreateEvent($title: String!, $description: String!, $date: DateTime!, $location: String!) {
    createEvent(title: $title, description: $description, date: $date, location: $location) {
      id
      title
      description
      date
      location
    }
  }
`

export const REGISTER_EVENT = gql`
  mutation RegisterEvent($eventId: Int!) {
    registerEvent(eventId: $eventId) {
      id
      userId
      eventId
      createdAt
    }
  }
`
