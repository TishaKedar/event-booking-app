"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import axios from "axios"
import EventCard from "../components/EventCard"

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`

const HeroSection = styled.section`
  background: var(--secondary-gradient);
  border-radius: var(--border-radius);
  padding: 4rem 2rem;
  text-align: center;
  margin-bottom: 3rem;
  box-shadow: var(--shadow-heavy);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="40" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="80" r="1.5" fill="rgba(255,255,255,0.1)"/></svg>');
    opacity: 0.3;
  }
`

const HeroTitle = styled.h1`
  color: white;
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  animation: fadeInUp 0.8s ease-out;
`

const HeroSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  margin-bottom: 2rem;
  animation: fadeInUp 1s ease-out;
`

const SearchSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius);
  padding: 2rem;
  margin-bottom: 3rem;
  border: 1px solid var(--glass-border);
`

const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 200px;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const SearchInput = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  backdrop-filter: blur(10px);

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
  }
`

const SearchButton = styled.button`
  background: var(--accent-gradient);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: var(--shadow-medium);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-heavy);
  }

  &:active {
    transform: translateY(0);
  }
`

const Title = styled.h2`
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 2.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`

const Loading = styled.div`
  text-align: center;
  padding: 4rem;
  color: #666;

  .spinner {
    margin: 0 auto 1rem;
  }
`

const LoadingText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`

const Error = styled.div`
  background: var(--danger-gradient);
  color: white;
  padding: 1.5rem;
  border-radius: var(--border-radius);
  text-align: center;
  box-shadow: var(--shadow-medium);
  margin: 2rem 0;
`

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`

const StatCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: var(--border-radius);
  text-align: center;
  box-shadow: var(--shadow-light);
  transition: var(--transition);
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-medium);
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

function EventList() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [filteredEvents, setFilteredEvents] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events")
        setEvents(response.data)
        setFilteredEvents(response.data)
      } catch (err) {
        setError("Failed to load events")
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  useEffect(() => {
    let filtered = events

    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (locationFilter) {
      filtered = filtered.filter(event =>
        event.location.toLowerCase().includes(locationFilter.toLowerCase())
      )
    }

    setFilteredEvents(filtered)
  }, [searchTerm, locationFilter, events])

  const totalEvents = events.length
  const totalAttendees = events.reduce((sum, event) => sum + event.currentAttendees, 0)
  const upcomingEvents = events.filter(event => new Date(event.eventDate) > new Date()).length

  if (loading) return (
    <Container>
      <Loading>
        <div className="spinner"></div>
        <LoadingText>Loading amazing events...</LoadingText>
      </Loading>
    </Container>
  )

  if (error) return (
    <Container>
      <Error>{error}</Error>
    </Container>
  )

  return (
    <Container>
      <HeroSection>
        <HeroTitle>Discover Amazing Events</HeroTitle>
        <HeroSubtitle>Join thousands of people creating unforgettable experiences</HeroSubtitle>
      </HeroSection>

      <StatsSection>
        <StatCard>
          <StatNumber>{totalEvents}</StatNumber>
          <StatLabel>Total Events</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{totalAttendees}</StatNumber>
          <StatLabel>Happy Attendees</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{upcomingEvents}</StatNumber>
          <StatLabel>Upcoming Events</StatLabel>
        </StatCard>
      </StatsSection>

      <SearchSection>
        <SearchGrid>
          <SearchInput
            type="text"
            placeholder="🔍 Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchInput
            type="text"
            placeholder="📍 Filter by location..."
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
          <SearchButton>Search</SearchButton>
        </SearchGrid>
      </SearchSection>

      <Title>Featured Events</Title>
      <Grid>
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </Grid>

      {filteredEvents.length === 0 && (
        <Error>No events found matching your criteria. Try adjusting your search!</Error>
      )}
    </Container>
  )
}

export default EventList
