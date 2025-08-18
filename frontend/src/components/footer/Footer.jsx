import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaInfoCircle, FaCookieBite } from 'react-icons/fa';
import Logo from '../../assets/farmer.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer className=" text-dark color-text-5 pb-3 footer-container">
      <Container fluid>
        <Row className="g-5">
          {/* Brand Column with Logo */}
          <Col lg={4} md={12} className="mb-4">
            <div className="d-flex align-items-center">
              <img
                src={Logo}
                alt="Farmer Support Platform Logo"
                className="footer-logo"
              />
              <div>
                <h3 className=" fw-bold mb-1 h-farm-footer">
                  Farmer Support Platform
                </h3>
                <p className="mb-0 color-text">
                  Empowering Ethiopian agriculture through technology
                </p>
              </div>
            </div>
          </Col>

          {/* Platform Links Column */}
          <Col lg={2} md={3} sm={6} className="mb-4">
            <div className="px-md-5">
              <h4 className="footer_header fw-bold mb-3">Platform</h4>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="#" className="color-text text-decoration-none">
                    Features
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="color-text text-decoration-none">
                    Sign In
                  </a>
                </li>
                <li>
                  <a href="#" className="color-text text-decoration-none">
                    Get Started
                  </a>
                </li>
              </ul>
            </div>
          </Col>

          {/* Support Links Column */}
          <Col lg={2} md={6} sm={6} className="mb-4">
            <div className="px-md-5">
              <h4 className="footer_header fw-bold mb-3">Support</h4>
              <ul className="list-unstyled ">
                <li className="mb-2 ">
                  <a href="#" className="text-decoration-none color-text">
                    Help Center
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-decoration-none color-text">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-decoration-none color-text">
                    Community
                  </a>
                </li>
              </ul>
            </div>
          </Col>

          {/* Legal Links Column */}
          <Col lg={4} md={12} className="mb-4">
            <div className="px-md-5">
              <h4 className="footer_header fw-bold mb-3">Legal</h4>
              <ul className="list-unstyled ">
                <li className="mb-2 d-flex align-items-center">
                  <FaInfoCircle className="me-2 text-muted" />
                  <a href="#" className="text-decoration-none color-text">
                    Privacy Policy
                  </a>
                </li>
                <li className="mb-2 d-flex align-items-center">
                  <FaInfoCircle className="me-2 text-muted" />
                  <a href="#" className="text-decoration-none color-text">
                    Terms of Service
                  </a>
                </li>
                <li className="d-flex align-items-center">
                  <FaCookieBite className="me-2 text-muted" />
                  <a href="#" className="text-decoration-none color-text">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>

        <hr
          className="bg-secondary my-3"
          style={{ backgroundColor: '#605D5D' }}
        />

        <Row>
          <Col className="text-center">
            <p className="mb-0 color-text">
              © 2025 Farmer Support Platform. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
