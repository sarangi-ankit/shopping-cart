import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Navigation = ({ cartItems }) => {
  const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0); // Calculate total quantity

  const handleLogout = () => {
    // Clear user data from localStorage (simulate logout)
    localStorage.removeItem('userData');
    // Redirect to login page or update authentication state as needed
    // For demonstration purposes, you can redirect to home
    window.location.href = '/';
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm px-4">
      <Navbar.Brand href="#home" className="font-weight-bold">SHOPLANE</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="m-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#clothing">Clothings</Nav.Link>
          <Nav.Link href="#accessories">Accessories</Nav.Link>
        </Nav>
        <Nav className="ml-auto gap-2">
          
            <NavLink to="/cart">
            <Button className="">
              <FaShoppingCart /> {cartQuantity > 0 && <span className="badge bg-red">{cartQuantity}</span>}
              </Button>
           </NavLink> 
          
          <Button variant="" onClick={handleLogout}>
            <FaUser /> Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
