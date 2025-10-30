"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"

const Container = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: var(--primary-gradient);
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  animation: fadeInUp 0.8s ease-out;
`

const Title = styled.h1`
  color: white;
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
`

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const Section = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-heavy);
  border: 1px solid var(--glass-border);
  margin-bottom: 2rem;
  animation: fadeInUp 0.6s ease-out;
`

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 3px solid var(--primary-gradient);
`

const SectionTitle = styled.h2`
  color: #2c3e50;
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0;
`

const CreateButton = styled(Link)`
  background: var(--success-gradient);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: var(--transition);
  box-shadow: var(--shadow-medium);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-heavy);
    color: white;
  }

  &:active {
    transform: translateY(0);
  }
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow-light);

  th {
    background: var(--primary-gradient);
    color: white;
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    font-size: 0.9rem;
  }

  td {
    padding: 1rem;
    border-bottom: 1px solid #ecf0f1;
    font-size: 0.9rem;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover {
    background-color: rgba(102, 126, 234, 0.05);
  }
`

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  transition: var(--transition);

  &.edit {
    background: var(--warning-gradient);
    color: white;

    &:hover {
      transform: translateY(-1px);
      box-shadow: var(--shadow-medium);
    }
  }

  &.delete {
    background: var(--danger-gradient);
    color: white;

    &:hover {
      transform: translateY(-1px);
      box-shadow: var(--shadow-medium);
    }
  }
`

const Empty = styled.div`
  text-align: center;
  padding: 3rem;
  color: #7f8c8d;
  font-size: 1.1rem;

  .icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    display: block;
  }
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: var(--border-radius);
  text-align: center;
  box-shadow: var(--shadow-medium);
  border: 1px solid var(--glass-border);
  transition: var(--transition);
  animation: fadeInUp 0.6s ease-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-heavy);
  }
`

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
`

const StatLabel = styled.div`
  color: #666;
  font-size: 1rem;
  font-weight: 500;
`

const EventCard = styled.div`
  background: white;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--shadow-light);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: var(--transition);
  margin-bottom: 1rem;

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-medium);
  }
`

const EventTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`

const EventInfo = styled.div`
  display: flex;
  justify-content: space-between;
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: #ecf0f1;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 1rem;
`

const ProgressFill = styled.div`
  height: 100%;
  background: ${props => {
    const percentage = (props.current / props.max) * 100;
    if (percentage >= 90) return 'var(--danger-gradient)';
    if (percentage >= 70) return 'var(--warning-gradient)';
    return 'var(--success-gradient)';
  }};
  width: ${props => (props.current / props.max) * 100}%;
  transition: width 0.3s ease;
`

