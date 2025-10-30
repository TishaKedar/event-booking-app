"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: var(--secondary-gradient);
`

const FormCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius);
  padding: 3rem;
  box-shadow: var(--shadow-heavy);
  border: 1px solid var(--glass-border);
  width: 100%;
  max-width: 400px;
  animation: fadeInUp 0.8s ease-out;
`

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 0.5rem;
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  background: var(--secondary-gradient);
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

const LinkText = styled.p`
  text-align: center;
  margin-top: 2rem;
  color: #7f8c8d;

  a {
    color: #f093fb;
    text-decoration: none;
    font-weight: 600;
    transition: var(--transition);

    &:hover {
      color: #f5576c;
      text-decoration: underline;
    }
  }
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

function Register({ setUser }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      })

      if (response.data.success) {
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("user", JSON.stringify(response.data.user))
        setUser(response.data.user)
        navigate("/")
      } else {
        setError(response.data.message)
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <FormCard>
        <Title>Join EventHub! 🎊</Title>
        <Subtitle>Create your account and start exploring amazing events</Subtitle>
        {error && <Error>{error}</Error>}
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <InputIcon>👤</InputIcon>
            <Input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <InputIcon>📧</InputIcon>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <InputIcon>🔒</InputIcon>
            <Input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>
          <Button type="submit" disabled={loading}>
            {loading && <LoadingSpinner />}
            {loading ? "Creating Account..." : "🎉 Create Account"}
          </Button>
        </Form>
        <LinkText>
          Already have an account? <Link to="/login">Sign in here ✨</Link>
        </LinkText>
      </FormCard>
    </Container>
  )
}

export default Register
