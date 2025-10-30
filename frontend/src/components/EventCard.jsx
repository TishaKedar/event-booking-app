import { Link } from "react-router-dom";
import styled from "styled-components";

const Card = styled.div`
  background: white;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow-light);
  transition: var(--transition);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  animation: fadeInUp 0.6s ease-out;

  &:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-heavy);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: var(--transition);

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h3`
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
`;

const Location = styled.p`
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;

  &::before {
    content: '📍';
    margin-right: 0.5rem;
  }
`;

const EventDate = styled.p`
  color: #3498db;
  font-weight: bold;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;

  &::before {
    content: '📅';
    margin-right: 0.5rem;
  }
`;

const Attendees = styled.p`
  color: #95a5a6;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;

  &::before {
    content: '👥';
    margin-right: 0.5rem;
  }
`;

const ViewButton = styled(Link)`
  display: inline-block;
  background: var(--primary-gradient);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  transition: var(--transition);
  font-weight: 500;
  box-shadow: var(--shadow-light);
  position: relative;
  overflow: hidden;

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
    box-shadow: var(--shadow-medium);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  background: var(--accent-gradient);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  box-shadow: var(--shadow-light);
  z-index: 2;
`;

const CapacityBar = styled.div`
  width: 100%;
  height: 4px;
  background: #ecf0f1;
  border-radius: 2px;
  margin-bottom: 1rem;
  overflow: hidden;
`;

const CapacityFill = styled.div`
  height: 100%;
  background: ${props => {
    const percentage = (props.current / props.max) * 100;
    if (percentage >= 90) return 'var(--danger-gradient)';
    if (percentage >= 70) return 'var(--warning-gradient)';
    return 'var(--success-gradient)';
  }};
  width: ${props => (props.current / props.max) * 100}%;
  transition: width 0.3s ease;
`;

function EventCard({ event }) {
  const eventDate = new Date(event.eventDate).toLocaleDateString();
  const capacityPercentage = (event.currentAttendees / event.maxAttendees) * 100;
  const isPopular = event.currentAttendees > event.maxAttendees * 0.8;
  const isNew = new Date(event.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // Last 7 days

  return (
    <Card className="card-hover">
      {isPopular && <Badge>🔥 Popular</Badge>}
      {isNew && <Badge>✨ New</Badge>}
      <Image src={event.imageUrl || "/placeholder.svg"} alt={event.title} />
      <Content>
        <Title>{event.title}</Title>
        <Location>{event.location}</Location>
        <EventDate>{eventDate}</EventDate>
        <CapacityBar>
          <CapacityFill current={event.currentAttendees} max={event.maxAttendees} />
        </CapacityBar>
        <Attendees>
          {event.currentAttendees}/{event.maxAttendees} Attendees
          {capacityPercentage >= 90 && " ⚠️ Almost Full"}
        </Attendees>
        <ViewButton to={`/events/${event.id}`}>View Details</ViewButton>
      </Content>
    </Card>
  );
}

export default EventCard;
