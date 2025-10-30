"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"

const Container = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: var(--secondary-gradient);
`

const EventCard = styled.div`
  max-width: 900px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-heavy);
  border: 1px solid var(--glass-border);
  animation: fadeInUp 0.8s ease-out;
  overflow: hidden;
`

const Image = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  transition: var(--transition);

  ${EventCard}:hover & {
    transform: scale(1.02);
  }
`

const Content = styled.div`
  padding: 2rem;
`

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 2.5rem;
  font-weight: bold;
  background: var(--secondary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const InfoItem = styled.div`
  background: rgba(102, 126, 234, 0.1);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(102, 126, 234, 0.2);
  transition: var(--transition);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-medium);
  }
`

const InfoLabel = styled.span`
  color: #7f8c8d;
  font-size: 0.9rem;
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const InfoValue = styled.span`
  color: #2c3e50;
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  align-items: center;

  &::before {
    content: attr(data-icon);
    margin-right: 0.5rem;
    font-size: 1.4rem;
  }
`

const Description = styled.div`
  color: #34495e;
  line-height: 1.7;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  background: rgba(255, 255, 255, 0.5);
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 4px solid var(--secondary-gradient);
`

const HighlightsSection = styled.div`
  margin-bottom: 2rem;
`

const HighlightsTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;

  &::before {
    content: '✨';
    margin-right: 0.5rem;
  }
`

const HighlightsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
`

const Highlight = styled.div`
  background: var(--accent-gradient);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  transition: var(--transition);

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-medium);
  }
`

const CapacitySection = styled.div`
  margin-bottom: 2rem;
`

const CapacityTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;

  &::before {
    content: '📊';
    margin-right: 0.5rem;
  }
`

const ProgressContainer = styled.div`
  background: #ecf0f1;
  border-radius: 25px;
  padding: 1rem;
  margin-bottom: 1rem;
`

const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background: #bdc3c7;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
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
  transition: width 0.8s ease;
  border-radius: 6px;
`

const CapacityText = styled.div`
  text-align: center;
  color: #2c3e50;
  font-weight: 600;
  font-size: 1.1rem;
`

const BookingForm = styled.form`
  background: rgba(240, 147, 251, 0.1);
  padding: 2rem;
  border-radius: var(--border-radius);
  border: 2px solid rgba(240, 147, 251, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const FormTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '🎫';
    margin-right: 0.5rem;
  }
`

const InputGroup = styled.div`
  position: relative;
`

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #e1e8ed;
  border-radius: 12px;
  font-size: 1rem;
  transition: var(--transition);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);

  &:focus {
    outline: none;
    border-color: #f093fb;
    box-shadow: 0 0 0 3px rgba(240, 147, 251, 0.1);
    background: white;
  }

  &::placeholder {
    color: #95a5a6;
  }
`

const InputIcon = styled.span`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #95a5a6;
  font-size: 1.2rem;
  z-index: 1;
`

const Textarea = styled.textarea`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #e1e8ed;
  border-radius: 12px;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  transition: var(--transition);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);

  &:focus {
    outline: none;
    border-color: #f093fb;
    box-shadow: 0 0 0 3px rgba(240, 147, 251, 0.1);
    background: white;
  }

  &::placeholder {
    color: #95a5a6;
  }
`

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background: var(--secondary-gradient);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-medium);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-heavy);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #95a5a6;
    cursor: not-allowed;
    transform: none;
    box-shadow: var(--shadow-light);
  }
`

const Error = styled.div`
  background: var(--danger-gradient);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
  box-shadow: var(--shadow-medium);
  animation: pulse 0.5s ease-in-out;
`

const Success = styled.div`
  background: var(--success-gradient);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
  box-shadow: var(--shadow-medium);
`

const LoginPrompt = styled.div`
  background: var(--warning-gradient);
  color: white;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  font-weight: 500;
  box-shadow: var(--shadow-medium);
`

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  margin-right: 0.5rem;
`

