import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Contact.css";

const Contact = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    budget: "",
    message: "",
    timeline: "",
    source: "",
  });
  const [formStatus, setFormStatus] = useState("idle"); // idle, sending, success, error
  const [activeStep, setActiveStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [hoveredContact, setHoveredContact] = useState(null);

  // Contact methods data
  const contactMethods = [
    {
      id: "call",
      icon: "📞",
      title: "Schedule a Call",
      subtitle: "Free 30-min consultation",
      description:
        "Discuss your goals and get expert recommendations tailored to your business",
      action: "Book Now",
      availability: "Available Mon-Fri 9AM-6PM EST",
      responseTime: "Immediate scheduling",
      color: "#4ECDC4",
    },
    {
      id: "email",
      icon: "📧",
      title: "Send Us an Email",
      subtitle: "Detailed project inquiry",
      description:
        "Share your requirements and we'll craft a comprehensive proposal for you",
      action: "Get Proposal",
      availability: "24/7 submission",
      responseTime: "Response within 4 hours",
      color: "#45B7D1",
    },
    {
      id: "chat",
      icon: "💬",
      title: "Live Chat Support",
      subtitle: "Instant answers",
      description: "Quick questions? Chat with our marketing experts right now",
      action: "Start Chat",
      availability: "Live Mon-Fri 8AM-8PM EST",
      responseTime: "Instant response",
      color: "#96CEB4",
    },
    {
      id: "visit",
      icon: "📍",
      title: "Visit Our Office",
      subtitle: "Face-to-face meeting",
      description: "Meet our team in person and tour our creative workspace",
      action: "Get Directions",
      availability: "By appointment only",
      responseTime: "Same day confirmation",
      color: "#F7DC6F",
    },
  ];

  // Services options
  const serviceOptions = [
    { id: "seo", label: "SEO & Content Marketing", icon: "🔍" },
    { id: "ppc", label: "PPC & Paid Advertising", icon: "🎯" },
    { id: "social", label: "Social Media Marketing", icon: "📱" },
    { id: "web", label: "Web Design & Development", icon: "💻" },
    { id: "branding", label: "Branding & Design", icon: "🎨" },
    { id: "analytics", label: "Analytics & Optimization", icon: "📊" },
    { id: "ecommerce", label: "E-commerce Solutions", icon: "🛒" },
    { id: "consulting", label: "Marketing Consulting", icon: "💡" },
  ];

  // Budget ranges
  const budgetRanges = [
    {
      id: "startup",
      label: "$2K - $5K/month",
      description: "Perfect for startups and small businesses",
    },
    {
      id: "growth",
      label: "$5K - $15K/month",
      description: "Ideal for growing businesses",
    },
    {
      id: "scale",
      label: "$15K - $50K/month",
      description: "For scaling and established companies",
    },
    {
      id: "enterprise",
      label: "$50K+/month",
      description: "Enterprise-level solutions",
    },
    {
      id: "project",
      label: "One-time project",
      description: "Single project engagement",
    },
  ];

  // Timeline options
  const timelineOptions = [
    { id: "asap", label: "ASAP", description: "We need to start immediately" },
    {
      id: "1month",
      label: "Within 1 month",
      description: "Ready to begin within 30 days",
    },
    {
      id: "3months",
      label: "1-3 months",
      description: "Planning phase, flexible timeline",
    },
    {
      id: "planning",
      label: "Just exploring",
      description: "Gathering information and quotes",
    },
  ];

  // Office locations
  const officeLocations = [
    {
      id: "headquarters",
      name: "Headquarters",
      address: "123 Digital Avenue, Suite 500",
      city: "New York, NY 10001",
      phone: "+1 (555) 123-4567",
      email: "hello@mutemarketing.com",
      hours: "Mon-Fri: 9AM-6PM EST",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731668482413!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1635724914744!5m2!1sen!2sus",
      isPrimary: true,
    },
    {
      id: "satellite",
      name: "West Coast Office",
      address: "456 Innovation Blvd",
      city: "San Francisco, CA 94105",
      phone: "+1 (555) 987-6543",
      email: "west@mutemarketing.com",
      hours: "Mon-Fri: 9AM-6PM PST",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.9947533920234!2d-122.39860848482395!3d37.79273997975763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c7b7c7b7b%3A0x7b7b7b7b7b7b7b7b!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1635724914744!5m2!1sen!2sus",
      isPrimary: false,
    },
  ];

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Form handling
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceToggle = (serviceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
    setFormData((prev) => ({
      ...prev,
      service: selectedServices.includes(serviceId)
        ? prev.service.replace(serviceId, "").trim()
        : `${prev.service} ${serviceId}`.trim(),
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("sending");

    // Simulate form submission
    setTimeout(() => {
      setFormStatus("success");
      // Reset form after success
      setTimeout(() => {
        setFormStatus("idle");
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          service: "",
          budget: "",
          message: "",
          timeline: "",
          source: "",
        });
        setSelectedServices([]);
        setActiveStep(1);
      }, 3000);
    }, 2000);
  };

  const nextStep = () => {
    if (activeStep < 3) setActiveStep(activeStep + 1);
  };

  const prevStep = () => {
    if (activeStep > 1) setActiveStep(activeStep - 1);
  };

  const getStepProgress = () => {
    return ((activeStep - 1) / 2) * 100;
  };

  return (
    <div className="contact-page">
      {/* Interactive cursor */}
      <div
        className="contact-cursor-glow"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-particles"></div>
        <div className="container">
          <div className="contact-hero-content">
            <span className="contact-hero-badge">Let's Connect</span>
            <h1 className="contact-hero-title">
              Ready to
              <span className="contact-highlight-text">Transform</span>
              Your Business?
            </h1>
            <p className="contact-hero-description">
              Take the first step towards digital marketing success. Our experts
              are ready to craft a custom strategy that drives real results for
              your business.
            </p>

            <div className="contact-hero-stats">
              <div className="contact-stat-item">
                <span className="contact-stat-number">24h</span>
                <span className="contact-stat-label">Response Time</span>
              </div>
              <div className="contact-stat-item">
                <span className="contact-stat-number">Free</span>
                <span className="contact-stat-label">Consultation</span>
              </div>
              <div className="contact-stat-item">
                <span className="contact-stat-number">100%</span>
                <span className="contact-stat-label">Confidential</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="contact-methods">
        <div className="container">
          <h2 className="contact-section-title">
            Choose Your Preferred Way to Connect
          </h2>

          <div className="contact-methods-grid">
            {contactMethods.map((method, index) => (
              <div
                key={method.id}
                className={`contact-method-card ${
                  hoveredContact === index ? "hovered" : ""
                }`}
                style={{ "--method-color": method.color }}
                onMouseEnter={() => setHoveredContact(index)}
                onMouseLeave={() => setHoveredContact(null)}
              >
                <div className="contact-method-glow"></div>
                <div className="contact-method-icon">{method.icon}</div>
                <div className="contact-method-content">
                  <h3 className="contact-method-title">{method.title}</h3>
                  <p className="contact-method-subtitle">{method.subtitle}</p>
                  <p className="contact-method-description">
                    {method.description}
                  </p>

                  <div className="contact-method-details">
                    <div className="contact-method-availability">
                      <span className="contact-detail-label">
                        Availability:
                      </span>
                      <span className="contact-detail-value">
                        {method.availability}
                      </span>
                    </div>
                    <div className="contact-method-response">
                      <span className="contact-detail-label">Response:</span>
                      <span className="contact-detail-value">
                        {method.responseTime}
                      </span>
                    </div>
                  </div>

                  <button className="contact-method-btn">
                    {method.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Multi-Step Contact Form */}
      <section className="contact-form-section">
        <div className="container">
          <div className="contact-form-layout">
            <div className="contact-form-sidebar">
              <h3 className="contact-form-title">
                Get Your Free Strategy Session
              </h3>
              <p className="contact-form-subtitle">
                Fill out our form and we'll create a custom marketing plan for
                your business
              </p>

              {/* Progress Steps */}
              <div className="contact-progress-steps">
                <div className="contact-progress-bar">
                  <div
                    className="contact-progress-fill"
                    style={{ width: `${getStepProgress()}%` }}
                  ></div>
                </div>

                <div className="contact-steps-list">
                  <div
                    className={`contact-step-item ${
                      activeStep >= 1 ? "active" : ""
                    } ${activeStep > 1 ? "completed" : ""}`}
                  >
                    <div className="contact-step-number">1</div>
                    <div className="contact-step-info">
                      <h4>Basic Information</h4>
                      <p>Tell us about yourself and your business</p>
                    </div>
                  </div>

                  <div
                    className={`contact-step-item ${
                      activeStep >= 2 ? "active" : ""
                    } ${activeStep > 2 ? "completed" : ""}`}
                  >
                    <div className="contact-step-number">2</div>
                    <div className="contact-step-info">
                      <h4>Project Details</h4>
                      <p>Share your goals and requirements</p>
                    </div>
                  </div>

                  <div
                    className={`contact-step-item ${
                      activeStep >= 3 ? "active" : ""
                    }`}
                  >
                    <div className="contact-step-number">3</div>
                    <div className="contact-step-info">
                      <h4>Final Details</h4>
                      <p>Budget, timeline, and specific needs</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits List */}
              <div className="contact-form-benefits">
                <h4>What you'll get:</h4>
                <ul className="contact-benefits-list">
                  <li className="contact-benefit-item">
                    <span className="contact-benefit-icon">🎯</span>
                    Custom marketing strategy
                  </li>
                  <li className="contact-benefit-item">
                    <span className="contact-benefit-icon">📊</span>
                    Competitive analysis report
                  </li>
                  <li className="contact-benefit-item">
                    <span className="contact-benefit-icon">💡</span>
                    Growth opportunity insights
                  </li>
                  <li className="contact-benefit-item">
                    <span className="contact-benefit-icon">📈</span>
                    ROI projections
                  </li>
                </ul>
              </div>
            </div>

            <div className="contact-form-container">
              <form onSubmit={handleFormSubmit} className="contact-form">
                {formStatus === "success" && (
                  <div className="contact-success-message">
                    <div className="contact-success-icon">🎉</div>
                    <h3>Thank You!</h3>
                    <p>
                      We've received your inquiry and will get back to you
                      within 4 hours.
                    </p>
                  </div>
                )}

                {formStatus !== "success" && (
                  <>
                    {/* Step 1: Basic Information */}
                    {activeStep === 1 && (
                      <div className="contact-form-step">
                        <h3 className="contact-step-title">
                          Tell Us About Yourself
                        </h3>

                        <div className="contact-form-row">
                          <div className="contact-form-group">
                            <label className="contact-form-label">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="contact-form-input"
                              placeholder="John Doe"
                              required
                            />
                          </div>

                          <div className="contact-form-group">
                            <label className="contact-form-label">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="contact-form-input"
                              placeholder="john@company.com"
                              required
                            />
                          </div>
                        </div>

                        <div className="contact-form-row">
                          <div className="contact-form-group">
                            <label className="contact-form-label">
                              Company Name
                            </label>
                            <input
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleInputChange}
                              className="contact-form-input"
                              placeholder="Your Company Inc."
                            />
                          </div>

                          <div className="contact-form-group">
                            <label className="contact-form-label">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="contact-form-input"
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>
                        </div>

                        <div className="contact-form-group">
                          <label className="contact-form-label">
                            How did you hear about us?
                          </label>
                          <select
                            name="source"
                            value={formData.source}
                            onChange={handleInputChange}
                            className="contact-form-select"
                          >
                            <option value="">Select an option</option>
                            <option value="google">Google Search</option>
                            <option value="social">Social Media</option>
                            <option value="referral">Referral</option>
                            <option value="advertisement">Advertisement</option>
                            <option value="event">Event/Conference</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Project Details */}
                    {activeStep === 2 && (
                      <div className="contact-form-step">
                        <h3 className="contact-step-title">
                          What Services Interest You?
                        </h3>

                        <div className="contact-services-grid">
                          {serviceOptions.map((service) => (
                            <div
                              key={service.id}
                              className={`contact-service-option ${
                                selectedServices.includes(service.id)
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() => handleServiceToggle(service.id)}
                            >
                              <span className="contact-service-icon">
                                {service.icon}
                              </span>
                              <span className="contact-service-label">
                                {service.label}
                              </span>
                              <div className="contact-service-check">
                                {selectedServices.includes(service.id)
                                  ? "✓"
                                  : "+"}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="contact-form-group">
                          <label className="contact-form-label">
                            Project Description
                          </label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            className="contact-form-textarea"
                            placeholder="Tell us about your goals, challenges, and what success looks like for your business..."
                            rows="4"
                          ></textarea>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Budget & Timeline */}
                    {activeStep === 3 && (
                      <div className="contact-form-step">
                        <h3 className="contact-step-title">
                          Budget & Timeline
                        </h3>

                        <div className="contact-form-group">
                          <label className="contact-form-label">
                            Monthly Budget Range
                          </label>
                          <div className="contact-budget-options">
                            {budgetRanges.map((budget) => (
                              <div
                                key={budget.id}
                                className={`contact-budget-option ${
                                  formData.budget === budget.id
                                    ? "selected"
                                    : ""
                                }`}
                                onClick={() =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    budget: budget.id,
                                  }))
                                }
                              >
                                <div className="contact-budget-label">
                                  {budget.label}
                                </div>
                                <div className="contact-budget-description">
                                  {budget.description}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="contact-form-group">
                          <label className="contact-form-label">
                            When do you want to start?
                          </label>
                          <div className="contact-timeline-options">
                            {timelineOptions.map((timeline) => (
                              <div
                                key={timeline.id}
                                className={`contact-timeline-option ${
                                  formData.timeline === timeline.id
                                    ? "selected"
                                    : ""
                                }`}
                                onClick={() =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    timeline: timeline.id,
                                  }))
                                }
                              >
                                <div className="contact-timeline-label">
                                  {timeline.label}
                                </div>
                                <div className="contact-timeline-description">
                                  {timeline.description}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Form Navigation */}
                    <div className="contact-form-navigation">
                      {activeStep > 1 && (
                        <button
                          type="button"
                          onClick={prevStep}
                          className="contact-btn-secondary"
                        >
                          ← Previous
                        </button>
                      )}

                      {activeStep < 3 ? (
                        <button
                          type="button"
                          onClick={nextStep}
                          className="contact-btn-primary"
                          disabled={
                            (activeStep === 1 &&
                              (!formData.name || !formData.email)) ||
                            (activeStep === 2 && selectedServices.length === 0)
                          }
                        >
                          Next Step →
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="contact-btn-primary"
                          disabled={formStatus === "sending"}
                        >
                          {formStatus === "sending"
                            ? "Sending..."
                            : "Get My Strategy 🚀"}
                        </button>
                      )}
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations & Map */}
      <section className="contact-locations">
        <div className="container">
          <h2 className="contact-section-title">Visit Our Offices</h2>

          <div className="contact-locations-grid">
            {officeLocations.map((office) => (
              <div
                key={office.id}
                className={`contact-location-card ${
                  office.isPrimary ? "primary" : ""
                }`}
              >
                <div className="contact-location-header">
                  <h3 className="contact-location-name">{office.name}</h3>
                  {office.isPrimary && (
                    <span className="contact-location-badge">Headquarters</span>
                  )}
                </div>

                <div className="contact-location-details">
                  <div className="contact-location-address">
                    <span className="contact-location-icon">📍</span>
                    <div>
                      <p>{office.address}</p>
                      <p>{office.city}</p>
                    </div>
                  </div>

                  <div className="contact-location-info">
                    <div className="contact-location-item">
                      <span className="contact-location-icon">📞</span>
                      <span>{office.phone}</span>
                    </div>
                    <div className="contact-location-item">
                      <span className="contact-location-icon">📧</span>
                      <span>{office.email}</span>
                    </div>
                    <div className="contact-location-item">
                      <span className="contact-location-icon">🕒</span>
                      <span>{office.hours}</span>
                    </div>
                  </div>
                </div>

                {/* Google Maps iframe */}
                <div className="contact-map-container">
                  <iframe
                    src={office.mapUrl}
                    className="contact-map-iframe"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${office.name} Location`}
                  ></iframe>
                  <div className="contact-map-overlay">
                    <button className="contact-map-btn">
                      View in Google Maps
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="contact-faq">
        <div className="container">
          <h2 className="contact-section-title">Frequently Asked Questions</h2>

          <div className="contact-faq-grid">
            <div className="contact-faq-item">
              <h4 className="contact-faq-question">
                How quickly can we start working together?
              </h4>
              <p className="contact-faq-answer">
                We can typically start within 1-2 weeks of signing the contract.
                For urgent projects, we offer expedited onboarding within 48
                hours.
              </p>
            </div>

            <div className="contact-faq-item">
              <h4 className="contact-faq-question">
                Do you work with businesses in my industry?
              </h4>
              <p className="contact-faq-answer">
                We have experience across 50+ industries including e-commerce,
                SaaS, healthcare, finance, and local services. We adapt our
                strategies to your specific market.
              </p>
            </div>

            <div className="contact-faq-item">
              <h4 className="contact-faq-question">
                What's included in the free consultation?
              </h4>
              <p className="contact-faq-answer">
                Our 30-minute consultation includes a marketing audit,
                competitor analysis, growth opportunity identification, and a
                preliminary strategy outline.
              </p>
            </div>

            <div className="contact-faq-item">
              <h4 className="contact-faq-question">
                Do you offer month-to-month contracts?
              </h4>
              <p className="contact-faq-answer">
                While we recommend 6+ month commitments for best results, we do
                offer flexible month-to-month options for certain services and
                established clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stylish CTA Section */}
      <section className="contact-cta-section">
        <div className="contact-cta-background">
          <div className="contact-cta-particles"></div>
        </div>
        <div className="container">
          <div className="contact-cta-content">
            <div className="contact-cta-text">
              <h2 className="contact-cta-title">
                Ready to Dominate Your Market?
              </h2>
              <p className="contact-cta-subtitle">
                Join 500+ successful businesses that trust MUTE Marketing to
                drive their growth
              </p>
              <div className="contact-cta-features">
                <div className="contact-cta-feature">
                  <span className="contact-cta-feature-icon">🚀</span>
                  <span>Proven ROI increase of 300%+</span>
                </div>
                <div className="contact-cta-feature">
                  <span className="contact-cta-feature-icon">⚡</span>
                  <span>Fast-track to market leadership</span>
                </div>
                <div className="contact-cta-feature">
                  <span className="contact-cta-feature-icon">🎯</span>
                  <span>Custom strategies for your industry</span>
                </div>
              </div>
            </div>

            <div className="contact-cta-action">
              <div className="contact-cta-urgency">
                <span className="contact-cta-urgency-badge">Limited Time</span>
                <p className="contact-cta-urgency-text">
                  Book this month and get a FREE competitor analysis report
                  worth $2,500
                </p>
              </div>

              <div className="contact-cta-buttons">
                <button className="contact-cta-btn-primary">
                  <span>Get My Free Strategy Session</span>
                  <span className="contact-cta-btn-arrow">→</span>
                </button>
                <Link to="/portfolio" className="contact-cta-btn-secondary">
                  View Success Stories
                </Link>
              </div>

              <div className="contact-cta-guarantee">
                <span className="contact-cta-guarantee-icon">🛡️</span>
                <span>
                  100% Risk-Free • No Long-term Contracts • Results Guaranteed
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
