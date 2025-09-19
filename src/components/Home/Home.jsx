import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    projects: 0,
    clients: 0,
    experience: 0,
    satisfaction: 0,
  });

  // Hero slider data
  const heroSlides = [
    {
      title: "Transform Your Digital Presence",
      subtitle: "Strategic Marketing Solutions",
      description:
        "We help businesses grow through innovative digital marketing strategies that drive real results and maximize ROI.",
      cta: "Start Your Journey",
    },
    {
      title: "Data-Driven Marketing Excellence",
      subtitle: "Performance That Matters",
      description:
        "Leverage advanced analytics and proven strategies to reach your target audience and achieve measurable growth.",
      cta: "See Our Results",
    },
    {
      title: "Your Success Is Our Mission",
      subtitle: "Partnership-Focused Approach",
      description:
        "We don't just provide services – we become your strategic partner in building a powerful digital ecosystem.",
      cta: "Partner With Us",
    },
  ];

  // Stats data
  const stats = [
    { label: "Projects Completed", value: 500, suffix: "+" },
    { label: "Happy Clients", value: 250, suffix: "+" },
    { label: "Years Experience", value: 8, suffix: "+" },
    { label: "Client Satisfaction", value: 98, suffix: "%" },
  ];

  // Services preview data
  const servicesPreview = [
    {
      icon: "📱",
      title: "Social Media Marketing",
      description:
        "Engage your audience across all major platforms with strategic content and targeted campaigns.",
    },
    {
      icon: "🎯",
      title: "PPC Advertising",
      description:
        "Maximize your ROI with data-driven pay-per-click campaigns that convert visitors into customers.",
    },
    {
      icon: "🔍",
      title: "SEO Optimization",
      description:
        "Improve your search rankings and drive organic traffic with our proven SEO strategies.",
    },
    {
      icon: "📊",
      title: "Analytics & Insights",
      description:
        "Make informed decisions with comprehensive reporting and actionable business intelligence.",
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "Marketing Director",
      company: "TechCorp Solutions",
      content:
        "MUTE Marketing transformed our digital presence completely. Our lead generation increased by 300% in just 6 months.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      position: "CEO",
      company: "Growth Ventures",
      content:
        "Professional, results-driven, and incredibly knowledgeable. They've become an essential part of our growth strategy.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      position: "Founder",
      company: "Creative Studio",
      content:
        "The ROI we've seen from their campaigns is exceptional. They truly understand our business and deliver results.",
      rating: 5,
    },
  ];

  // Hero slider effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Fade in effect on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Counter animation effect
  useEffect(() => {
    const animateCounters = () => {
      stats.forEach((stat, index) => {
        let start = 0;
        const end = stat.value;
        const duration = 2000;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            start = end;
            clearInterval(timer);
          }

          setCounters((prev) => ({
            ...prev,
            [index === 0
              ? "projects"
              : index === 1
              ? "clients"
              : index === 2
              ? "experience"
              : "satisfaction"]: Math.floor(start),
          }));
        }, 16);
      });
    };

    const timeout = setTimeout(animateCounters, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? "filled" : ""}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className={`hero ${isVisible ? "visible" : ""}`}>
        <div className="hero-background">
          <div className="hero-overlay"></div>
          <div className="hero-pattern"></div>
        </div>

        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <span className="hero-badge">Digital Marketing Agency</span>
              <h1 className="hero-title">{heroSlides[currentSlide].title}</h1>
              <h2 className="hero-subtitle">
                {heroSlides[currentSlide].subtitle}
              </h2>
              <p className="hero-description">
                {heroSlides[currentSlide].description}
              </p>
              <div className="hero-buttons">
                <Link to="/contact" className="btn btn-primary">
                  {heroSlides[currentSlide].cta}
                </Link>
                <Link to="/portfolio" className="btn btn-outline">
                  View Our Work
                </Link>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-logo-container">
                <img
                  src="/logo.png"
                  alt="MUTE Marketing"
                  className="hero-logo"
                />
                <div className="logo-glow"></div>
              </div>
            </div>
          </div>

          {/* Hero Slider Indicators */}
          <div className="hero-indicators">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`indicator ${
                  index === currentSlide ? "active" : ""
                }`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">
                  {index === 0
                    ? counters.projects
                    : index === 1
                    ? counters.clients
                    : index === 2
                    ? counters.experience
                    : counters.satisfaction}
                  <span className="stat-suffix">{stat.suffix}</span>
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="services-preview section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Our Core Services</h2>
            <p className="section-description">
              We provide comprehensive digital marketing solutions tailored to
              your business needs
            </p>
          </div>

          <div className="services-grid">
            {servicesPreview.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <Link to="/services" className="service-link">
                  Learn More →
                </Link>
              </div>
            ))}
          </div>

          <div className="services-cta text-center">
            <Link to="/services" className="btn btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us section bg-dark">
        <div className="container">
          <div className="choose-us-content">
            <div className="choose-us-text">
              <h2>Why Choose MUTE Marketing?</h2>
              <div className="features-list">
                <div className="feature-item">
                  <span className="feature-icon">✓</span>
                  <div>
                    <h4>Proven Track Record</h4>
                    <p>
                      Over 500+ successful campaigns with measurable results
                    </p>
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">✓</span>
                  <div>
                    <h4>Data-Driven Approach</h4>
                    <p>
                      Every strategy is backed by comprehensive analytics and
                      insights
                    </p>
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">✓</span>
                  <div>
                    <h4>Dedicated Support</h4>
                    <p>
                      24/7 customer support and dedicated account management
                    </p>
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">✓</span>
                  <div>
                    <h4>Transparent Reporting</h4>
                    <p>Regular updates and detailed performance reports</p>
                  </div>
                </div>
              </div>
              <Link to="/about" className="btn btn-outline">
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials section">
        <div className="container">
          <div className="section-header text-center">
            <h2>What Our Clients Say</h2>
            <p className="section-description">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-content">
                  <div className="testimonial-stars">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="testimonial-text">"{testimonial.content}"</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-info">
                    <h4 className="author-name">{testimonial.name}</h4>
                    <p className="author-position">{testimonial.position}</p>
                    <p className="author-company">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content text-center">
            <h2>Ready to Grow Your Business?</h2>
            <p>
              Let's discuss how we can help you achieve your digital marketing
              goals
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                Get Free Consultation
              </Link>
              <Link to="/portfolio" className="btn btn-white">
                View Case Studies
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