function EventDetail({ user }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    additionalInfo: "",
  })
  const [bookingLoading, setBookingLoading] = useState(false)
  const [bookingError, setBookingError] = useState("")
  const [bookingSuccess, setBookingSuccess] = useState("")

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${id}`)
        setEvent(response.data)
      } catch (err) {
        console.error("Failed to fetch event:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [id])

  const handleBookingChange = (e) => {
    const { name, value } = e.target
    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleBookingSubmit = async (e) => {
    e.preventDefault()
    setBookingError("")
    setBookingSuccess("")
    setBookingLoading(true)

    try {
      const token = localStorage.getItem("token")
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      await axios.post(`http://localhost:5000/api/bookings`, {
        eventId: id,
        ...bookingData,
      }, config)

      setBookingSuccess("🎉 Booking successful!")
      setBookingData({
        name: "",
        email: "",
        phone: "",
        additionalInfo: "",
      })
    } catch (err) {
      setBookingError(err.response?.data?.message || "Failed to book event")
    } finally {
      setBookingLoading(false)
    }
  }

  if (loading) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '4rem', color: 'white' }}>
          <div className="spinner" style={{ margin: '0 auto 1rem' }}></div>
          <p>Loading event details...</p>
        </div>
      </Container>
    )
  }

  if (!event) {
    return (
      <Container>
        <Error>Event not found</Error>
      </Container>
    )
  }

  const eventDate = new Date(event.eventDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  const isFull = event.currentAttendees >= event.maxAttendees
  const capacityPercentage = (event.currentAttendees / event.maxAttendees) * 100

  return (
    <Container>
      <EventCard>
        <Image src={event.imageUrl || "/placeholder.svg"} alt={event.title} />
        <Content>
          <Title>{event.title}</Title>

          <InfoGrid>
            <InfoItem>
              <InfoLabel>Date & Time</InfoLabel>
              <InfoValue data-icon="📅">{eventDate}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Location</InfoLabel>
              <InfoValue data-icon="📍">{event.location}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Capacity</InfoLabel>
              <InfoValue data-icon="👥">{event.currentAttendees}/{event.maxAttendees} Attendees</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Organized by</InfoLabel>
              <InfoValue data-icon="👤">{event.createdByUserName}</InfoValue>
            </InfoItem>
          </InfoGrid>

          <Description>
            <h3 style={{ marginBottom: '1rem', color: '#2c3e50' }}>📝 About This Event</h3>
            {event.description}
          </Description>

          <HighlightsSection>
            <HighlightsTitle>Event Highlights</HighlightsTitle>
            <HighlightsGrid>
              <Highlight>🎯 Unique Experience</Highlight>
              <Highlight>👥 Great Community</Highlight>
              <Highlight>🎊 Fun Atmosphere</Highlight>
              <Highlight>⭐ Highly Rated</Highlight>
            </HighlightsGrid>
          </HighlightsSection>

          <CapacitySection>
            <CapacityTitle>Booking Status</CapacityTitle>
            <ProgressContainer>
              <ProgressBar>
                <ProgressFill current={event.currentAttendees} max={event.maxAttendees} />
              </ProgressBar>
            </ProgressContainer>
            <CapacityText>
              {event.currentAttendees} of {event.maxAttendees} spots filled
              {capacityPercentage >= 90 && " 🔥 Almost full!"}
            </CapacityText>
          </CapacitySection>

          {user ? (
            <>
              {isFull ? (
                <Error>😔 This event is full and no longer accepting bookings.</Error>
              ) : (
                <BookingForm onSubmit={handleBookingSubmit}>
                  <FormTitle>Book Your Spot</FormTitle>
                  {bookingError && <Error>{bookingError}</Error>}
                  {bookingSuccess && <Success>{bookingSuccess}</Success>}

                  <InputGroup>
                    <InputIcon>👤</InputIcon>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Your full name"
                      value={bookingData.name}
                      onChange={handleBookingChange}
                      required
                    />
                  </InputGroup>

                  <InputGroup>
                    <InputIcon>📧</InputIcon>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Your email address"
                      value={bookingData.email}
                      onChange={handleBookingChange}
                      required
                    />
                  </InputGroup>

                  <InputGroup>
                    <InputIcon>📱</InputIcon>
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="Your phone number"
                      value={bookingData.phone}
                      onChange={handleBookingChange}
                      required
                    />
                  </InputGroup>

                  <InputGroup>
                    <InputIcon>💬</InputIcon>
                    <Textarea
                      name="additionalInfo"
                      placeholder="Any special requests or additional information..."
                      value={bookingData.additionalInfo}
                      onChange={handleBookingChange}
                    />
                  </InputGroup>

                  <Button type="submit" disabled={bookingLoading}>
                    {bookingLoading && <LoadingSpinner />}
                    {bookingLoading ? "Processing..." : "🎫 Confirm Booking"}
                  </Button>
                </BookingForm>
              )}
            </>
          ) : (
            <LoginPrompt>
              🔐 Please log in to book this amazing event!
            </LoginPrompt>
          )}
        </Content>
      </EventCard>
    </Container>
  )
}

export default EventDetail
