import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/hero-logo.jpg";
import "./Home.css";

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    projects: 0,
    clients: 0,
    experience: 0,
    satisfaction: 0,
  });

  //Cursor Glow feature
  // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // useEffect(() => {
  //   const handleMouseMove = (e) => {
  //     setMousePosition({ x: e.clientX, y: e.clientY });
  //   };

  //   window.addEventListener("mousemove", handleMouseMove);
  //   return () => window.removeEventListener("mousemove", handleMouseMove);
  // }, []);

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
      title: "Shhh...Your brand is the next big trendsetter",
      subtitle: "Outsmart the Market Supercharged by AI",
      description:
        "Your competitors are stealling your clients. AI makes sure they never touch your brand again",
      cta: "Free Consultation",
    },
  ];

  // Stats data
  const stats = [
    { label: "Projects Completed", value: 200, suffix: "+" },
    { label: "Happy Clients", value: 50, suffix: "+" },
    { label: "Years Experience", value: 3, suffix: "+" },
    { label: "Client Satisfaction", value: 98, suffix: "%" },
  ];

  // Services preview data
  const servicesPreview = [
    {
      icon: "📱",
      title: "Content Creation",
      description:
        "Silent storytelling that sparks attention, builds trust and transforms curious audiences into loyal lifelong brand advocates",
    },
    {
      icon: "🌐",
      title: "Social Media Marketing",
      description:
        "Mute Marketing delivers quiet, precise social campaigns that silently grow influence, engagement, and loyal customer base",
    },
    {
      icon: "🔍",
      title: "Branding",
      description:
        "With our 360° marketing, your brand rises while all other brands stay silent",
    },
    {
      icon: "📊",
      title: "Website Development",
      description:
        "Mute Marketing crafts subtle, high-impact websites that attract clients naturally while delivering seamless user experiences.",
    },
    {
      icon: "📲",
      title: "App Development",
      description:
        "Strategic app development that engages, converts, and builds brand authority without ever shouting for attention.",
    },
    {
      icon: "📈",
      title: "Vibe Marketing",
      description:
        "Let AI amplify your brand's vibe-silently attracting clients, engaging audiences, and coverting effortlessly.",
    },
    {
      icon: "📷",
      title: "Photography",
      description:
        "Capture, Showcase, Dominate. Let the world withness your business's strength, capability, and unstoppable growth",
    },
    {
      icon: "📹",
      title: "Videography",
      description:
        "Every frame tells your brand's story with a cinematic impact- loud, proud, and immpossible to ignore.",
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
    {
      name: "Emily Rodriguez",
      position: "Founder",
      company: "Creative Studio",
      content:
        "The ROI we've seen from their campaigns is exceptional. They truly understand our business and deliver results.",
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
  });

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? "filled" : ""}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="home">
      {/* Cursor glow feature
      <div
        className="cursor-glow"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      /> */}
      {/* Hero Section */}
      <section className={`hero ${isVisible ? "visible" : ""}`}>
        <div className="hero-background">
          <div className="hero-overlay"></div>
          <div className="hero-pattern"></div>
        </div>

        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <span className="home-hero-badge">Advertising Agency</span>
              <h1 className="hero-title-Home">
                {heroSlides[currentSlide].title}
              </h1>
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
                <img src={logo} alt="MUTE Marketing" className="hero-logo" />
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
              We craft next-level AI powered Solution tailored to your
              business-built to attract, convert and dominate. Because, our
              branding expertise makes your business the name customers can't
              ignore.
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
                    <h4>Proven Excellence:</h4>
                    <p>
                      Join 50+ happy clients who trust us to deliver real,
                      measurable results.
                    </p>
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">✓</span>
                  <div>
                    <h4>AI + Human Brilliance:</h4>
                    <p>
                      Harness the perfect blend of cutting-edgeAI with expert
                      human strategy.
                    </p>
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">✓</span>
                  <div>
                    <h4>Dedicated Support:</h4>
                    <p>
                      Speak directly to the team owning yourproject—no
                      middlemen, no delays.(T&C Applied).
                    </p>
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">✓</span>
                  <div>
                    <h4>Transparent Performance:</h4>
                    <p>
                      Stay in control with regular, detailed updatesshowing
                      exactly how your brand grows.
                    </p>
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
              Let’s unlock your business’s full potential and achieve the
              success you envision.
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
}

export default Home;
