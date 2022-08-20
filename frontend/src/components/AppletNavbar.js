import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'

export function AppletNavbar({ logoutHandler }) {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Login-app</Navbar.Brand>
          <Nav className="justify-content-end">
            <Button variant="outline-danger" onClick={() => navigate(-1)}>Logout</Button>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}