import React from 'react'
import './App.css'
import { ApolloProvider } from '@apollo/client'
import client from './apolloClient'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Dashboard from './components/Dashboard'
import About from './components/About'
import Services from './components/Services'
import Contact from './components/Contact'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme'

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main style={{ flexGrow: 1 }}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