function Dashboard({ user }) {
  const [myEvents, setMyEvents] = useState([])
  const [myBookings, setMyBookings] = useState([])
  const [eventBookings, setEventBookings] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token")
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

        const eventsResponse = await axios.get("http://localhost:5000/api/events/user/my-events", config)
        const bookingsResponse = await axios.get("http://localhost:5000/api/bookings/my-bookings", config)

        setMyEvents(eventsResponse.data)
        setMyBookings(bookingsResponse.data)

        // Fetch bookings for each event
        const bookingsData = {}
        for (const event of eventsResponse.data) {
          try {
            const eventBookingsResponse = await axios.get(`http://localhost:5000/api/bookings/event/${event.id}`, config)
            bookingsData[event.id] = eventBookingsResponse.data
          } catch (err) {
            console.error(`Failed to fetch bookings for event ${event.id}:`, err)
          }
        }
        setEventBookings(bookingsData)
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const token = localStorage.getItem("token")
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

        await axios.delete(`http://localhost:5000/api/events/${eventId}`, config)
        setMyEvents(myEvents.filter(event => event.id !== eventId))
      } catch (err) {
        alert("Failed to delete event")
      }
    }
  }

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        const token = localStorage.getItem("token")
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

        await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, config)
        setMyBookings(myBookings.filter(booking => booking.id !== bookingId))
      } catch (err) {
        alert("Failed to cancel booking")
      }
    }
  }

  const totalEvents = myEvents.length
  const totalBookings = myEvents.reduce((sum, event) => sum + (eventBookings[event.id]?.length || 0), 0)
  const totalAttendees = myEvents.reduce((sum, event) => sum + event.currentAttendees, 0)

  if (loading) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '4rem', color: 'white' }}>
          <div className="spinner" style={{ margin: '0 auto 1rem' }}></div>
          <p>Loading your dashboard...</p>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <Header>
        <Title>🎯 Welcome back, {user?.name}!</Title>
        <Subtitle>Manage your events and bookings from your personal dashboard</Subtitle>
      </Header>

      <Content>
        <StatsGrid>
          <StatCard>
            <StatNumber>{totalEvents}</StatNumber>
            <StatLabel>My Events</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{totalBookings}</StatNumber>
            <StatLabel>Total Bookings</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{totalAttendees}</StatNumber>
            <StatLabel>Total Attendees</StatLabel>
          </StatCard>
        </StatsGrid>

        <Section>
          <SectionHeader>
            <SectionTitle>📅 My Events</SectionTitle>
            <CreateButton to="/upload">
              ➕ Create Event
            </CreateButton>
          </SectionHeader>

          {myEvents.length === 0 ? (
            <Empty>
              <span className="icon">🎪</span>
              You haven't created any events yet. Start by creating your first amazing event!
            </Empty>
          ) : (
            myEvents.map((event) => (
              <EventCard key={event.id}>
                <EventTitle>{event.title}</EventTitle>
                <EventInfo>
                  <span>📍 {event.location}</span>
                  <span>📅 {new Date(event.eventDate).toLocaleDateString()}</span>
                  <span>👥 {event.currentAttendees}/{event.maxAttendees}</span>
                </EventInfo>
                <ProgressBar>
                  <ProgressFill current={event.currentAttendees} max={event.maxAttendees} />
                </ProgressBar>
                <div>
                  <ActionButton
                    className="edit"
                    onClick={() => window.location.href = `/events/${event.id}/edit`}
                  >
                    ✏️ Edit
                  </ActionButton>
                  <ActionButton
                    className="delete"
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    🗑️ Delete
                  </ActionButton>
                </div>

                {/* Bookings for this event */}
                <div style={{ marginTop: '1rem' }}>
                  <h4 style={{ color: '#2c3e50', marginBottom: '0.5rem', fontSize: '1rem' }}>
                    📋 Recent Bookings ({eventBookings[event.id]?.length || 0})
                  </h4>
                  {eventBookings[event.id] && eventBookings[event.id].length > 0 ? (
                    <Table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Booked At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {eventBookings[event.id].slice(0, 3).map((booking) => (
                          <tr key={booking.id}>
                            <td>{booking.name}</td>
                            <td>{booking.email}</td>
                            <td>{new Date(booking.bookedAt).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <p style={{ color: '#7f8c8d', fontSize: '0.9rem', fontStyle: 'italic' }}>
                      No bookings yet
                    </p>
                  )}
                </div>
              </EventCard>
            ))
          )}
        </Section>

        <Section>
          <SectionHeader>
            <SectionTitle>🎫 My Bookings</SectionTitle>
          </SectionHeader>

          {myBookings.length === 0 ? (
            <Empty>
              <span className="icon">🎭</span>
              You haven't booked any events yet. Browse events and join the fun!
            </Empty>
          ) : (
            <Table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Booked At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {myBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td style={{ fontWeight: '600' }}>{booking.eventTitle}</td>
                    <td>{new Date(booking.eventDate).toLocaleDateString()}</td>
                    <td>{booking.eventLocation}</td>
                    <td>{new Date(booking.bookedAt).toLocaleDateString()}</td>
                    <td>
                      <ActionButton
                        className="delete"
                        onClick={() => handleCancelBooking(booking.id)}
                      >
                        ❌ Cancel
                      </ActionButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Section>
      </Content>
    </Container>
  )
}

export default Dashboard
