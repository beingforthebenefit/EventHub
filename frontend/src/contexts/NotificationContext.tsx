import React, {createContext, useContext, useState} from 'react'
import {Snackbar, Alert} from '@mui/material'

interface NotificationContextProps {
  showNotification: (message: string, severity: 'success' | 'error') => void
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined,
)

export const NotificationProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState<'success' | 'error'>('success')

  const showNotification = (message: string, severity: 'success' | 'error') => {
    setMessage(message)
    setSeverity(severity)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <NotificationContext.Provider value={{showNotification}}>
      {children}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{width: '100%'}}>
          {message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  )
}

export const useNotification = (): NotificationContextProps => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider',
    )
  }
  return context
}
