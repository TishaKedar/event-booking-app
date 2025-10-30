"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"

const Container = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: var(--accent-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
`

const FormCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius);
  padding: 3rem;
  box-shadow: var(--shadow-heavy);
  border: 1px solid var(--glass-border);
  width: 100%;
  max-width: 600px;
  animation: fadeInUp 0.8s ease-out;
`

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 0.5rem;
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const Subtitle = styled.p`
  text-align: center;
  color: #7f8c8d;
  margin-bottom: 2rem;
  font-size: 1rem;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const InputGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  color: #2c3e50;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
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
    border-color: #4facfe;
    box-shadow: 0 0 0 3px rgba(79, 172, 254, 0.1);
    background: white;
  }

  &::placeholder {
    color: #95a5a6;
  }
`

const Textarea = styled.textarea`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #e1e8ed;
  border-radius: 12px;
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  transition: var(--transition);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);

  &:focus {
    outline: none;
    border-color: #4facfe;
    box-shadow: 0 0 0 3px rgba(79, 172, 254, 0.1);
    background: white;
  }

  &::placeholder {
    color: #95a5a6;
  }
`

const InputIcon = styled.span`
  position: absolute;
  left: 1rem;
  top: 2.5rem;
  color: #95a5a6;
  font-size: 1.2rem;
  z-index: 1;
  pointer-events: none;
`

const TextareaIcon = styled.span`
  position: absolute;
  left: 1rem;
  top: 1.5rem;
  color: #95a5a6;
  font-size: 1.2rem;
  z-index: 1;
  pointer-events: none;
`

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background: var(--accent-gradient);
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

function EventForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventDate: "",
    location: "",
    maxAttendees: "",
    imageUrl: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (id) {
      const fetchEvent = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/events/${id}`)
          const event = response.data
          setFormData({
            title: event.title,
            description: event.description,
            eventDate: event.eventDate.split("T")[0],
            location: event.location,
            maxAttendees: event.maxAttendees,
            imageUrl: event.imageUrl,
          })
        } catch (err) {
          setError("Failed to load event")
        }
      }
      fetchEvent()
    }
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const token = localStorage.getItem("token")
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      if (id) {
        await axios.put(`http://localhost:5000/api/events/${id}`, formData, config)
      } else {
        await axios.post("http://localhost:5000/api/events", formData, config)
      }

      navigate("/dashboard")
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save event")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <FormCard>
        <Title>{id ? "✏️ Edit Event" : "🎉 Create New Event"}</Title>
        <Subtitle>{id ? "Update your event details" : "Share an amazing experience with others"}</Subtitle>
        {error && <Error>{error}</Error>}
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Event Title</Label>
            <InputIcon>🎪</InputIcon>
            <Input
              type="text"
              name="title"
              placeholder="Enter event title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Event Description</Label>
            <TextareaIcon>📝</TextareaIcon>
            <Textarea
              name="description"
              placeholder="Describe your event..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <FormGrid>
            <InputGroup>
              <Label>Event Date & Time</Label>
              <InputIcon>📅</InputIcon>
              <Input
                type="datetime-local"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Location</Label>
              <InputIcon>📍</InputIcon>
              <Input
                type="text"
                name="location"
                placeholder="Event location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </FormGrid>

          <FormGrid>
            <InputGroup>
              <Label>Max Attendees</Label>
              <InputIcon>👥</InputIcon>
              <Input
                type="number"
                name="maxAttendees"
                placeholder="Maximum attendees"
                value={formData.maxAttendees}
                onChange={handleChange}
                required
                min="1"
              />
            </InputGroup>

            <InputGroup>
              <Label>Event Image</Label>
              <InputIcon>🖼️</InputIcon>
              <Input
                type="url"
                name="imageUrl"
                placeholder="Image URL"
                value={formData.imageUrl}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </FormGrid>

          <Button type="submit" disabled={loading}>
            {loading && <LoadingSpinner />}
            {loading ? "Saving Event..." : (id ? "💾 Update Event" : "🚀 Create Event")}
          </Button>
        </Form>
      </FormCard>
    </Container>
  )
}

export default EventForm
