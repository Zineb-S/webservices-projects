import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';
const NavBar = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const handleLogout = () => {
    localStorage.removeItem('userId');
  
    navigate('/'); // Redirect to home page after logout
  };
  return (
    <>
    
    <Navbar key={"xl"} expand={"xl"}  bg="dark" data-bs-theme="dark" className="bg-body-tertiary mb-3">
    <Container fluid>
    <Navbar.Brand href="/">Home</Navbar.Brand>
    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-xl`} />
    <Navbar.Offcanvas
    id={`offcanvasNavbar-expand-xl`}
    aria-labelledby={`offcanvasNavbarLabel-expand-xl`}
    placement="end"
    >
    <Offcanvas.Header closeButton>
    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-xl`}>
    Offcanvas
    </Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
    <Nav className="justify-content-end flex-grow-1 pe-3">
    
    
    {userId && (
      
      <>
      <Nav.Link href="/posts">Feed</Nav.Link>
      <Nav.Link href="/users">Users</Nav.Link>
      <Nav.Link href="/user-posts">Posts</Nav.Link>
      <Nav.Link href="/profile">Profile</Nav.Link>
      <Nav.Link onClick={handleLogout}>Logout</Nav.Link></>
      )}
      {!userId && (<><Nav.Link href="/signup">Sign up</Nav.Link><Nav.Link href="/login">Log In</Nav.Link></>)}
      </Nav>
      {userId && (
      <Form className="d-flex">
      <Form.Control
      type="search"
      placeholder="Search"
      className="me-2"
      aria-label="Search"
      />
      <Button variant="outline-danger">Search</Button>
      </Form> )}
      
      </Offcanvas.Body>
      </Navbar.Offcanvas>
      </Container>
      </Navbar>
      
      </>
      
      )
    }
    
    export default NavBar