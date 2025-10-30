"use client"

import { Link } from "react-router-dom"
import styled from "styled-components"

const NavbarContainer = styled.nav`
  background: var(--primary-gradient);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--glass-border);
  padding: 1rem 2rem;
  box-shadow: var(--shadow-medium);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: var(--transition);
`

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled(Link)`
  color: white;
  font-size: 1.8rem;
  font-weight: bold;
  text-decoration: none;
  background: linear-gradient(45deg, #fff, #f0f8ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: var(--transition);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--accent-gradient);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  &:hover {
    transform: scale(1.05);
  }
`

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`

const NavLink = styled(Link)`
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 500;
  transition: var(--transition);
  position: relative;
  padding: 0.5rem 1rem;
  border-radius: 8px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--glass-bg);
    border-radius: 8px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    color: white;
    transform: translateY(-2px);

    &::before {
      opacity: 1;
    }
  }
`

const Button = styled.button`
  background: var(--danger-gradient);
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: var(--transition);
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
`

function Navbar({ user, onLogout }) {
  return (
    <NavbarContainer className="glass">
      <NavContent>
        <Logo to="/">🎉 EventHub</Logo>
        <NavLinks>
          <NavLink to="/">🏠 Browse Events</NavLink>
          {user ? (
            <>
              <NavLink to="/upload">➕ Create Event</NavLink>
              <NavLink to="/dashboard">📊 Dashboard</NavLink>
              <Button onClick={onLogout}>🚪 Logout</Button>
            </>
          ) : (
            <>
              <NavLink to="/login">🔐 Login</NavLink>
              <NavLink to="/register">✨ Register</NavLink>
            </>
          )}
        </NavLinks>
      </NavContent>
    </NavbarContainer>
  )
}

export default Navbar
