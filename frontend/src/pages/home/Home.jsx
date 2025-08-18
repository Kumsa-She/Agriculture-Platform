import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import hero_img from '../../assets/hero_img.png';
import service_img from '../../assets/service_img.png';
import './Home.css';

function Home() {
  return (
    <section className="hero-section py-3 mt-5">
      <Container className="main-container" fluid>
        <Row className="align-items-center pt-5 my-5 hero-con">
          {/* Left Column - Content */}
          <Col lg={6} className="mb-4 mb-lg-0 pe-5">
            <h1 className="display-4 fw-bold mb-3 h-heading">
              Empowering <span className="highlight"> Oromia's Farmers</span>{' '}
              with Technology
            </h1>
            <p className="lead mb-4 p-text">
              Connect with agricultural experts, get real-time market prices,
              and access weather intelligence to maximize your harvest.
            </p>
            <div className="custom-btn-group d-flex gap-4">
              <Button className="btn-custom-primary">Get Started</Button>
              <Button className="btn-custom-secondary">Learn More</Button>
            </div>
          </Col>

          <Col lg={6} className="d-flex justify-content-center">
            <img
              src={hero_img}
              alt="Hero visual"
              className="img-fluid hero-img"
            />
          </Col>
        </Row>
        <section>
          <Row className="justify-content-center mb-3">
            <Col xs={12} md={10} lg={8}>
              <div className="overflow-hidden ">
                <img
                  src={service_img}
                  alt="service visual"
                  className="img-fluid custom-service-img"
                />
              </div>
            </Col>
          </Row>
        </section>
      </Container>
      <section className="metrics-section py-5 mt-4 impact-container">
        <Container fluid className="main-container">
          <h2 className="text-center mb-5 h-impact">Our Impact in Numbers</h2>
          <Row className="text-center">
            <Col md={3} className="mb-5  metric-column">
              <div className="metric-item">
                <div className="metric-value fw-bold">
                  <h1>1,247</h1>
                </div>
                <div className="metric-label">
                  <p>Active Farmers</p>
                </div>
              </div>
            </Col>
            <Col md={3} className="mb-5 metric-column">
              <div className="metric-item">
                <div className="metric-value  fw-bold">
                  <h1>89</h1>
                </div>
                <div className="metric-label">
                  <p>Expert Advisors</p>
                </div>
              </div>
            </Col>
            <Col md={3} className="mb-5 metric-column">
              <div className="metric-item">
                <div className="metric-value  fw-bold">
                  <h1>456</h1>
                </div>
                <div className="metric-label">
                  <p>Products Tracked</p>
                </div>
              </div>
            </Col>
            <Col md={3} className="mb-5 metric-column">
              <div className="metric-item">
                <div className="metric-value  fw-bold">
                  <h1>99.2%</h1>
                </div>
                <div className="metric-label">
                  <p>Uptime</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </section>
  );
}

export default Home;
