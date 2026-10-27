/**
 * StaggeredMenu — Custom implementation matching react-bits StaggeredMenu API
 * Hamburger to open · X to close · staggered link animation
 */
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import './StaggeredMenu.css';

function StaggeredMenu({
  position = 'right',
  items = [],
  socialItems = [],
  displaySocials = false,
  displayItemNumbering = false,
  menuButtonColor = '#1A1008',
  openMenuButtonColor = '#ffffff',
  changeMenuColorOnOpen = true,
  colors = ['#8B1A1A', '#C4952A'],
  logoUrl = null,
  accentColor = '#8B1A1A',
  onMenuOpen,
  onMenuClose,
}) {
  const [open, setOpen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const drawerRef = useRef(null);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      onMenuOpen && onMenuOpen();
    } else {
      document.body.style.overflow = '';
      onMenuClose && onMenuClose();
    }
    return () => { document.body.style.overflow = ''; };
  }, [open, onMenuOpen, onMenuClose]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  // Close on resize to desktop
  useEffect(() => {
    const handler = () => { if (window.innerWidth > 768) handleClose(); };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  });

  const handleOpen = () => {
    setAnimating(true);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setAnimating(false), 420);
  };

  const btnColor = open && changeMenuColorOnOpen ? openMenuButtonColor : menuButtonColor;

  // Gradient from colors prop
  const gradientStyle = {
    background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`,
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        className="sm-trigger"
        onClick={open ? handleClose : handleOpen}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        style={{ color: btnColor, borderColor: btnColor }}
      >
        {open ? <X size={22} strokeWidth={2.5} /> : <Menu size={22} strokeWidth={2.5} />}
      </button>

      {/* Backdrop */}
      {(open || animating) && (
        <div
          className={`sm-backdrop${open ? ' sm-backdrop--visible' : ''}`}
          onClick={handleClose}
        />
      )}

      {/* Drawer */}
      <nav
        ref={drawerRef}
        className={`sm-drawer sm-drawer--${position}${open ? ' sm-drawer--open' : ''}`}
        aria-hidden={!open}
        style={gradientStyle}
      >
        {/* Logo */}
        {logoUrl && (
          <div className="sm-logo">
            <img src={logoUrl} alt="Logo" />
          </div>
        )}

        {/* Nav Items */}
        <ul className="sm-items" role="menu">
          {items.map((item, i) => (
            <li
              key={i}
              className={`sm-item${open ? ' sm-item--visible' : ''}`}
              style={{ transitionDelay: open ? `${0.06 + i * 0.07}s` : '0s' }}
              role="none"
            >
              <a
                href={item.link}
                className="sm-link"
                aria-label={item.ariaLabel || item.label}
                role="menuitem"
                onClick={handleClose}
                style={{ '--accent': accentColor }}
              >
                {displayItemNumbering && (
                  <span className="sm-num">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                )}
                <span className="sm-label">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Socials */}
        {displaySocials && socialItems.length > 0 && (
          <div className={`sm-socials${open ? ' sm-socials--visible' : ''}`}>
            <div className="sm-socials-divider" />
            <div className="sm-socials-row">
              {socialItems.map((s, i) => (
                <a
                  key={i}
                  href={s.link}
                  className="sm-social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ transitionDelay: open ? `${0.25 + i * 0.06}s` : '0s' }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Close button inside drawer */}
        <button
          className="sm-close"
          onClick={handleClose}
          aria-label="Close menu"
          style={{ color: openMenuButtonColor }}
        >
          <X size={24} strokeWidth={2.5} />
        </button>
      </nav>
    </>
  );
}

export default StaggeredMenu;
