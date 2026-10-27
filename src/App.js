import React, { useState, useEffect } from 'react';
import {
  Flame,
  Utensils,
  Beer,
  Leaf,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  X,
  Users,
  MessageSquare,
  Check
} from 'lucide-react';
import { FaInstagram, FaFacebookF, FaTwitter, FaTiktok } from 'react-icons/fa';
import './App.css';
import PageLoader from './PageLoader';
import StaggeredMenu from './StaggeredMenu';

function App() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Today's date YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];

  // Form states
  const [bookingData, setBookingData] = useState({
    name: '',
    phone: '',
    email: '',
    date: todayStr,
    time: '18:00',
    guests: '2',
    seating: 'Garden Patio',
    notes: ''
  });

  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // ── Scroll listener for navbar ──────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Scroll reveal observer ──────────────────────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.08 }
    );

    const targets = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-zoom'
    );
    targets.forEach((el) => observer.observe(el));
    return () => targets.forEach((el) => observer.unobserve(el));
  }, []);

  // ── Nav items ───────────────────────────────────────────────────────────
  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#menu', label: 'Menu' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#events', label: 'Events' },
    { href: '#contact', label: 'Contact' },
  ];

  const mobileNavItems = navLinks.map((l) => ({
    label: l.label,
    link: l.href,
    ariaLabel: l.label,
  }));

  const socialItems = [
    { label: 'Instagram', link: 'https://instagram.com' },
    { label: 'Facebook', link: 'https://facebook.com' },
    { label: 'TikTok', link: 'https://tiktok.com' },
    { label: 'Twitter', link: 'https://twitter.com' },
  ];

  // ── Signature items from showcase ───────────────────────────────────────
  const signatureDishes = [
    {
      title: 'SMOKED BEEF BRISKET',
      desc: 'Tender, flavourful and smoked for up to 18 hours.',
      img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
    },
    {
      title: 'BEEF RIBS',
      desc: 'Slow-smoked, fall-off-the-bone goodness.',
      img: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&auto=format&fit=crop&q=80',
    },
    {
      title: 'CHICKEN',
      desc: 'Juicy, smoky, and full of flavour.',
      img: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&auto=format&fit=crop&q=80',
    },
    {
      title: 'GOAT MANDI',
      desc: 'A local favourite, rich in flavour.',
      img: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=800&auto=format&fit=crop&q=80',
    },
  ];

  // ── Menu data matching showcase ─────────────────────────────────────────
  const menuCategories = [
    {
      title: 'SMOKED MEATS',
      items: [
        { name: 'Beef Brisket', price: 'KSh 2,200' },
        { name: 'Beef Ribs', price: 'KSh 2,000' },
        { name: 'Smoked Chicken', price: 'KSh 1,500' },
        { name: 'Pork Ribs', price: 'KSh 1,800' },
      ],
    },
    {
      title: 'MAINS',
      items: [
        { name: 'Goat Mandi', price: 'KSh 1,800' },
        { name: 'Lamb Chops', price: 'KSh 1,600' },
        { name: 'Grilled Fish', price: 'KSh 1,400' },
        { name: 'Chicken Plates', price: 'KSh 1,300' },
      ],
    },
    {
      title: 'SIDES',
      items: [
        { name: 'Mac & Cheese', price: 'KSh 600' },
        { name: 'Coleslaw', price: 'KSh 500' },
        { name: 'Grilled Vegetables', price: 'KSh 500' },
        { name: 'Fries', price: 'KSh 400' },
        { name: 'Ugali', price: 'KSh 400' },
      ],
    },
    {
      title: 'DRINKS',
      items: [
        { name: 'Craft Beer (local & international)', price: 'KSh 500+' },
        { name: 'Wines', price: 'KSh 600+' },
        { name: 'Soft Drinks', price: 'KSh 300' },
        { name: 'Fresh Juices', price: 'KSh 400' },
      ],
    },
  ];

  // ── Gallery images ──────────────────────────────────────────────────────
  const galleryImages = [
    {
      url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=700&auto=format&fit=crop&q=80',
      alt: 'Smoked Beef Brisket',
    },
    {
      url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700&auto=format&fit=crop&q=80',
      alt: 'Garden Dining Patio',
    },
    {
      url: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=700&auto=format&fit=crop&q=80',
      alt: 'Craft Beer at the Bar',
    },
    {
      url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=700&auto=format&fit=crop&q=80',
      alt: 'Pitmaster Feasting Platter',
    },
    {
      url: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=700&auto=format&fit=crop&q=80',
      alt: 'Night Atmosphere under Fairy Lights',
    },
  ];

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  const resetBookingModal = () => {
    setBookingSubmitted(false);
    setIsModalOpen(false);
  };

  const handleWhatsAppBooking = () => {
    const text = encodeURIComponent(
      `Hello Lazy Lizard Smokehouse! I would like to reserve a table:\n` +
      `• Name: ${bookingData.name || 'Guest'}\n` +
      `• Date: ${bookingData.date || todayStr}\n` +
      `• Time: ${bookingData.time}\n` +
      `• Guests: ${bookingData.guests}\n` +
      `• Seating Area: ${bookingData.seating}\n` +
      (bookingData.notes ? `• Special Requests: ${bookingData.notes}\n` : '') +
      `Looking forward to visiting in Kilimani!`
    );
    window.open(`https://wa.me/254113346678?text=${text}`, '_blank');
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => setContactSubmitted(false), 3000);
  };

  return (
    <>
      <PageLoader />

      <div className="App" id="home">

        {/* ── TOP NAVBAR ── */}
        <header className={`navbar${navScrolled ? ' scrolled' : ''}`}>
          <div className="nav-container">
            <a href="#home" className="nav-logo">
              <img
                src="/showcase_logo.png"
                alt="Lazy Lizard Smokehouse"
                className="nav-logo-showcase"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/lazylizardlogo.jpg';
                }}
              />
            </a>

            <nav className="nav-links">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="mobile-menu-btn">
              <StaggeredMenu
                position="right"
                items={mobileNavItems}
                socialItems={socialItems}
                displaySocials
                displayItemNumbering={true}
                menuButtonColor="#ffffff"
                openMenuButtonColor="#ffffff"
                changeMenuColorOnOpen={true}
                colors={['#C85A24', '#0D0E0E']}
                logoUrl="/showcase_logo.png"
                accentColor="#E29338"
              />
            </div>
          </div>
        </header>

        {/* ── HERO SECTION ── */}
        <section className="hero-section">
          <img
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&auto=format&fit=crop&q=80"
            alt="Smoked brisket bark and beer"
            className="hero-bg"
          />
          <div className="hero-overlay" />

          <div className="hero-container">
            <div className="hero-content">
              <div className="eyebrow hero-eyebrow reveal">
                HOUSE OF BRISKETS &amp; BEER
              </div>
              <h1 className="hero-title reveal" data-delay="100">
                <span>GOOD FOOD</span>
                <span>GREAT COMPANY</span>
              </h1>
              <p className="hero-desc reveal" data-delay="200">
                Slow-smoked meats, bold flavours and a relaxed garden setting in the heart of Kilimani, Nairobi.
              </p>
              <div className="hero-buttons reveal" data-delay="300">
                <a href="#menu" className="btn-primary">
                  View Our Menu
                </a>
                <button
                  className="btn-secondary"
                  onClick={() => setIsModalOpen(true)}
                >
                  Book a Table
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4-PILLAR VALUE PROPOSITIONS BAR ── */}
        <section className="pillars-bar">
          <div className="pillars-container">
            <div className="pillar-item reveal" data-delay="100">
              <div className="pillar-icon-box">
                <Flame size={34} strokeWidth={2.2} />
              </div>
              <h3 className="pillar-title">PREMIUM SMOKED MEATS</h3>
              <p className="pillar-desc">
                18-hour slow smoke. Unforgettable flavour.
              </p>
            </div>

            <div className="pillar-item reveal" data-delay="200">
              <div className="pillar-icon-box">
                <Utensils size={32} strokeWidth={2.2} />
              </div>
              <h3 className="pillar-title">DELICIOUS FOOD</h3>
              <p className="pillar-desc">
                From briskets to traditional favourites.
              </p>
            </div>

            <div className="pillar-item reveal" data-delay="300">
              <div className="pillar-icon-box">
                <Beer size={34} strokeWidth={2.2} />
              </div>
              <h3 className="pillar-title">CRAFT BEER &amp; DRINKS</h3>
              <p className="pillar-desc">
                Cold beers, great company, perfect pairings.
              </p>
            </div>

            <div className="pillar-item reveal" data-delay="400">
              <div className="pillar-icon-box">
                <Leaf size={32} strokeWidth={2.2} />
              </div>
              <h3 className="pillar-title">GARDEN DINING</h3>
              <p className="pillar-desc">
                Relaxed, open-air setting in Kilimani.
              </p>
            </div>
          </div>
        </section>

        {/* ── WELCOME TO LAZY LIZARD SMOKEHOUSE ── */}
        <section className="welcome-section" id="welcome">
          <div className="welcome-container">
            <div className="welcome-img-wrap reveal-left">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=80"
                alt="Garden patio dining"
                className="welcome-img"
              />
            </div>

            <div className="welcome-text reveal-right">
              <div className="eyebrow welcome-eyebrow">WELCOME TO</div>
              <h2 className="welcome-title">LAZY LIZARD SMOKEHOUSE</h2>
              <p className="welcome-p">
                We're more than just a smokehouse — we're a place to unwind, share good food, and enjoy great company. From our signature briskets and ribs to fresh, flavourful sides and refreshing drinks, every dish is crafted with care.
              </p>
              <a href="#about" className="welcome-link">
                Our Story <ArrowRight size={20} />
              </a>
            </div>
          </div>

          <img
            src="/showcase_assets/lizard_watermark.png"
            alt="Lizard watermark"
            className="welcome-watermark"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </section>

        {/* ── OUR SIGNATURES ── */}
        <section className="signatures-section" id="signatures">
          <div className="signatures-container">
            <div className="section-head-simple reveal">
              <h2 className="section-head-title">OUR SIGNATURES</h2>
            </div>

            <div className="signatures-grid">
              {signatureDishes.map((item, index) => (
                <div
                  key={index}
                  className="sig-card reveal-zoom"
                  data-delay={String(index * 100)}
                >
                  <div className="sig-img-wrap">
                    <img src={item.img} alt={item.title} className="sig-img" />
                  </div>
                  <div className="sig-content">
                    <h3 className="sig-title">{item.title}</h3>
                    <p className="sig-desc">{item.desc}</p>
                    <a href="#menu" className="sig-link">
                      View Menu <ArrowRight size={15} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PLAN YOUR VISIT BANNER ── */}
        <section className="visit-banner-section" id="events">
          <div className="visit-banner-container">
            <div className="visit-banner reveal">
              <img
                src="https://images.unsplash.com/photo-1608270190977-83c846610738?w=1200&auto=format&fit=crop&q=80"
                alt="Cold beer on wood table"
                className="visit-banner-bg"
              />
              <div className="visit-banner-overlay" />

              <div className="visit-banner-content">
                <div className="eyebrow visit-banner-eyebrow">
                  GOOD FOOD, COLD BEER, GREAT VIBES
                </div>
                <h2 className="visit-banner-title">PLAN YOUR VISIT</h2>
                <p className="visit-banner-desc">
                  Whether it's a casual lunch, a family dinner or a group celebration, we'd love to have you.
                </p>
                <button
                  className="btn-primary"
                  onClick={() => setIsModalOpen(true)}
                >
                  Book a Table
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── OUR MENU SECTION ── */}
        <section className="menu-section" id="menu">
          <div className="section-banner-dark">
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&auto=format&fit=crop&q=80"
              alt="Smoked brisket banner"
              className="section-banner-bg"
            />
            <div className="section-banner-overlay" />
            <div className="section-banner-content reveal">
              <h2 className="section-banner-title">OUR MENU</h2>
              <p className="section-banner-subtitle">
                Fresh ingredients. Bold flavours. Something for everyone.
              </p>
            </div>
          </div>

          <div className="menu-content-wrap">
            <div className="menu-paper-card reveal">
              <div className="menu-columns">
                {menuCategories.map((cat, idx) => (
                  <div key={idx} className="menu-cat">
                    <h3 className="menu-cat-title">{cat.title}</h3>
                    <div className="menu-items-list">
                      {cat.items.map((item, i) => (
                        <div key={i} className="menu-line-item">
                          <span className="menu-item-left">{item.name}</span>
                          <span className="menu-item-dots" />
                          <span className="menu-item-right">{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <p className="menu-disclaimer">
                Prices are indicative and may vary. Please check with our team for the latest menu and specials.
              </p>
            </div>
          </div>
        </section>

        {/* ── ABOUT US SECTION ── */}
        <section className="about-section" id="about">
          <div className="section-banner-dark">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&auto=format&fit=crop&q=80"
              alt="Garden lights"
              className="section-banner-bg"
            />
            <div className="section-banner-overlay" />
            <div className="section-banner-content reveal">
              <h2 className="section-banner-title">ABOUT US</h2>
              <p className="section-banner-subtitle">
                Great food, good people, real moments.
              </p>
            </div>
          </div>

          <div className="about-content-wrap">
            <div className="about-card reveal">
              <div className="about-text-side">
                <div className="eyebrow about-eyebrow">OUR STORY</div>
                <p className="about-p">
                  Lazy Lizard Smokehouse was born out of a simple idea — bring people together over great food and cold drinks.
                </p>
                <p className="about-p">
                  We took our love for authentic barbecue, good company and laid-back vibes, and turned it into a space where friends, families and food lovers can relax, indulge and make lasting memories.
                </p>

                <div className="about-pills-row">
                  <div className="about-pill">
                    <Flame size={17} color="#C85A24" /> BBQ
                  </div>
                  <span className="about-pill-divider" />
                  <div className="about-pill">
                    <Beer size={17} color="#C85A24" /> BEER
                  </div>
                  <span className="about-pill-divider" />
                  <div className="about-pill">
                    <Leaf size={17} color="#C85A24" /> GARDEN
                  </div>
                  <span className="about-pill-divider" />
                  <div className="about-pill">
                    <Users size={17} color="#C85A24" /> COMMUNITY
                  </div>
                </div>
              </div>

              <div className="about-img-side">
                <img
                  src="/showcase_assets/about_sign.jpg"
                  alt="Lazy Lizard Smokehouse Illuminated Sign"
                  className="about-sign-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80';
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── GALLERY SECTION ── */}
        <section className="gallery-section" id="gallery">
          <div className="section-banner-dark">
            <img
              src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=1600&auto=format&fit=crop&q=80"
              alt="Night garden patio"
              className="section-banner-bg"
            />
            <div className="section-banner-overlay" />
            <div className="section-banner-content reveal">
              <h2 className="section-banner-title">GALLERY</h2>
              <p className="section-banner-subtitle">
                A glimpse of good food, good vibes and great times.
              </p>
            </div>
          </div>

          <div className="gallery-grid-wrap">
            <div className="gallery-grid">
              {galleryImages.map((img, i) => (
                <div key={i} className="gal-card reveal-zoom" data-delay={String(i * 100)}>
                  <img src={img.url} alt={img.alt} className="gal-img" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GET IN TOUCH / CONTACT SECTION ── */}
        <section className="contact-section" id="contact">
          <div className="section-banner-dark">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&auto=format&fit=crop&q=80"
              alt="Contact foliage banner"
              className="section-banner-bg"
            />
            <div className="section-banner-overlay" />
            <div className="section-banner-content reveal">
              <h2 className="section-banner-title">GET IN TOUCH</h2>
              <p className="section-banner-subtitle">
                We'd love to hear from you.
              </p>
            </div>
          </div>

          <div className="contact-content-wrap">
            <div className="contact-card reveal">
              {/* Left Column: Visit Us */}
              <div className="contact-info-col">
                <h3 className="contact-col-title">VISIT US</h3>

                <div className="contact-details-list">
                  <div className="contact-item">
                    <MapPin className="contact-item-icon" size={20} />
                    <div className="contact-item-text">
                      <strong>Kilimani, Nairobi</strong>
                      <div className="contact-item-sub">Dennis Pritt Road area (FQTW+55)</div>
                    </div>
                  </div>

                  <div className="contact-item">
                    <Phone className="contact-item-icon" size={20} />
                    <div className="contact-item-text">
                      <a href="tel:+254113346678" style={{ color: 'inherit', textDecoration: 'none' }}>
                        +254 113 346678
                      </a>
                    </div>
                  </div>

                  <div className="contact-item">
                    <Mail className="contact-item-icon" size={20} />
                    <div className="contact-item-text">
                      <a href="mailto:hello@lazylizardsmokehouse.co.ke" style={{ color: 'inherit', textDecoration: 'none' }}>
                        hello@lazylizardsmokehouse.co.ke
                      </a>
                    </div>
                  </div>
                </div>

                <div className="contact-socials-row">
                  <a href="https://instagram.com" className="social-circle-link" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <FaInstagram size={17} />
                  </a>
                  <a href="https://facebook.com" className="social-circle-link" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <FaFacebookF size={16} />
                  </a>
                  <a href="https://tiktok.com" className="social-circle-link" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                    <FaTiktok size={15} />
                  </a>
                </div>
              </div>

              {/* Right Column: Send Message & Map */}
              <div className="contact-form-col">
                <h3 className="contact-col-title">SEND US A MESSAGE</h3>

                <form className="contact-form" onSubmit={handleContactSubmit}>
                  <div className="form-group-simple">
                    <label className="form-label-simple">Name *</label>
                    <input
                      type="text"
                      className="form-input-simple"
                      required
                      value={contactData.name}
                      onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group-simple">
                    <label className="form-label-simple">Email *</label>
                    <input
                      type="email"
                      className="form-input-simple"
                      required
                      value={contactData.email}
                      onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group-simple">
                    <label className="form-label-simple">Message *</label>
                    <textarea
                      className="form-textarea-simple"
                      rows="3"
                      required
                      value={contactData.message}
                      onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                    {contactSubmitted ? 'Message Sent! ✓' : 'Send Message'}
                  </button>
                </form>

                {/* Map preview */}
                <div className="contact-map-box">
                  <iframe
                    className="contact-map-frame"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7905545234387!2d36.7833!3d-1.2993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTcnNTcuNSJTIDM2wrA0NycwMC4wIkU!5e0!3m2!1sen!2ske!4v1234567890"
                    allowFullScreen=""
                    loading="lazy"
                    title="Lazy Lizard Smokehouse Location"
                  />
                  <a
                    href="https://maps.google.com/?q=Dennis+Pritt+Road+Kilimani+Nairobi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="directions-btn"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="footer-showcase">
          <div className="footer-inner">
            <div className="footer-top-row">
              <a href="#home">
                <img
                  src="/showcase_logo.png"
                  alt="Lazy Lizard Smokehouse"
                  className="footer-logo-showcase"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/lazylizardlogo.jpg';
                  }}
                />
              </a>

              <div className="footer-center-info">
                <div className="footer-house-tag">House of Briskets &amp; Beer</div>
                <div className="footer-loc">Kilimani, Nairobi</div>
              </div>

              <div className="footer-socials">
                <a href="https://facebook.com" className="footer-social-icon" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FaFacebookF size={16} />
                </a>
                <a href="https://twitter.com" className="footer-social-icon" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <FaTwitter size={16} />
                </a>
                <a href="https://tiktok.com" className="footer-social-icon" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                  <FaTiktok size={15} />
                </a>
                <a href="https://instagram.com" className="footer-social-icon" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <FaInstagram size={16} />
                </a>
              </div>
            </div>

            <div className="footer-bottom-row">
              <div className="footer-copyright">
                © 2026 Lazy Lizard Smokehouse. All rights reserved. &nbsp; Privacy Policy &nbsp;|&nbsp; Terms &amp; Conditions
              </div>
              <div className="footer-powered">
                Powered by WebWorks- D-Huhu Tech Labs
              </div>
            </div>
          </div>
        </footer>

        {/* ── BOOK A TABLE MODAL ── */}
        {isModalOpen && (
          <div className="modal-overlay" onClick={resetBookingModal}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <button
                className="modal-close-btn"
                onClick={resetBookingModal}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className="modal-header">
                <span className="modal-badge">Reservations · Kilimani, Nairobi</span>
                <h3 className="modal-title">Book a Table</h3>
                <p className="modal-subtitle">
                  Reserve your table in our garden setting. Authentic wood smoke awaits!
                </p>
              </div>

              {bookingSubmitted ? (
                <div className="booking-success-box">
                  <div className="booking-success-icon">
                    <Check size={34} strokeWidth={2.5} />
                  </div>
                  <h4 className="booking-success-title">Reservation Received!</h4>
                  <p className="booking-success-desc">
                    Thank you, <strong>{bookingData.name || 'Guest'}</strong>! We've received your table request. Our team will send a confirmation shortly.
                  </p>

                  <div className="booking-summary-card">
                    <div className="summary-row">
                      <span>Date &amp; Time:</span>
                      <strong>{bookingData.date} at {bookingData.time}</strong>
                    </div>
                    <div className="summary-row">
                      <span>Party Size:</span>
                      <strong>{bookingData.guests} Guest(s)</strong>
                    </div>
                    <div className="summary-row">
                      <span>Seating:</span>
                      <strong>{bookingData.seating}</strong>
                    </div>
                    <div className="summary-row">
                      <span>Phone:</span>
                      <strong>{bookingData.phone}</strong>
                    </div>
                  </div>

                  <div className="modal-actions">
                    <button
                      type="button"
                      className="btn-whatsapp"
                      onClick={handleWhatsAppBooking}
                    >
                      <MessageSquare size={18} /> Send Booking to WhatsApp (+254 113 346678)
                    </button>
                    <button
                      type="button"
                      className="btn-secondary"
                      style={{ width: '100%', color: '#111', borderColor: 'rgba(0,0,0,0.2)' }}
                      onClick={resetBookingModal}
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <form className="modal-form" onSubmit={handleBookingSubmit}>
                  {/* Guest Contact Details */}
                  <div className="modal-form-row">
                    <div className="modal-field">
                      <label className="modal-label">Full Name *</label>
                      <input
                        type="text"
                        className="modal-input"
                        required
                        placeholder="e.g. David Mwangi"
                        value={bookingData.name}
                        onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                      />
                    </div>
                    <div className="modal-field">
                      <label className="modal-label">Phone Number *</label>
                      <input
                        type="tel"
                        className="modal-input"
                        required
                        placeholder="+254 7..."
                        value={bookingData.phone}
                        onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="modal-form-row">
                    <div className="modal-field">
                      <label className="modal-label">Date *</label>
                      <input
                        type="date"
                        className="modal-input"
                        required
                        min={todayStr}
                        value={bookingData.date}
                        onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                      />
                    </div>
                    <div className="modal-field">
                      <label className="modal-label">Time Slot *</label>
                      <select
                        className="modal-select"
                        required
                        value={bookingData.time}
                        onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                      >
                        <optgroup label="Lunch Service">
                          <option value="12:00 PM">12:00 PM</option>
                          <option value="1:00 PM">1:00 PM</option>
                          <option value="2:00 PM">2:00 PM</option>
                          <option value="3:00 PM">3:00 PM</option>
                        </optgroup>
                        <optgroup label="Dinner Service">
                          <option value="5:00 PM">5:00 PM</option>
                          <option value="6:00 PM">6:00 PM</option>
                          <option value="7:00 PM">7:00 PM</option>
                          <option value="8:00 PM">8:00 PM</option>
                          <option value="9:00 PM">9:00 PM</option>
                        </optgroup>
                      </select>
                    </div>
                  </div>

                  {/* Guests & Seating */}
                  <div className="modal-field">
                    <label className="modal-label">Party Size *</label>
                    <select
                      className="modal-select"
                      value={bookingData.guests}
                      onChange={(e) => setBookingData({ ...bookingData, guests: e.target.value })}
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 Guests (Couple Table)</option>
                      <option value="3-4">3 - 4 Guests (Small Group)</option>
                      <option value="5-8">5 - 8 Guests (Family Table)</option>
                      <option value="9-15">9 - 15 Guests (Garden Gazebo)</option>
                      <option value="16+">16+ Guests (Private Catering Feast)</option>
                    </select>
                  </div>

                  {/* Seating Preference Chips */}
                  <div className="modal-field">
                    <label className="modal-label">Seating Preference</label>
                    <div className="seating-options">
                      {[
                        { id: 'Garden Patio', label: '🌿 Garden Patio' },
                        { id: 'Garden Gazebo', label: '🏮 Garden Gazebo' },
                        { id: 'Bar / High Table', label: '🍹 Bar / High Table' },
                        { id: 'Indoor Dining', label: '🛋️ Indoor Dining' }
                      ].map((area) => (
                        <div
                          key={area.id}
                          className={`seating-chip${bookingData.seating === area.id ? ' active' : ''}`}
                          onClick={() => setBookingData({ ...bookingData, seating: area.id })}
                        >
                          {area.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="modal-field">
                    <label className="modal-label">Special Requests / Dietary Notes (Optional)</label>
                    <textarea
                      className="modal-textarea"
                      rows="2"
                      placeholder="Birthday celebration, high chair needed, dietary restrictions..."
                      value={bookingData.notes}
                      onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                    />
                  </div>

                  {/* Actions */}
                  <div className="modal-actions">
                    <button type="submit" className="modal-submit-btn">
                      Confirm Table Booking
                    </button>
                    <button
                      type="button"
                      className="btn-whatsapp"
                      onClick={handleWhatsAppBooking}
                    >
                      <MessageSquare size={18} /> Or Book Instantly via WhatsApp
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </>
  );
}

export default App;
