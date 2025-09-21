import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Blog.css";

const Blog = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("magazine"); // magazine, cards, timeline
  const [featuredPost, setFeaturedPost] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [_, setReadingTime] = useState({}); //readingTime

  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI in Digital Marketing: 2025 Predictions",
      slug: "ai-digital-marketing-2025-predictions",
      excerpt:
        "Explore how artificial intelligence is reshaping marketing strategies and what businesses need to know to stay competitive in the AI-driven landscape.",
      content: "Full article content would go here...",
      author: {
        name: "Sarah Chen",
        avatar: "/api/placeholder/60/60",
        bio: "Head of AI Strategy at MUTE Marketing",
        social: { linkedin: "#", twitter: "#" },
      },
      category: "ai-tech",
      tags: ["AI", "Machine Learning", "Marketing Automation", "Future Trends"],
      publishDate: "2024-12-15",
      readTime: "8 min read",
      featured: true,
      trending: true,
      image: "/api/placeholder/800/400",
      likes: 234,
      shares: 89,
      comments: 45,
      difficulty: "Intermediate",
      series: "AI Marketing Mastery",
      relatedPosts: [2, 4, 6],
    },
    {
      id: 2,
      title: "Conversion Rate Optimization: The Complete 2024 Guide",
      slug: "conversion-rate-optimization-complete-guide-2024",
      excerpt:
        "Master the art and science of CRO with proven strategies, tools, and case studies that drive real results for modern businesses.",
      content: "Full article content would go here...",
      author: {
        name: "Michael Rodriguez",
        avatar: "/api/placeholder/60/60",
        bio: "Senior Conversion Specialist at MUTE Marketing",
        social: { linkedin: "#", twitter: "#" },
      },
      category: "conversion",
      tags: ["CRO", "A/B Testing", "User Experience", "Analytics"],
      publishDate: "2024-12-10",
      readTime: "12 min read",
      featured: false,
      trending: true,
      image: "/api/placeholder/800/400",
      likes: 189,
      shares: 67,
      comments: 32,
      difficulty: "Advanced",
      series: "CRO Fundamentals",
      relatedPosts: [1, 5, 7],
    },
    {
      id: 3,
      title: "Social Media ROI: How to Measure What Actually Matters",
      slug: "social-media-roi-measurement-guide",
      excerpt:
        "Stop vanity metrics and start measuring social media success with KPIs that directly impact your bottom line and business growth.",
      content: "Full article content would go here...",
      author: {
        name: "Emily Watson",
        avatar: "/api/placeholder/60/60",
        bio: "Social Media Strategist at MUTE Marketing",
        social: { linkedin: "#", twitter: "#" },
      },
      category: "social-media",
      tags: ["Social Media", "ROI", "Analytics", "KPIs"],
      publishDate: "2024-12-08",
      readTime: "6 min read",
      featured: false,
      trending: false,
      image: "/api/placeholder/800/400",
      likes: 156,
      shares: 43,
      comments: 28,
      difficulty: "Beginner",
      series: null,
      relatedPosts: [4, 6, 8],
    },
    {
      id: 4,
      title: "Local SEO Domination: Small Business Growth Strategies",
      slug: "local-seo-small-business-growth-strategies",
      excerpt:
        "Transform your local presence with proven SEO tactics that drive foot traffic, phone calls, and revenue for location-based businesses.",
      content: "Full article content would go here...",
      author: {
        name: "David Park",
        avatar: "/api/placeholder/60/60",
        bio: "Local SEO Expert at MUTE Marketing",
        social: { linkedin: "#", twitter: "#" },
      },
      category: "seo",
      tags: [
        "Local SEO",
        "Small Business",
        "Google My Business",
        "Local Marketing",
      ],
      publishDate: "2024-12-05",
      readTime: "10 min read",
      featured: true,
      trending: false,
      image: "/api/placeholder/800/400",
      likes: 278,
      shares: 95,
      comments: 54,
      difficulty: "Intermediate",
      series: "SEO Mastery",
      relatedPosts: [2, 5, 9],
    },
    {
      id: 5,
      title: "E-commerce Growth Hacks: 10x Your Online Revenue in 2024",
      slug: "ecommerce-growth-hacks-2024",
      excerpt:
        "Discover the lesser-known strategies and tactics that successful e-commerce brands use to scale rapidly and dominate their markets.",
      content: "Full article content would go here...",
      author: {
        name: "Lisa Chang",
        avatar: "/api/placeholder/60/60",
        bio: "E-commerce Growth Specialist at MUTE Marketing",
        social: { linkedin: "#", twitter: "#" },
      },
      category: "ecommerce",
      tags: ["E-commerce", "Growth Hacking", "Online Revenue", "Scaling"],
      publishDate: "2024-12-03",
      readTime: "9 min read",
      featured: false,
      trending: true,
      image: "/api/placeholder/800/400",
      likes: 312,
      shares: 128,
      comments: 76,
      difficulty: "Advanced",
      series: "E-commerce Excellence",
      relatedPosts: [1, 3, 7],
    },
    {
      id: 6,
      title: "Content Marketing Psychology: What Makes People Share",
      slug: "content-marketing-psychology-viral-sharing",
      excerpt:
        "Understand the psychological triggers that drive content virality and learn how to create shareable content that amplifies your brand reach.",
      content: "Full article content would go here...",
      author: {
        name: "Alex Thompson",
        avatar: "/api/placeholder/60/60",
        bio: "Content Psychology Expert at MUTE Marketing",
        social: { linkedin: "#", twitter: "#" },
      },
      category: "content",
      tags: [
        "Content Marketing",
        "Psychology",
        "Viral Marketing",
        "Brand Reach",
      ],
      publishDate: "2024-11-28",
      readTime: "7 min read",
      featured: false,
      trending: false,
      image: "/api/placeholder/800/400",
      likes: 203,
      shares: 87,
      comments: 39,
      difficulty: "Intermediate",
      series: "Content Mastery",
      relatedPosts: [2, 4, 8],
    },
    {
      id: 7,
      title: "PPC Campaign Optimization: Advanced Bidding Strategies",
      slug: "ppc-campaign-optimization-advanced-bidding",
      excerpt:
        "Master sophisticated bidding techniques and automation strategies that maximize ROAS while minimizing wasted ad spend across platforms.",
      content: "Full article content would go here...",
      author: {
        name: "Ryan Mitchell",
        avatar: "/api/placeholder/60/60",
        bio: "PPC Optimization Specialist at MUTE Marketing",
        social: { linkedin: "#", twitter: "#" },
      },
      category: "ppc",
      tags: ["PPC", "Google Ads", "Bidding Strategies", "ROAS Optimization"],
      publishDate: "2024-11-25",
      readTime: "11 min read",
      featured: false,
      trending: false,
      image: "/api/placeholder/800/400",
      likes: 167,
      shares: 52,
      comments: 31,
      difficulty: "Advanced",
      series: "PPC Mastery",
      relatedPosts: [1, 5, 9],
    },
    {
      id: 8,
      title: "Brand Storytelling in the Digital Age: Authentic Connections",
      slug: "brand-storytelling-digital-age-authentic-connections",
      excerpt:
        "Learn how to craft compelling brand narratives that resonate with modern audiences and build lasting emotional connections.",
      content: "Full article content would go here...",
      author: {
        name: "Maria Gonzalez",
        avatar: "/api/placeholder/60/60",
        bio: "Brand Storytelling Expert at MUTE Marketing",
        social: { linkedin: "#", twitter: "#" },
      },
      category: "branding",
      tags: [
        "Brand Storytelling",
        "Digital Branding",
        "Authentic Marketing",
        "Emotional Connection",
      ],
      publishDate: "2024-11-20",
      readTime: "8 min read",
      featured: true,
      trending: false,
      image: "/api/placeholder/800/400",
      likes: 245,
      shares: 103,
      comments: 58,
      difficulty: "Beginner",
      series: "Brand Excellence",
      relatedPosts: [3, 6, 4],
    },
  ];

  // Categories
  const categories = [
    { id: "all", label: "All Posts", count: blogPosts.length, icon: "📚" },
    {
      id: "ai-tech",
      label: "AI & Tech",
      count: blogPosts.filter((p) => p.category === "ai-tech").length,
      icon: "🤖",
    },
    {
      id: "seo",
      label: "SEO",
      count: blogPosts.filter((p) => p.category === "seo").length,
      icon: "🔍",
    },
    {
      id: "social-media",
      label: "Social Media",
      count: blogPosts.filter((p) => p.category === "social-media").length,
      icon: "📱",
    },
    {
      id: "conversion",
      label: "Conversion",
      count: blogPosts.filter((p) => p.category === "conversion").length,
      icon: "📈",
    },
    {
      id: "content",
      label: "Content",
      count: blogPosts.filter((p) => p.category === "content").length,
      icon: "✍️",
    },
    {
      id: "ecommerce",
      label: "E-commerce",
      count: blogPosts.filter((p) => p.category === "ecommerce").length,
      icon: "🛒",
    },
    {
      id: "ppc",
      label: "PPC",
      count: blogPosts.filter((p) => p.category === "ppc").length,
      icon: "🎯",
    },
    {
      id: "branding",
      label: "Branding",
      count: blogPosts.filter((p) => p.category === "branding").length,
      icon: "🎨",
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

  // Auto-rotate featured posts
  useEffect(() => {
    const featuredPosts = blogPosts.filter((post) => post.featured);
    const interval = setInterval(() => {
      setFeaturedPost((prev) => (prev + 1) % featuredPosts.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [blogPosts]);

  // Calculate reading time for posts
  useEffect(() => {
    const times = {};
    blogPosts.forEach((post) => {
      const wordCount = post.content.split(" ").length;
      const time = Math.ceil(wordCount / 200); // Average reading speed
      times[post.id] = `${time} min read`;
    });
    setReadingTime(times);
  }, [blogPosts]);

  // Filter and sort posts
  const filteredPosts = blogPosts
    .filter((post) => {
      const matchesCategory =
        selectedCategory === "all" || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "latest":
          return new Date(b.publishDate) - new Date(a.publishDate);
        case "popular":
          return b.likes + b.shares - (a.likes + a.shares);
        case "trending":
          return b.trending - a.trending;
        default:
          return 0;
      }
    });

  const featuredPosts = blogPosts.filter((post) => post.featured);
  const trendingPosts = blogPosts.filter((post) => post.trending).slice(0, 4);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "#51cf66";
      case "Intermediate":
        return "#ffd43b";
      case "Advanced":
        return "#ff6b6b";
      default:
        return "#868e96";
    }
  };

  return (
    <div className="blog">
      {/* Interactive cursor */}
      <div
        className="cursor-glow"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />

      {/* Hero Section */}
      <section className="blog-hero">
        <div className="hero-neural-network"></div>
        <div className="container">
          <div className="hero-content">
            <span className="hero-badge">Knowledge Hub</span>
            <h1 className="hero-title">
              Insights That
              <span className="highlight-text">Ignite Growth</span>
            </h1>
            <p className="hero-description">
              Dive deep into the latest strategies, trends, and insights from
              our marketing experts. Transform your business with actionable
              knowledge and proven methodologies.
            </p>

            <div className="hero-stats">
              <div className="blog-stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Expert Articles</span>
              </div>
              <div className="blog-stat">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Monthly Readers</span>
              </div>
              <div className="blog-stat">
                <span className="stat-number">98%</span>
                <span className="stat-label">Actionable Content</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Controls */}
      <section className="blog-controls">
        <div className="container">
          <div className="controls-wrapper">
            <div className="search-section">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search articles, topics, or strategies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button className="search-btn">🔍</button>
              </div>
            </div>

            <div className="filter-section">
              <div className="category-filters">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`category-filter ${
                      selectedCategory === category.id ? "active" : ""
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <span className="category-icon">{category.icon}</span>
                    <span className="category-label">{category.label}</span>
                    <span className="category-count">{category.count}</span>
                  </button>
                ))}
              </div>

              <div className="view-and-sort">
                <div className="sort-controls">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                  >
                    <option value="latest">Latest First</option>
                    <option value="popular">Most Popular</option>
                    <option value="trending">Trending</option>
                  </select>
                </div>

                <div className="view-toggles">
                  <button
                    className={`view-toggle ${
                      viewMode === "magazine" ? "active" : ""
                    }`}
                    onClick={() => setViewMode("magazine")}
                    title="Magazine View"
                  >
                    📰
                  </button>
                  <button
                    className={`view-toggle ${
                      viewMode === "cards" ? "active" : ""
                    }`}
                    onClick={() => setViewMode("cards")}
                    title="Cards View"
                  >
                    🃏
                  </button>
                  <button
                    className={`view-toggle ${
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
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="featured-section">
        <div className="container">
          <div className="featured-layout">
            <div className="featured-main">
              {featuredPosts.length > 0 && (
                <article className="featured-article" key={featuredPost}>
                  <div className="featured-image">
                    <div
                      className="image-placeholder"
                      style={{
                        background: `linear-gradient(135deg, var(--primary-black) 0%, var(--primary-yellow) 100%)`,
                      }}
                    >
                      <span className="featured-badge">Featured</span>
                    </div>
                    <div className="featured-overlay">
                      <div className="overlay-content">
                        <span className="article-category">
                          {
                            categories.find(
                              (cat) =>
                                cat.id === featuredPosts[featuredPost]?.category
                            )?.icon
                          }
                          {
                            categories.find(
                              (cat) =>
                                cat.id === featuredPosts[featuredPost]?.category
                            )?.label
                          }
                        </span>
                        <h2>{featuredPosts[featuredPost]?.title}</h2>
                        <p>{featuredPosts[featuredPost]?.excerpt}</p>
                        <div className="article-meta">
                          <span className="read-time">
                            {featuredPosts[featuredPost]?.readTime}
                          </span>
                          <span
                            className="difficulty"
                            style={{
                              color: getDifficultyColor(
                                featuredPosts[featuredPost]?.difficulty
                              ),
                            }}
                          >
                            {featuredPosts[featuredPost]?.difficulty}
                          </span>
                        </div>
                        <Link
                          to={`/blog/${featuredPosts[featuredPost]?.slug}`}
                          className="read-more-btn"
                        >
                          Read Full Article
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              )}

              <div className="featured-indicators">
                {featuredPosts.map((_, index) => (
                  <button
                    key={index}
                    className={`featured-indicator ${
                      index === featuredPost ? "active" : ""
                    }`}
                    onClick={() => setFeaturedPost(index)}
                  />
                ))}
              </div>
            </div>

            <div className="trending-sidebar">
              <h3>Trending Now</h3>
              <div className="trending-list">
                {trendingPosts.map((post, index) => (
                  <article key={post.id} className="trending-item">
                    <div className="trending-rank">#{index + 1}</div>
                    <div className="trending-content">
                      <h4>
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </h4>
                      <div className="trending-meta">
                        <span className="author">{post.author.name}</span>
                        <span className="date">
                          {formatDate(post.publishDate)}
                        </span>
                      </div>
                      <div className="engagement-stats">
                        <span className="stat">👍 {post.likes}</span>
                        <span className="stat">🔄 {post.shares}</span>
                        <span className="stat">💬 {post.comments}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Blog Content */}
      {viewMode === "magazine" && (
        <section className="blog-magazine">
          <div className="container">
            <div className="magazine-layout">
              <div className="articles-grid">
                {filteredPosts.map((post, index) => (
                  <article
                    key={post.id}
                    className={`magazine-article ${
                      index === 0 ? "large" : index < 3 ? "medium" : "small"
                    }`}
                  >
                    <div className="article-image">
                      <div
                        className="image-placeholder"
                        style={{
                          background: `linear-gradient(135deg, var(--secondary-black) 0%, var(--primary-yellow) 100%)`,
                        }}
                      >
                        <span className="article-category-badge">
                          {
                            categories.find((cat) => cat.id === post.category)
                              ?.icon
                          }
                        </span>
                      </div>
                      {post.series && (
                        <div className="series-badge">
                          Series: {post.series}
                        </div>
                      )}
                    </div>

                    <div className="article-content">
                      <div className="article-header">
                        <div className="article-meta-top">
                          <span className="category">
                            {
                              categories.find((cat) => cat.id === post.category)
                                ?.label
                            }
                          </span>
                          <span
                            className="difficulty"
                            style={{
                              color: getDifficultyColor(post.difficulty),
                            }}
                          >
                            {post.difficulty}
                          </span>
                        </div>

                        <h3>
                          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                        </h3>

                        <p className="excerpt">{post.excerpt}</p>
                      </div>

                      <div className="article-footer">
                        <div className="author-info">
                          <div className="author-avatar">
                            {post.author.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div className="author-details">
                            <span className="author-name">
                              {post.author.name}
                            </span>
                            <span className="publish-date">
                              {formatDate(post.publishDate)}
                            </span>
                          </div>
                        </div>

                        <div className="article-stats">
                          <span className="read-time">{post.readTime}</span>
                          <div className="engagement">
                            <span>👍 {post.likes}</span>
                            <span>💬 {post.comments}</span>
                          </div>
                        </div>
                      </div>

                      <div className="article-tags">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="tag">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Cards View */}
      {viewMode === "cards" && (
        <section className="blog-cards">
          <div className="container">
            <div className="cards-grid">
              {filteredPosts.map((post) => (
                <article key={post.id} className="blog-card">
                  <div className="card-glow"></div>

                  <div className="card-image">
                    <div
                      className="image-placeholder"
                      style={{
                        background: `linear-gradient(135deg, var(--secondary-black) 0%, var(--primary-yellow) 100%)`,
                      }}
                    >
                      <span className="card-category">
                        {
                          categories.find((cat) => cat.id === post.category)
                            ?.icon
                        }
                      </span>
                    </div>
                    {post.trending && (
                      <div className="trending-indicator">🔥 Trending</div>
                    )}
                  </div>

                  <div className="card-content">
                    <div className="card-header">
                      <div className="card-meta">
                        <span className="category">
                          {
                            categories.find((cat) => cat.id === post.category)
                              ?.label
                          }
                        </span>
                        <span className="read-time">{post.readTime}</span>
                      </div>

                      <h3>
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>

                      <p className="card-excerpt">{post.excerpt}</p>
                    </div>

                    <div className="card-footer">
                      <div className="author-section">
                        <div className="author-avatar-small">
                          {post.author.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <span className="author-name">
                            {post.author.name}
                          </span>
                          <span className="post-date">
                            {formatDate(post.publishDate)}
                          </span>
                        </div>
                      </div>

                      <div className="card-actions">
                        <div className="engagement-stats">
                          <span>👍 {post.likes}</span>
                          <span>🔄 {post.shares}</span>
                          <span>💬 {post.comments}</span>
                        </div>
                        <Link to={`/blog/${post.slug}`} className="read-more">
                          Read More →
                        </Link>
                      </div>
                    </div>

                    <div className="card-tags">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="card-tag">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Timeline View */}
      {viewMode === "timeline" && (
        <section className="blog-timeline">
          <div className="container">
            <div className="timeline-container">
              <div className="timeline-line"></div>

              {filteredPosts.map((post, index) => (
                <article
                  key={post.id}
                  className={`timeline-post ${
                    index % 2 === 0 ? "left" : "right"
                  }`}
                >
                  <div className="timeline-marker">
                    <span className="marker-date">
                      {new Date(post.publishDate).getDate()}
                    </span>
                    <span className="marker-month">
                      {new Date(post.publishDate).toLocaleDateString("en-US", {
                        month: "short",
                      })}
                    </span>
                  </div>

                  <div className="timeline-card">
                    <div className="timeline-header">
                      <div className="timeline-meta">
                        <span className="timeline-category">
                          {
                            categories.find((cat) => cat.id === post.category)
                              ?.icon
                          }
                          {
                            categories.find((cat) => cat.id === post.category)
                              ?.label
                          }
                        </span>
                        <span
                          className="timeline-difficulty"
                          style={{
                            color: getDifficultyColor(post.difficulty),
                          }}
                        >
                          {post.difficulty}
                        </span>
                      </div>

                      <h3>
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>

                      <p className="timeline-excerpt">{post.excerpt}</p>
                    </div>

                    <div className="timeline-footer">
                      <div className="timeline-author">
                        <span className="author-name">
                          By {post.author.name}
                        </span>
                        <span className="read-time">{post.readTime}</span>
                      </div>

                      <div className="timeline-engagement">
                        <span>👍 {post.likes}</span>
                        <span>💬 {post.comments}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="newsletter-cta">
        <div className="cta-neural-bg"></div>
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay Ahead of the Curve</h2>
            <p>
              Get weekly insights, exclusive strategies, and industry updates
              delivered to your inbox
            </p>

            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address"
                className="newsletter-input"
              />
              <button className="newsletter-btn">Subscribe Now</button>
            </div>

            <div className="newsletter-benefits">
              <div className="benefit">
                <span className="benefit-icon">📧</span>
                <span>Weekly expert insights</span>
              </div>
              <div className="benefit">
                <span className="benefit-icon">🎯</span>
                <span>Exclusive strategies</span>
              </div>
              <div className="benefit">
                <span className="benefit-icon">📈</span>
                <span>Industry trend reports</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
