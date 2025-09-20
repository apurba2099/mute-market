import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Services.css";

const Services = () => {
  const [activeService, setActiveService] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedPackage, setSelectedPackage] = useState("professional");
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [processStep, setProcessStep] = useState(0);
  const servicesRef = useRef();

  // Services data with comprehensive details
  const services = [
    {
      id: "social-media",
      icon: "📱",
      title: "Social Media Mastery",
      tagline: "Where Engagement Meets Excellence",
      description:
        "Transform your social presence into a powerful growth engine with strategic content, community building, and data-driven campaigns.",
      features: [
        "Multi-platform content strategy",
        "Community management & engagement",
        "Influencer partnership campaigns",
        "Social commerce optimization",
        "Real-time performance analytics",
        "Crisis management & reputation protection",
      ],
      technologies: [
        "Meta Ads",
        "TikTok Ads",
        "LinkedIn Campaign Manager",
        "Twitter Ads",
        "Pinterest Business",
        "Snapchat Ads",
      ],
      metrics: {
        engagement: "+400%",
        followers: "+250%",
        conversions: "+180%",
      },
      case_study: "Increased client's social revenue by 300% in 6 months",
      color: "#FF6B6B",
    },
    {
      id: "ppc-advertising",
      icon: "🎯",
      title: "Precision PPC Campaigns",
      tagline: "Every Click Counts, Every Dollar Works",
      description:
        "Maximize ROI with surgical precision targeting, advanced bidding strategies, and conversion-optimized ad campaigns.",
      features: [
        "Advanced audience targeting & segmentation",
        "AI-powered bid optimization",
        "Landing page conversion optimization",
        "Cross-platform campaign management",
        "Attribution modeling & tracking",
        "Automated performance reporting",
      ],
      technologies: [
        "Google Ads",
        "Microsoft Ads",
        "Facebook Ads Manager",
        "Amazon PPC",
        "Display & Video 360",
        "SA360",
      ],
      metrics: { roas: "450%", cpc: "-60%", conversions: "+220%" },
      case_study:
        "Generated $2.3M revenue with 450% ROAS for e-commerce client",
      color: "#4ECDC4",
    },
    {
      id: "seo-optimization",
      icon: "🔍",
      title: "SEO Domination",
      tagline: "Rise Above the Digital Noise",
      description:
        "Achieve sustainable organic growth with technical SEO mastery, content optimization, and authority building strategies.",
      features: [
        "Technical SEO audit & optimization",
        "Content strategy & keyword research",
        "Local SEO & Google My Business",
        "Link building & digital PR",
        "Core Web Vitals optimization",
        "SEO automation & monitoring",
      ],
      technologies: [
        "Google Search Console",
        "SEMrush",
        "Ahrefs",
        "Screaming Frog",
        "GTM",
        "Data Studio",
      ],
      metrics: { traffic: "+350%", rankings: "#1-#3", leads: "+280%" },
      case_study:
        "Achieved #1 rankings for 50+ keywords, tripling organic traffic",
      color: "#45B7D1",
    },
    {
      id: "analytics-insights",
      icon: "📊",
      title: "Data Intelligence Hub",
      tagline: "Transform Data Into Decisions",
      description:
        "Unlock hidden growth opportunities with advanced analytics, predictive modeling, and actionable business intelligence.",
      features: [
        "Advanced analytics setup & tracking",
        "Custom dashboard development",
        "Predictive analytics & forecasting",
        "Customer journey mapping",
        "Attribution modeling",
        "Automated insights & alerts",
      ],
      technologies: [
        "Google Analytics 4",
        "Google Tag Manager",
        "Looker Studio",
        "BigQuery",
        "Hotjar",
        "Mixpanel",
      ],
      metrics: { insights: "50+ KPIs", accuracy: "95%", decisions: "+40%" },
      case_study: "Identified $500K revenue opportunity through data analysis",
      color: "#96CEB4",
    },
    {
      id: "content-marketing",
      icon: "✍️",
      title: "Content That Converts",
      tagline: "Stories That Sell, Content That Connects",
      description:
        "Build brand authority and drive conversions with strategic content that educates, engages, and converts your audience.",
      features: [
        "Content strategy & planning",
        "SEO-optimized blog writing",
        "Video content production",
        "Email marketing campaigns",
        "Interactive content creation",
        "Content performance optimization",
      ],
      technologies: [
        "WordPress",
        "HubSpot",
        "Canva Pro",
        "Loom",
        "Mailchimp",
        "ConvertKit",
      ],
      metrics: { engagement: "+300%", leads: "+200%", shares: "+400%" },
      case_study: "Content strategy generated 1M+ organic impressions monthly",
      color: "#F7DC6F",
    },
    {
      id: "brand-strategy",
      icon: "🚀",
      title: "Brand Evolution",
      tagline: "From Vision to Market Leader",
      description:
        "Craft compelling brand narratives and visual identities that resonate with your audience and drive business growth.",
      features: [
        "Brand identity development",
        "Competitive analysis & positioning",
        "Visual identity & design systems",
        "Brand guideline creation",
        "Messaging framework development",
        "Brand monitoring & reputation management",
      ],
      technologies: [
        "Adobe Creative Suite",
        "Figma",
        "Sketch",
        "InVision",
        "Brandwatch",
        "Mention",
      ],
      metrics: { awareness: "+250%", recall: "+180%", preference: "+160%" },
      case_study: "Rebranding increased market share by 35% in 12 months",
      color: "#BB8FCE",
    },
  ];

  // Pricing packages
  const pricingPackages = [
    {
      id: "starter",
      name: "Starter",
      price: "$2,500",
      period: "month",
      description: "Perfect for small businesses ready to make their mark",
      features: [
        "2 service focuses",
        "Monthly strategy sessions",
        "Basic analytics reporting",
        "Email support",
        "1 dedicated specialist",
      ],
      highlight: false,
    },
    {
      id: "professional",
      name: "Professional",
      price: "$5,000",
      period: "month",
      description: "Comprehensive growth solution for scaling businesses",
      features: [
        "4 service focuses",
        "Bi-weekly strategy sessions",
        "Advanced analytics & insights",
        "Priority support",
        "Dedicated account manager",
        "Custom integrations",
        "Performance guarantees",
      ],
      highlight: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Custom",
      period: "solution",
      description: "Tailored strategies for industry leaders",
      features: [
        "All services included",
        "Weekly strategy sessions",
        "Real-time dashboard",
        "24/7 dedicated support",
        "Senior strategy team",
        "Custom tool development",
        "Executive reporting",
        "Industry-specific solutions",
      ],
      highlight: false,
    },
  ];

  // Process steps
  const processSteps = [
    {
      step: 1,
      title: "Discovery & Audit",
      description:
        "Deep dive into your business, market, and current digital presence",
      duration: "1-2 weeks",
      deliverables: [
        "Comprehensive audit report",
        "Competitor analysis",
        "Opportunity assessment",
      ],
    },
    {
      step: 2,
      title: "Strategy Development",
      description: "Custom strategy creation aligned with your business goals",
      duration: "1 week",
      deliverables: [
        "Strategic roadmap",
        "KPI framework",
        "Timeline & milestones",
      ],
    },
    {
      step: 3,
      title: "Implementation",
      description:
        "Execute strategies with precision and continuous optimization",
      duration: "Ongoing",
      deliverables: [
        "Campaign launches",
        "Content creation",
        "Technical implementation",
      ],
    },
    {
      step: 4,
      title: "Optimization & Scale",
      description: "Continuous improvement and scaling successful initiatives",
      duration: "Ongoing",
      deliverables: [
        "Performance reports",
        "Strategy refinements",
        "Growth acceleration",
      ],
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

  // Auto-rotate services
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [services.length]);

  // Auto-advance process steps
  useEffect(() => {
    const interval = setInterval(() => {
      setProcessStep((prev) => (prev + 1) % processSteps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [processSteps.length]);

  const handleServiceHover = (index) => {
    setActiveService(index);
  };

  return (
    <div className="services">
      {/* Interactive cursor */}
      <div
        className="cursor-glow"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />

      {/* Hero Section */}
      <section className="services-hero">
        <div className="hero-grid"></div>
        <div className="container">
          <div className="hero-content">
            <span className="hero-badge">Our Expertise</span>
            <h1 className="hero-title-Services">
              Services That
              <span className="highlight-text">Transform</span>
              Your Business
            </h1>
            <p className="hero-description">
              From strategy to execution, we deliver comprehensive digital
              solutions that drive measurable growth and sustainable success.
            </p>
            <div className="hero-metrics">
              <div className="metric-item">
                <span className="metric-number">500+</span>
                <span className="metric-label">Projects Delivered</span>
              </div>
              <div className="metric-item">
                <span className="metric-number">$50M+</span>
                <span className="metric-label">Revenue Generated</span>
              </div>
              <div className="metric-item">
                <span className="metric-number">98%</span>
                <span className="metric-label">Client Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Services Showcase */}
      <section className="services-showcase">
        <div className="container">
          <div className="showcase-layout">
            {/* Service Navigation */}
            <div className="service-navigation">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className={`service-nav-item ${
                    index === activeService ? "active" : ""
                  }`}
                  onMouseEnter={() => handleServiceHover(index)}
                  onClick={() => setActiveService(index)}
                >
                  <div className="nav-icon">{service.icon}</div>
                  <div className="nav-content">
                    <h3>{service.title}</h3>
                    <p>{service.tagline}</p>
                  </div>
                  <div className="nav-indicator"></div>
                </div>
              ))}
            </div>

            {/* Active Service Display */}
            <div className="service-display">
              <div className="service-card" key={activeService}>
                <div className="service-header">
                  <div
                    className="service-icon"
                    style={{ color: services[activeService].color }}
                  >
                    {services[activeService].icon}
                  </div>
                  <div>
                    <h2>{services[activeService].title}</h2>
                    <p className="service-tagline">
                      {services[activeService].tagline}
                    </p>
                  </div>
                </div>

                <div className="service-description">
                  <p>{services[activeService].description}</p>
                </div>

                <div className="service-features">
                  <h4>What's Included:</h4>
                  <div className="features-grid">
                    {services[activeService].features.map((feature, index) => (
                      <div
                        key={index}
                        className="feature-item"
                        onMouseEnter={() => setHoveredFeature(index)}
                        onMouseLeave={() => setHoveredFeature(null)}
                      >
                        <span className="feature-icon">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="service-technologies">
                  <h4>Technologies We Use:</h4>
                  <div className="tech-stack">
                    {services[activeService].technologies.map((tech, index) => (
                      <span key={index} className="tech-item">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="service-metrics">
                  <h4>Expected Results:</h4>
                  <div className="metrics-row">
                    {Object.entries(services[activeService].metrics).map(
                      ([key, value]) => (
                        <div key={key} className="metric-box">
                          <span className="metric-value">{value}</span>
                          <span className="metric-key">{key}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="service-case-study">
                  <div className="case-study-badge">Success Story</div>
                  <p>{services[activeService].case_study}</p>
                </div>

                <div className="service-actions">
                  <Link to="/contact" className="btn btn-primary">
                    Get Started
                  </Link>
                  <Link to="/portfolio" className="btn btn-outline">
                    View Case Studies
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="process-section">
        <div className="container">
          <h2 className="section-title">Our Proven Process</h2>
          <div className="process-timeline">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className={`process-step ${
                  index === processStep ? "active" : ""
                } ${index < processStep ? "completed" : ""}`}
                onClick={() => setProcessStep(index)}
              >
                <div className="step-number">{step.step}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <div className="step-details">
                    <span className="duration">{step.duration}</span>
                    <div className="deliverables">
                      {step.deliverables.map((item, idx) => (
                        <span key={idx} className="deliverable">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="step-connector"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section">
        <div className="container">
          <div className="pricing-header">
            <h2>Investment Plans</h2>
            <p>Choose the perfect plan to accelerate your growth</p>
          </div>

          <div className="pricing-grid">
            {pricingPackages.map((pkg, index) => (
              <div
                key={pkg.id}
                className={`pricing-card ${pkg.highlight ? "featured" : ""} ${
                  selectedPackage === pkg.id ? "selected" : ""
                }`}
                onClick={() => setSelectedPackage(pkg.id)}
              >
                {pkg.highlight && (
                  <div className="popular-badge">Most Popular</div>
                )}

                <div className="pricing-header-card">
                  <h3>{pkg.name}</h3>
                  <div className="price">
                    <span className="amount">{pkg.price}</span>
                    <span className="period">/{pkg.period}</span>
                  </div>
                  <p>{pkg.description}</p>
                </div>

                <div className="pricing-features">
                  {pkg.features.map((feature, index) => (
                    <div key={index} className="pricing-feature">
                      <span className="feature-check">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/contact"
                  className={`pricing-cta ${
                    pkg.highlight ? "btn btn-primary" : "btn btn-outline"
                  }`}
                >
                  {pkg.id === "enterprise" ? "Contact Sales" : "Get Started"}
                </Link>
              </div>
            ))}
          </div>

          <div className="pricing-note">
            <p>
              All plans include onboarding, training, and 30-day satisfaction
              guarantee
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta">
        <div className="cta-background">
          <div className="cta-particles"></div>
        </div>
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Business?</h2>
            <p>Let's discuss how our services can drive your success</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                Start Your Project
              </Link>
              <Link to="/about" className="btn btn-white">
                Meet Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
