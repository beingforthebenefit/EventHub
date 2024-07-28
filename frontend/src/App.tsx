import React from 'react'
import './App.css'
import {ApolloProvider} from '@apollo/client'
import client from './apolloClient'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Dashboard from '@/components/Dashboard'
import About from '@/components/About'
import Services from '@/components/Services'
import Contact from '@/components/Contact'
import EventList from '@/components/EventList'
import EventDetail from '@/components/EventDetail'
import Register from '@/components/Register'
import Login from '@/components/Login'
import RegisterEvent from '@/components/RegisterEvent'
import {ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme'
import {NotificationProvider} from './contexts/NotificationContext'

const PrivateRoute = ({children}: {children: React.ReactNode}) => {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" />
}

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NotificationProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main style={{flexGrow: 1}}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/events" element={<EventList />} />
                  <Route path="/events/:id" element={<EventDetail />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/register-event"
                    element={
                      <PrivateRoute>
                        <RegisterEvent />
                      </PrivateRoute>
                    }
                  />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </NotificationProvider>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
