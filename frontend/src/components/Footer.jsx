import styled from "styled-components"

const FooterContainer = styled.footer`
  background: var(--primary-gradient);
  color: white;
  text-align: center;
  padding: 3rem 2rem;
  margin-top: 4rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--glass-border);
  }
`

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const Logo = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #fff, #f0f8ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const Description = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
  font-size: 1rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`

const LinksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`

const LinkSection = styled.div`
  text-align: left;

  @media (max-width: 768px) {
    text-align: center;
  }
`

const SectionTitle = styled.h3`
  color: white;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
`

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const LinkItem = styled.li`
  margin-bottom: 0.5rem;
`

const FooterLink = styled.a`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: var(--transition);
  font-size: 0.9rem;

  &:hover {
    color: white;
    text-decoration: underline;
  }
`

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: white;
  text-decoration: none;
  transition: var(--transition);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);

  &:hover {
    transform: translateY(-3px);
    background: rgba(255, 255, 255, 0.2);
    box-shadow: var(--shadow-medium);
  }
`

const Copyright = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  padding-top: 2rem;
  border-top: 1px solid var(--glass-border);
`

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <Logo>🎉 EventHub</Logo>
        <Description>
          Discover, create, and join amazing events in your community.
          Connect with people who share your interests and create unforgettable memories together.
        </Description>

        <LinksGrid>
          <LinkSection>
            <SectionTitle>🎯 Platform</SectionTitle>
            <LinkList>
              <LinkItem><FooterLink href="/">Browse Events</FooterLink></LinkItem>
              <LinkItem><FooterLink href="/upload">Create Event</FooterLink></LinkItem>
              <LinkItem><FooterLink href="/dashboard">Dashboard</FooterLink></LinkItem>
            </LinkList>
          </LinkSection>

          <LinkSection>
            <SectionTitle>📞 Support</SectionTitle>
            <LinkList>
              <LinkItem><FooterLink href="#">Help Center</FooterLink></LinkItem>
              <LinkItem><FooterLink href="#">Contact Us</FooterLink></LinkItem>
              <LinkItem><FooterLink href="#">Community Guidelines</FooterLink></LinkItem>
            </LinkList>
          </LinkSection>

          <LinkSection>
            <SectionTitle>🏢 Company</SectionTitle>
            <LinkList>
              <LinkItem><FooterLink href="#">About Us</FooterLink></LinkItem>
              <LinkItem><FooterLink href="#">Careers</FooterLink></LinkItem>
              <LinkItem><FooterLink href="#">Press</FooterLink></LinkItem>
            </LinkList>
          </LinkSection>
        </LinksGrid>

        <SocialLinks>
          <SocialLink href="#" aria-label="Facebook">📘</SocialLink>
          <SocialLink href="#" aria-label="Twitter">🐦</SocialLink>
          <SocialLink href="#" aria-label="Instagram">📷</SocialLink>
          <SocialLink href="#" aria-label="LinkedIn">💼</SocialLink>
        </SocialLinks>

        <Copyright>
          <p>&copy; 2025 EventHub. All rights reserved. Made with ❤️ for event lovers everywhere.</p>
        </Copyright>
      </FooterContent>
    </FooterContainer>
  )
}

export default Footer
