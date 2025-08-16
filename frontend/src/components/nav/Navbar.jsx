import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { Image } from 'react-bootstrap';
import {
  Navbar as BootstrapNavbar,
  Container,
  Form,
  FormControl,
  Button,
  Nav,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <BootstrapNavbar
      className="custom-navbar"
      variant="dark"
      expand="lg"
      expanded={expanded}
      onToggle={(isExpanded) => setExpanded(isExpanded)}
    >
      <Container
        fluid
        className="d-flex justify-content-between align-items-center container"
      >
        <BootstrapNavbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center"
        >
          <Image src={logo} alt="Logo" className="logo" />
        </BootstrapNavbar.Brand>

        {/* Mobile menu trigger button - hidden when expanded */}
        {!expanded && (
          <Button
            variant="link"
            className="d-lg-none mobile-menu-trigger"
            onClick={() => setExpanded(true)}
            aria-label="Toggle navigation"
          >
            <i className="fa-solid fa-bars"></i>
          </Button>
        )}

        <BootstrapNavbar.Collapse
          id="responsive-navbar-nav"
          className="collapse-style"
        >
          {/* Close button for mobile menu */}
          <Button
            variant="link"
            className="close-btn d-lg-none"
            onClick={() => setExpanded(false)}
            aria-label="Close menu"
          >
            <i className="fa-solid fa-xmark"></i>
          </Button>

          <div className="me-auto d-flex align-items-center gap-5 pl-5">
            <Form
              inline
              className="my-2 my-lg-0 d-none d-lg-flex navbar-search-form"
            >
              <FormControl
                type="text"
                placeholder=" search here ..."
                className="mr-sm-2 navbar-search-input"
              />
            </Form>
          </div>

          <div className="link left">
            <Nav className="d-lg-none py-2">
              <Nav.Link
                as={Link}
                to="/home"
                className="link-small-screen"
                onClick={() => setExpanded(false)}
              >
                <span aria-label="home">
                  <i className="fa-regular fa-house"></i> Home
                </span>
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/weather"
                className="link-small-screen"
                onClick={() => setExpanded(false)}
              >
                <span role="img" aria-label="weather">
                  <i className="fa-solid fa-cloud-showers-heavy"></i> Weather
                </span>
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/shop"
                className="link-small-screen"
                onClick={() => setExpanded(false)}
              >
                <span role="img" aria-label="shop">
                  <i className="fa-solid fa-cart-plus"></i> Shop
                </span>
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/support"
                className="link-small-screen"
                onClick={() => setExpanded(false)}
              >
                <span role="img" aria-label="support">
                  <i className="fa-solid fa-headset"></i> Support
                </span>
              </Nav.Link>
              <Form inline className="py-2 small-search">
                <FormControl
                  type="text"
                  placeholder="Search..."
                  className="navbar-search-input"
                />
              </Form>
            </Nav>
          </div>

          <div className="d-none d-lg-flex gap-4 px-3">
            <Link to="/home" className="text-decoration-none">
              <span aria-label="home" className="legular_navigation">
                <i className="fa-regular fa-house"></i>
              </span>
            </Link>
            <Link to="/weather" className="text-decoration-none">
              <span
                role="img"
                aria-label="weather"
                className="legular_navigation"
              >
                <i className="fa-solid fa-cloud-showers-heavy"></i>
              </span>
            </Link>
            <Link to="/shop" className="text-decoration-none">
              <span role="img" aria-label="shop" className="legular_navigation">
                <i className="fa-solid fa-cart-plus"></i>
              </span>
            </Link>
            <Link to="/support" className="text-decoration-none">
              <span
                role="img"
                aria-label="support"
                className="legular_navigation"
              >
                <i className="fa-solid fa-headset"></i>
              </span>
            </Link>
          </div>

          <div className="link right">
            <div className="d-flex align-items-center gap-2">
              <Link to="/settings" className="text-decoration-none">
                <span
                  role="img"
                  aria-label="settings"
                  className="legular_navigation"
                >
                  <i className="fa-solid fa-gear"></i>
                </span>
              </Link>
              <Link to="/profile" className="d-md-block text-decoration-none">
                <span
                  role="img"
                  aria-label="profile"
                  className="legular_navigation"
                >
                  <i className="fa-solid fa-user"></i>
                </span>
                <span className="d-none d-md-inline profile">Name</span>
              </Link>
              <Link to="/pricing" className="d-md-block text-decoration-none">
                <span
                  role="img"
                  aria-label="globe"
                  className="legular_navigation"
                >
                  <i className="fa-solid fa-globe"></i>
                </span>
              </Link>
            </div>
          </div>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
