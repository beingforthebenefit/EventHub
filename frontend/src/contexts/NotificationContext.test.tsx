import React, {ReactNode} from 'react'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'
import {NotificationProvider, useNotification} from './NotificationContext'

// Mocking Snackbar and Alert from Material-UI
jest.mock('@mui/material', () => {
  const originalModule = jest.requireActual('@mui/material')
  return {
    __esModule: true,
    ...originalModule,
    Snackbar: ({open, children}: {open: boolean; children: ReactNode}) =>
      open ? <div>{children}</div> : null,
    Alert: ({children}: {children: ReactNode}) => <div>{children}</div>,
  }
})

const TestComponent: React.FC = () => {
  const {showNotification} = useNotification()

  return (
    <div>
      <button onClick={() => showNotification('Test Success', 'success')}>
        Show Success Notification
      </button>
      <button onClick={() => showNotification('Test Error', 'error')}>
        Show Error Notification
      </button>
    </div>
  )
}

test('displays success notification', async () => {
  render(
    <NotificationProvider>
      <TestComponent />
    </NotificationProvider>,
  )

  fireEvent.click(screen.getByText('Show Success Notification'))
  await waitFor(() => {
    expect(screen.getByText('Test Success')).toBeInTheDocument()
  })
})

test('displays error notification', async () => {
  render(
    <NotificationProvider>
      <TestComponent />
    </NotificationProvider>,
  )

  fireEvent.click(screen.getByText('Show Error Notification'))
  await waitFor(() => {
    expect(screen.getByText('Test Error')).toBeInTheDocument()
  })
})
