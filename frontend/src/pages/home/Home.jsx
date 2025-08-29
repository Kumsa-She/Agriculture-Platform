import React from 'react';
import './Home.css';

function Home() {
  return (
    <>
      <section className="hero">
        <div class="container hero-content">
          <h1>Empowering Farmers with Technology</h1>
          <p>
            Access real-time weather data, market prices, agricultural experts,
            and marketplace all in one platform designed for Ethiopian farmers.
          </p>
          <div class="hero-buttons">
            <a href="#" class="btn btn-outline">
              <i class="fas fa-info-circle"></i> Learn More
            </a>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="section-title">
            <i className="fas fa-seedling"></i>
            <h2>Our Services</h2>
            <p>Everything you need for successful farming in one place</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-cloud-sun-rain"></i>
              </div>
              <h3>Weather Intelligence</h3>
              <p>
                Get accurate weather forecasts and alerts to protect your crops
                from extreme conditions.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3>Market Prices</h3>
              <p>
                Access real-time market prices and trends to get the best value
                for your produce.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-user-graduate"></i>
              </div>
              <h3>Expert Connect</h3>
              <p>
                Connect with agricultural experts for advice on crops,
                livestock, and farming techniques.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-store"></i>
              </div>
              <h3>Direct Marketplace</h3>
              <p>
                Sell your products directly to buyers without middlemen for
                better profits.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <div className="section-title">
            <i className="fas fa-tractor"></i>
            <h2>How It Works</h2>
            <p>Simple steps to get started with AgriConnect</p>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Create Account</h3>
              <p>Register with your phone number or email address</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Set Preferences</h3>
              <p>Select your location, crops, and notification preferences</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Explore Features</h3>
              <p>Access weather, prices, experts, and marketplace</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Grow & Sell</h3>
              <p>Use insights to improve yields and sell directly to buyers</p>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <div className="section-title">
            <i className="fas fa-users"></i>
            <h2>What Farmers Say</h2>
            <p>Success stories from our community</p>
          </div>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <div className="testimonial-text">
                "AgriConnect's weather alerts helped me save my teff crop from
                unexpected heavy rains. The market prices feature also helped me
                get a better price for my harvest."
              </div>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  <i className="fas fa-user"></i>
                </div>
                <div>
                  <h4>Abebe Tesfaye</h4>
                  <p>Teff Farmer, Oromia</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-text">
                "I connected with an agricultural expert through AgriConnect who
                helped me implement better irrigation techniques. My yields have
                increased by 30% this season."
              </div>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  <i className="fas fa-user"></i>
                </div>
                <div>
                  <h4>Selamawit Mohammed</h4>
                  <p>Maize Farmer, Amhara</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-text">
                "The marketplace feature has transformed my business. I now sell
                directly to restaurants in Addis Ababa and earn twice what I
                used to get from local traders."
              </div>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  <i className="fas fa-user"></i>
                </div>
                <div>
                  <h4>Teklehaymanot Girma</h4>
                  <p>Vegetable Farmer, SNNPR</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq">
        <div className="container">
          <div className="section-title">
            <i className="fas fa-question-circle"></i>
            <h2>Frequently Asked Questions</h2>
            <p>Find answers to common questions about AgriConnect</p>
          </div>
          <div className="faq-list">
            <div className="faq-item">
              <div className="faq-question">
                <span>Is AgriConnect free to use?</span>
                <i className="fas fa-chevron-down"></i>
              </div>
              <div className="faq-answer">
                <p>
                  Yes, AgriConnect is completely free for farmers. Our basic
                  features including weather information, market prices, and
                  expert connect are available at no cost.
                </p>
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-question">
                <span>Do I need internet access to use AgriConnect?</span>
                <i className="fas fa-chevron-down"></i>
              </div>
              <div className="faq-answer">
                <p>
                  While our app works best with internet connection, we offer
                  SMS-based services for users with limited internet access. You
                  can receive weather alerts and price updates via SMS.
                </p>
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-question">
                <span>How often is market price data updated?</span>
                <i className="fas fa-chevron-down"></i>
              </div>
              <div className="faq-answer">
                <p>
                  Market prices are updated daily from various regional markets
                  across Ethiopia. Our team verifies these prices to ensure
                  accuracy.
                </p>
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-question">
                <span>Can I use AgriConnect in my local language?</span>
                <i className="fas fa-chevron-down"></i>
              </div>
              <div className="faq-answer">
                <p>
                  Yes, AgriConnect supports multiple languages including
                  Amharic, Oromo, and English. You can change the language
                  preference anytime in the app settings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
