"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Login from "./pages/Login"
import Register from "./pages/Register"
import EventList from "./pages/EventList"
import EventDetail from "./pages/EventDetail"
import EventForm from "./pages/EventForm"
import Dashboard from "./pages/Dashboard"

import PrivateRoute from "./components/PrivateRoute"

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")
    if (token && userData) {
      setUser(JSON.parse(userData))
    }
    setLoading(false)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/" element={<EventList />} />
        <Route path="/events/:id" element={<EventDetail user={user} />} />
        <Route
          path="/upload"
          element={
            <PrivateRoute user={user}>
              <EventForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/events/:id/edit"
          element={
            <PrivateRoute user={user}>
              <EventForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute user={user}>
              <Dashboard user={user} />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
