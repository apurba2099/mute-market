import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/hero-logo.jpg";
import "./About.css";

export default function About() {
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [_, setVisibleElements] = useState(new Set()); //visibleElements
  const observerRef = useRef();

  // Timeline data - Company milestones
  const timeline = [
    {
      year: "2016",
      title: "The Genesis",
      description:
        "Founded with a vision to revolutionize digital marketing through data-driven strategies and creative excellence.",
      metric: "First Client",
      achievement: "Secured our first major client with a 250% ROI increase",
    },
    {
      year: "2018",
      title: "Scaling Heights",
      description:
        "Expanded our team and services, specializing in advanced analytics and automation.",
      metric: "50+ Projects",
      achievement:
        "Completed 50+ successful campaigns across diverse industries",
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description:
        "Pioneered remote-first approach and AI-powered marketing solutions during global changes.",
      metric: "100+ Clients",
      achievement: "Helped 100+ businesses pivot to digital-first strategies",
    },
    {
      year: "2022",
      title: "Innovation Leader",
      description:
        "Launched proprietary marketing automation tools and became industry thought leaders.",
      metric: "500+ Campaigns",
      achievement: "Executed 500+ campaigns with average 300% ROI",
    },
    {
      year: "2025",
      title: "Future Ready",
      description:
        "Continuing to push boundaries with AI, machine learning, and next-gen marketing technologies.",
      metric: "Industry Leader",
      achievement: "Recognized as top digital marketing innovator",
    },
  ];

  // Team members data
  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Creative Director",
      expertise: "Brand Strategy & Visual Design",
      experience: "8+ Years",
      specialty: "Converting creative visions into measurable results",
      achievements: [
        "Increased brand awareness by 400% for 50+ clients",
        "Award-winning campaign designer",
      ],
    },
    {
      name: "Sarah Williams",
      role: "Data Analytics Lead",
      expertise: "Performance Marketing & Analytics",
      experience: "7+ Years",
      specialty: "Transforming data into actionable growth strategies",
      achievements: [
        "Generated $5M+ in client revenue",
        "Advanced AI implementation specialist",
      ],
    },
    {
      name: "Michael Rodriguez",
      role: "Growth Strategist",
      expertise: "SEO & Content Marketing",
      experience: "6+ Years",
      specialty: "Building sustainable organic growth engines",
      achievements: [
        "Achieved #1 rankings for 200+ keywords",
        "Content strategy innovation leader",
      ],
    },
  ];

  // Core values data
  const values = [
    {
      icon: "🎯",
      title: "Results-Driven",
      description:
        "Every strategy is designed with clear, measurable outcomes in mind",
      details:
        "We don't just create campaigns; we engineer success stories with data-backed precision.",
    },
    {
      icon: "🚀",
      title: "Innovation First",
      description:
        "Always pioneering the next breakthrough in digital marketing",
      details:
        "Our team stays ahead of trends, implementing cutting-edge solutions before they become mainstream.",
    },
    {
      icon: "🤝",
      title: "Partnership Mindset",
      description: "Your success is our success - we grow together",
      details:
        "We become an extension of your team, deeply invested in your long-term growth and success.",
    },
    {
      icon: "⚡",
      title: "Agile Excellence",
      description: "Fast execution without compromising on quality",
      details:
        "Rapid iteration, continuous optimization, and lightning-fast response to market changes.",
    },
  ];

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(
              (prev) => new Set([...prev, entry.target.dataset.element])
            );
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll("[data-element]");
    elements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Auto-advance timeline
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTimeline((prev) => (prev + 1) % timeline.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [timeline.length]);

  const handleTimelineClick = (index) => {
    setActiveTimeline(index);
  };

  return (
    <div className="about">
      {/* Interactive cursor */}
      <div
        className="cursor-glow"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />

      {/* Hero Section - Story Beginning */}
      <section className="about-hero">
        <div className="hero-particles"></div>
        <div className="container">
          <div className="hero-content">
            <div className="about-hero-badge" data-element="badge">
              <span>Our Story</span>
            </div>
            <h1
              className="about-hero-title"
              id="about-hero-title"
              data-element="title"
            >
              Crafting Digital
              <span className="highlight-text">Excellence</span>
              Since 2016
            </h1>
            <p
              className="hero-description-About"
              id="hero-description-About"
              data-element="description"
            >
              We're not just another marketing agency. We're digital architects,
              building bridges between brands and their audiences through
              innovation, data-driven insights, and relentless pursuit of
              excellence.
            </p>
            <div className="hero-stats" data-element="stats">
              <div className="stat-item">
                <span className="stat-number">9</span>
                <span className="stat-label">Years Strong</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">250+</span>
                <span className="stat-label">Success Stories</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">$50M+</span>
                <span className="stat-label">Revenue Generated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="timeline-section">
        <div className="container">
          <h2 className="section-title" data-element="timeline-title">
            Our Journey of Innovation
          </h2>

          <div className="timeline-container" data-element="timeline">
            <div className="timeline-line">
              <div
                className="timeline-progress"
                style={{
                  height: `${((activeTimeline + 1) / timeline.length) * 100}%`,
                }}
              />
            </div>

            <div className="timeline-content">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`timeline-item ${
                    index === activeTimeline ? "active" : ""
                  } ${index < activeTimeline ? "completed" : ""}`}
                  onClick={() => handleTimelineClick(index)}
                >
                  <div className="timeline-marker">
                    <span className="year">{item.year}</span>
                  </div>

                  <div className="timeline-details">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="timeline-achievement">
                      <strong>{item.metric}:</strong> {item.achievement}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Showcase with Unique Layout */}
      <section className="team-section">
        <div className="container">
          <div className="section-header" data-element="team-header">
            <h2>The Minds Behind MUTE</h2>
            <p>
              Meet the strategists, creators, and innovators driving your
              success
            </p>
          </div>

          <div className="team-grid" data-element="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="card-glow"></div>
                <div className="team-avatar">
                  <div className="avatar-placeholder">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="avatar-ring"></div>
                </div>

                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-expertise">{member.expertise}</p>

                  <div className="team-details">
                    <div className="experience-badge">
                      {member.experience} Experience
                    </div>
                    <p className="specialty">{member.specialty}</p>

                    <div className="achievements">
                      <h4>Key Achievements:</h4>
                      <ul>
                        {member.achievements.map((achievement, idx) => (
                          <li key={idx}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values - Creative Layout */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title" data-element="values-title">
            What Drives Us Forward
          </h2>

          <div className="values-container" data-element="values">
            <div className="values-center">
              <div className="center-logo">
                <img src={logo} alt="MUTE" className="values-logo" />
              </div>
            </div>

            <div className="values-orbit">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="value-item"
                  style={{
                    "--delay": `${index * 0.2}s`,
                    "--rotation": `${index * 90}deg`,
                  }}
                >
                  <div className="value-card">
                    <div className="value-icon">{value.icon}</div>
                    <h3>{value.title}</h3>
                    <p className="value-description">{value.description}</p>
                    <div className="value-details">
                      <p>{value.details}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement - Unique Design */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content" data-element="mission">
            <div className="mission-visual">
              <div className="mission-circle">
                <div className="circle-text">
                  <span>OUR</span>
                  <span>MISSION</span>
                </div>
              </div>
            </div>

            <div className="mission-text">
              <h2>Empowering Brands to Reach Their Full Potential</h2>
              <div className="mission-statement">
                <p>
                  We believe every brand has a unique story waiting to be told.
                  Our mission is to amplify these stories through innovative
                  digital strategies that don't just reach audiences—they create
                  lasting connections.
                </p>
                <p>
                  In a world oversaturated with content, we cut through the
                  noise with precision-crafted campaigns that speak directly to
                  hearts and minds, driving authentic engagement and measurable
                  growth.
                </p>
              </div>

              <div className="mission-pillars">
                <div className="pillar">
                  <h4>Authenticity</h4>
                  <p>Every campaign reflects your brand's true essence</p>
                </div>
                <div className="pillar">
                  <h4>Innovation</h4>
                  <p>Pioneering strategies that set industry standards</p>
                </div>
                <div className="pillar">
                  <h4>Growth</h4>
                  <p>Sustainable results that compound over time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content" data-element="cta">
            <h2>Ready to Write Your Success Story?</h2>
            <p>Let's collaborate to create something extraordinary together</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                Start Your Journey
              </Link>
              <Link to="/portfolio" className="btn btn-outline">
                See Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
