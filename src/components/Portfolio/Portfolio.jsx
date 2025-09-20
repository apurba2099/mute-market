import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Portfolio.css";

const Portfolio = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [viewMode, setViewMode] = useState("carousel"); // carousel, grid, timeline
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [hoveredMetric, setHoveredMetric] = useState(null);
  const projectsRef = useRef();

  // Portfolio projects data
  const projects = [
    {
      id: 1,
      title: "TechCorp Digital Transformation",
      client: "TechCorp Solutions",
      category: "full-service",
      industry: "Technology",
      duration: "8 months",
      year: "2024",
      challenge:
        "Struggling startup needed complete digital presence overhaul to compete with established players",
      solution:
        "Comprehensive rebranding, multi-channel marketing strategy, and advanced analytics implementation",
      image: "/api/placeholder/800/600",
      featured: true,
      metrics: {
        revenue: { before: "$50K", after: "$500K", growth: "+900%" },
        traffic: { before: "2K", after: "25K", growth: "+1150%" },
        leads: { before: "15", after: "200", growth: "+1233%" },
        conversion: { before: "1.2%", after: "8.5%", growth: "+608%" },
      },
      services: [
        "Brand Strategy",
        "SEO",
        "PPC",
        "Social Media",
        "Content Marketing",
      ],
      technologies: [
        "Google Ads",
        "Facebook Ads",
        "HubSpot",
        "Google Analytics",
        "WordPress",
      ],
      testimonial: {
        text: "MUTE Marketing transformed our business completely. We went from struggling startup to industry leader.",
        author: "Sarah Chen",
        position: "CEO, TechCorp Solutions",
      },
      timeline: [
        {
          phase: "Discovery",
          duration: "2 weeks",
          description: "Market research and competitor analysis",
        },
        {
          phase: "Strategy",
          duration: "3 weeks",
          description: "Brand positioning and marketing strategy development",
        },
        {
          phase: "Implementation",
          duration: "6 months",
          description: "Campaign execution and optimization",
        },
        {
          phase: "Scale",
          duration: "Ongoing",
          description: "Growth acceleration and expansion",
        },
      ],
      color: "#FF6B6B",
      tags: ["Startup", "B2B", "SaaS", "Growth"],
    },
    {
      id: 2,
      title: "E-Commerce Empire Expansion",
      client: "StyleHaven Fashion",
      category: "ecommerce",
      industry: "Fashion & Retail",
      duration: "6 months",
      year: "2024",
      challenge:
        "Fashion brand plateaued at $1M annual revenue, needed breakthrough to next level",
      solution:
        "Advanced e-commerce optimization, influencer partnerships, and data-driven personalization",
      image: "/api/placeholder/800/600",
      featured: true,
      metrics: {
        revenue: { before: "$1M", after: "$3.2M", growth: "+220%" },
        roas: { before: "250%", after: "480%", growth: "+92%" },
        aov: { before: "$85", after: "$145", growth: "+71%" },
        retention: { before: "25%", after: "65%", growth: "+160%" },
      },
      services: [
        "E-commerce Strategy",
        "PPC",
        "Social Media",
        "Email Marketing",
        "Analytics",
      ],
      technologies: [
        "Shopify Plus",
        "Google Ads",
        "Facebook Ads",
        "Klaviyo",
        "Hotjar",
      ],
      testimonial: {
        text: "The ROI we achieved exceeded all expectations. Our brand is now a recognized leader in fashion e-commerce.",
        author: "Michael Rodriguez",
        position: "Founder, StyleHaven Fashion",
      },
      timeline: [
        {
          phase: "Audit",
          duration: "1 week",
          description: "E-commerce performance analysis",
        },
        {
          phase: "Optimization",
          duration: "4 weeks",
          description: "Site optimization and user experience enhancement",
        },
        {
          phase: "Campaign Launch",
          duration: "3 months",
          description: "Multi-channel marketing execution",
        },
        {
          phase: "Scale",
          duration: "Ongoing",
          description: "Expansion and growth acceleration",
        },
      ],
      color: "#4ECDC4",
      tags: ["E-commerce", "B2C", "Fashion", "Scaling"],
    },
    {
      id: 3,
      title: "Local Service Domination",
      client: "Elite Home Services",
      category: "local-seo",
      industry: "Home Services",
      duration: "4 months",
      year: "2023",
      challenge:
        "Local contractor invisible online, losing to competitors despite superior service quality",
      solution:
        "Local SEO mastery, reputation management, and targeted local advertising strategy",
      image: "/api/placeholder/800/600",
      featured: false,
      metrics: {
        rankings: { before: "Not ranked", after: "#1-#3", growth: "Top 3" },
        calls: { before: "10/month", after: "80/month", growth: "+700%" },
        revenue: { before: "$15K", after: "$65K", growth: "+333%" },
        reviews: { before: "3.2★", after: "4.9★", growth: "+53%" },
      },
      services: [
        "Local SEO",
        "Google My Business",
        "Reputation Management",
        "Local PPC",
      ],
      technologies: [
        "Google My Business",
        "Local SEO Tools",
        "Review Management",
        "Call Tracking",
      ],
      testimonial: {
        text: "From invisible to industry leader in our area. The phone hasn't stopped ringing since working with MUTE.",
        author: "David Johnson",
        position: "Owner, Elite Home Services",
      },
      timeline: [
        {
          phase: "Local Audit",
          duration: "1 week",
          description: "Local search visibility analysis",
        },
        {
          phase: "Optimization",
          duration: "3 weeks",
          description: "GMB and local citations optimization",
        },
        {
          phase: "Content",
          duration: "2 months",
          description: "Local content creation and optimization",
        },
        {
          phase: "Domination",
          duration: "Ongoing",
          description: "Market leadership maintenance",
        },
      ],
      color: "#45B7D1",
      tags: ["Local", "B2C", "Services", "SEO"],
    },
    {
      id: 4,
      title: "SaaS Startup Acceleration",
      client: "DataFlow Analytics",
      category: "saas",
      industry: "Software & Analytics",
      duration: "12 months",
      year: "2023",
      challenge:
        "Innovative SaaS platform with zero market presence needed rapid user acquisition",
      solution:
        "Content-driven inbound strategy, thought leadership, and conversion optimization",
      image: "/api/placeholder/800/600",
      featured: false,
      metrics: {
        users: { before: "0", after: "10K+", growth: "Infinite" },
        mrr: { before: "$0", after: "$85K", growth: "From zero" },
        trials: { before: "0", after: "500/month", growth: "500/month" },
        conversion: { before: "0%", after: "12%", growth: "12%" },
      },
      services: [
        "Content Strategy",
        "SEO",
        "PPC",
        "Conversion Optimization",
        "Analytics",
      ],
      technologies: [
        "HubSpot",
        "Google Analytics",
        "Unbounce",
        "Intercom",
        "Mixpanel",
      ],
      testimonial: {
        text: "MUTE helped us go from idea to profitable SaaS platform. Their strategy was absolutely crucial to our success.",
        author: "Lisa Wang",
        position: "Co-founder, DataFlow Analytics",
      },
      timeline: [
        {
          phase: "Market Research",
          duration: "2 weeks",
          description: "Target audience and competitor analysis",
        },
        {
          phase: "Content Strategy",
          duration: "1 month",
          description: "Thought leadership content development",
        },
        {
          phase: "User Acquisition",
          duration: "8 months",
          description: "Multi-channel user acquisition campaigns",
        },
        {
          phase: "Optimization",
          duration: "Ongoing",
          description: "Continuous conversion optimization",
        },
      ],
      color: "#96CEB4",
      tags: ["SaaS", "B2B", "Startup", "Analytics"],
    },
    {
      id: 5,
      title: "Restaurant Chain Revival",
      client: "Urban Eats",
      category: "hospitality",
      industry: "Food & Hospitality",
      duration: "10 months",
      year: "2023",
      challenge:
        "Restaurant chain facing declining sales and brand perception issues post-pandemic",
      solution:
        "Brand revitalization, social media strategy, and delivery platform optimization",
      image: "/api/placeholder/800/600",
      featured: false,
      metrics: {
        sales: { before: "-25%", after: "+45%", growth: "+70%" },
        social: { before: "5K", after: "85K", growth: "+1600%" },
        delivery: { before: "15%", after: "60%", growth: "+300%" },
        sentiment: { before: "2.1★", after: "4.7★", growth: "+124%" },
      },
      services: [
        "Brand Strategy",
        "Social Media",
        "Reputation Management",
        "Local Marketing",
      ],
      technologies: ["Instagram", "TikTok", "UberEats", "DoorDash", "Yelp"],
      testimonial: {
        text: "They saved our business. From the brink of closure to thriving success - incredible transformation.",
        author: "Carlos Martinez",
        position: "Owner, Urban Eats",
      },
      timeline: [
        {
          phase: "Crisis Management",
          duration: "2 weeks",
          description: "Immediate reputation damage control",
        },
        {
          phase: "Rebranding",
          duration: "6 weeks",
          description: "Brand identity and messaging overhaul",
        },
        {
          phase: "Social Revival",
          duration: "6 months",
          description: "Social media community building",
        },
        {
          phase: "Growth",
          duration: "Ongoing",
          description: "Expansion and franchise development",
        },
      ],
      color: "#F7DC6F",
      tags: ["Restaurant", "B2C", "Recovery", "Local"],
    },
    {
      id: 6,
      title: "Healthcare Practice Growth",
      client: "MedCare Specialists",
      category: "healthcare",
      industry: "Healthcare",
      duration: "7 months",
      year: "2024",
      challenge:
        "Specialized medical practice needed patient acquisition while maintaining HIPAA compliance",
      solution:
        "Healthcare-focused content marketing, local SEO, and compliant lead generation",
      image: "/api/placeholder/800/600",
      featured: false,
      metrics: {
        patients: { before: "50/month", after: "200/month", growth: "+300%" },
        bookings: { before: "60%", after: "95%", growth: "+58%" },
        revenue: { before: "$45K", after: "$180K", growth: "+300%" },
        referrals: { before: "10%", after: "35%", growth: "+250%" },
      },
      services: [
        "Healthcare Marketing",
        "Local SEO",
        "Content Marketing",
        "Reputation Management",
      ],
      technologies: [
        "Healthcare CRM",
        "HIPAA-compliant tools",
        "Google My Business",
        "Medical SEO",
      ],
      testimonial: {
        text: "Professional, compliant, and incredibly effective. Our practice has never been busier or more successful.",
        author: "Dr. Jennifer Adams",
        position: "Lead Physician, MedCare Specialists",
      },
      timeline: [
        {
          phase: "Compliance Audit",
          duration: "1 week",
          description: "HIPAA and healthcare marketing compliance review",
        },
        {
          phase: "Strategy Development",
          duration: "3 weeks",
          description: "Healthcare-specific marketing strategy creation",
        },
        {
          phase: "Implementation",
          duration: "5 months",
          description: "Campaign execution and patient acquisition",
        },
        {
          phase: "Growth",
          duration: "Ongoing",
          description: "Practice expansion and referral optimization",
        },
      ],
      color: "#BB8FCE",
      tags: ["Healthcare", "B2C", "Professional", "Compliance"],
    },
  ];

  // Filter categories
  const categories = [
    { id: "all", label: "All Projects", count: projects.length },
    {
      id: "full-service",
      label: "Full Service",
      count: projects.filter((p) => p.category === "full-service").length,
    },
    {
      id: "ecommerce",
      label: "E-commerce",
      count: projects.filter((p) => p.category === "ecommerce").length,
    },
    {
      id: "saas",
      label: "SaaS",
      count: projects.filter((p) => p.category === "saas").length,
    },
    {
      id: "local-seo",
      label: "Local SEO",
      count: projects.filter((p) => p.category === "local-seo").length,
    },
    {
      id: "healthcare",
      label: "Healthcare",
      count: projects.filter((p) => p.category === "healthcare").length,
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

  // Auto-rotate projects in carousel mode
  useEffect(() => {
    if (!isAutoPlay || viewMode !== "carousel") return;

    const interval = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % projects.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoPlay, viewMode, projects.length]);

  // Filter projects
  const filteredProjects =
    selectedFilter === "all"
      ? projects
      : projects.filter((project) => project.category === selectedFilter);

  const handleProjectNavigation = (index) => {
    setActiveProject(index);
    setIsAutoPlay(false);
  };

  const formatMetricValue = (metric) => {
    if (typeof metric === "object") {
      return metric.growth;
    }
    return metric;
  };

  return (
    <div className="portfolio">
      {/* Interactive cursor */}
      <div
        className="cursor-glow"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />

      {/* Hero Section */}
      <section className="portfolio-hero">
        <div className="hero-constellation"></div>
        <div className="container">
          <div className="hero-content">
            <span className="hero-badge">Our Success Stories</span>
            <h1 className="hero-title-Portfolio">
              Where
              <span className="highlight-text">Strategies</span>
              Meet Success
            </h1>
            <p className="hero-description">
              Dive deep into our most impactful campaigns and discover how we
              transform businesses across industries with data-driven strategies
              and creative excellence.
            </p>

            <div className="hero-stats">
              <div className="stat-card">
                <div className="stat-icon">📈</div>
                <div className="stat-content">
                  <span className="stat-number">$50M+</span>
                  <span className="stat-label">Revenue Generated</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🚀</div>
                <div className="stat-content">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Projects Delivered</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⭐</div>
                <div className="stat-content">
                  <span className="stat-number">98%</span>
                  <span className="stat-label">Success Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Controls */}
      <section className="portfolio-controls">
        <div className="container">
          <div className="controls-header">
            <div className="filter-tabs">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`filter-tab ${
                    selectedFilter === category.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedFilter(category.id)}
                >
                  {category.label}
                  <span className="tab-count">{category.count}</span>
                </button>
              ))}
            </div>

            <div className="view-controls">
              <button
                className={`view-btn ${
                  viewMode === "carousel" ? "active" : ""
                }`}
                onClick={() => setViewMode("carousel")}
                title="Carousel View"
              >
                🎠
              </button>
              <button
                className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
                title="Grid View"
              >
                ⚏
              </button>
              <button
                className={`view-btn ${
                  viewMode === "timeline" ? "active" : ""
                }`}
                onClick={() => setViewMode("timeline")}
                title="Timeline View"
              >
                📅
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Portfolio Display */}
      {viewMode === "carousel" && (
        <section className="portfolio-carousel">
          <div className="container">
            <div className="carousel-container">
              {/* Project Navigation */}
              <div className="project-navigation">
                <div className="nav-header">
                  <h3>Featured Projects</h3>
                  <div className="autoplay-toggle">
                    <button
                      className={`autoplay-btn ${isAutoPlay ? "active" : ""}`}
                      onClick={() => setIsAutoPlay(!isAutoPlay)}
                    >
                      {isAutoPlay ? "⏸️" : "▶️"}
                    </button>
                  </div>
                </div>

                <div className="project-nav-list">
                  {filteredProjects.map((project, index) => (
                    <div
                      key={project.id}
                      className={`nav-project ${
                        index === activeProject ? "active" : ""
                      }`}
                      onClick={() => handleProjectNavigation(index)}
                    >
                      <div className="nav-project-info">
                        <h4>{project.title}</h4>
                        <span className="nav-client">{project.client}</span>
                        <span className="nav-year">{project.year}</span>
                      </div>
                      <div className="nav-metrics">
                        <div className="mini-metric">
                          {Object.entries(project.metrics)[0][1].growth}
                        </div>
                      </div>
                      <div
                        className="nav-indicator"
                        style={{ backgroundColor: project.color }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Project Display */}
              <div className="project-showcase">
                {filteredProjects.length > 0 && (
                  <div className="project-detail" key={activeProject}>
                    <div className="project-header">
                      <div className="project-meta">
                        <span
                          className="project-category"
                          style={{
                            color: filteredProjects[activeProject]?.color,
                          }}
                        >
                          {filteredProjects[activeProject]?.industry}
                        </span>
                        <div className="project-tags">
                          {filteredProjects[activeProject]?.tags.map(
                            (tag, index) => (
                              <span key={index} className="project-tag">
                                {tag}
                              </span>
                            )
                          )}
                        </div>
                      </div>

                      <h2 className="project-title">
                        {filteredProjects[activeProject]?.title}
                      </h2>
                      <p className="project-client">
                        for {filteredProjects[activeProject]?.client}
                      </p>

                      <div className="project-challenge">
                        <h4>The Challenge</h4>
                        <p>{filteredProjects[activeProject]?.challenge}</p>
                      </div>

                      <div className="project-solution">
                        <h4>Our Solution</h4>
                        <p>{filteredProjects[activeProject]?.solution}</p>
                      </div>
                    </div>

                    <div className="project-metrics">
                      <h4>Results Achieved</h4>
                      <div className="metrics-grid">
                        {Object.entries(
                          filteredProjects[activeProject]?.metrics || {}
                        ).map(([key, value], index) => (
                          <div
                            key={key}
                            className="metric-card"
                            onMouseEnter={() => setHoveredMetric(index)}
                            onMouseLeave={() => setHoveredMetric(null)}
                            style={{
                              "--delay": `${index * 0.1}s`,
                              "--color": filteredProjects[activeProject]?.color,
                            }}
                          >
                            <div className="metric-header">
                              <span className="metric-label">
                                {key.toUpperCase()}
                              </span>
                            </div>
                            <div className="metric-values">
                              {typeof value === "object" ? (
                                <>
                                  <div className="before-after">
                                    <span className="before">
                                      {value.before}
                                    </span>
                                    <span className="arrow">→</span>
                                    <span className="after">{value.after}</span>
                                  </div>
                                  <div className="growth">{value.growth}</div>
                                </>
                              ) : (
                                <div className="single-value">{value}</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="project-details-row">
                      <div className="project-services">
                        <h4>Services Provided</h4>
                        <div className="services-list">
                          {filteredProjects[activeProject]?.services.map(
                            (service, index) => (
                              <span key={index} className="service-badge">
                                {service}
                              </span>
                            )
                          )}
                        </div>
                      </div>

                      <div className="project-tech">
                        <h4>Technologies Used</h4>
                        <div className="tech-list">
                          {filteredProjects[activeProject]?.technologies.map(
                            (tech, index) => (
                              <span key={index} className="tech-badge">
                                {tech}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="project-testimonial">
                      <div className="testimonial-content">
                        <div className="quote-mark">"</div>
                        <p className="testimonial-text">
                          {filteredProjects[activeProject]?.testimonial.text}
                        </p>
                        <div className="testimonial-author">
                          <strong>
                            {
                              filteredProjects[activeProject]?.testimonial
                                .author
                            }
                          </strong>
                          <span>
                            {
                              filteredProjects[activeProject]?.testimonial
                                .position
                            }
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="project-timeline">
                      <h4>Project Timeline</h4>
                      <div className="timeline-phases">
                        {filteredProjects[activeProject]?.timeline.map(
                          (phase, index) => (
                            <div key={index} className="timeline-phase">
                              <div className="phase-marker"></div>
                              <div className="phase-content">
                                <h5>{phase.phase}</h5>
                                <span className="phase-duration">
                                  {phase.duration}
                                </span>
                                <p>{phase.description}</p>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div className="project-actions">
                      <Link to="/contact" className="btn btn-primary">
                        Start Similar Project
                      </Link>
                      <button className="btn btn-outline">
                        View Full Case Study
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Grid View */}
      {viewMode === "grid" && (
        <section className="portfolio-grid">
          <div className="container">
            <div className="projects-grid">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="project-card"
                  style={{ "--project-color": project.color }}
                  onClick={() => {
                    setActiveProject(index);
                    setViewMode("carousel");
                  }}
                >
                  <div className="card-glow"></div>
                  <div className="project-image">
                    <div
                      className="image-placeholder"
                      style={{ backgroundColor: project.color }}
                    >
                      <span className="project-industry">
                        {project.industry}
                      </span>
                    </div>
                    <div className="project-overlay">
                      <button className="view-project-btn">View Details</button>
                    </div>
                  </div>

                  <div className="project-info">
                    <div className="project-category-badge">
                      {project.category}
                    </div>
                    <h3>{project.title}</h3>
                    <p className="project-client-name">{project.client}</p>

                    <div className="project-quick-metrics">
                      <div className="quick-metric">
                        <span className="metric-value">
                          {formatMetricValue(Object.values(project.metrics)[0])}
                        </span>
                        <span className="metric-key">
                          {Object.keys(project.metrics)[0]}
                        </span>
                      </div>
                    </div>

                    <div className="project-meta-info">
                      <span className="project-duration">
                        {project.duration}
                      </span>
                      <span className="project-year">{project.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Timeline View */}
      {viewMode === "timeline" && (
        <section className="portfolio-timeline">
          <div className="container">
            <div className="timeline-container">
              <div className="timeline-line"></div>

              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`timeline-item ${
                    index % 2 === 0 ? "left" : "right"
                  }`}
                  onClick={() => {
                    setActiveProject(index);
                    setViewMode("carousel");
                  }}
                >
                  <div
                    className="timeline-marker"
                    style={{ backgroundColor: project.color }}
                  >
                    {project.year}
                  </div>

                  <div className="timeline-content">
                    <div className="timeline-card">
                      <div className="timeline-header">
                        <span className="timeline-category">
                          {project.industry}
                        </span>
                        <h3>{project.title}</h3>
                        <p className="timeline-client">{project.client}</p>
                      </div>

                      <div className="timeline-summary">
                        <p>{project.challenge.substring(0, 120)}...</p>
                      </div>

                      <div className="timeline-metric">
                        <span className="timeline-result">
                          {formatMetricValue(Object.values(project.metrics)[0])}{" "}
                          growth
                        </span>
                      </div>

                      <div className="timeline-duration">
                        {project.duration} • {project.year}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="portfolio-cta">
        <div className="cta-galaxy"></div>
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Be Our Next Success Story?</h2>
            <p>Let's create measurable results that transform your business</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                Start Your Project
              </Link>
              <Link to="/services" className="btn btn-outline">
                Explore Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
