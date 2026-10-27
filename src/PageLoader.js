/**
 * PageLoader — Full-screen branded loading screen
 * Fades out once page assets are loaded
 */
import React, { useEffect, useState } from 'react';
import './PageLoader.css';

function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const dismiss = () => {
      // Small minimum display so it's always seen (feels intentional)
      setTimeout(() => {
        setFading(true);
        setTimeout(() => setVisible(false), 600);
      }, 900);
    };

    if (document.readyState === 'complete') {
      dismiss();
    } else {
      window.addEventListener('load', dismiss, { once: true });
      // Fallback in case 'load' never fires
      const timeout = setTimeout(dismiss, 3500);
      return () => {
        window.removeEventListener('load', dismiss);
        clearTimeout(timeout);
      };
    }
  }, []);

  if (!visible) return null;

  return (
    <div className={`page-loader${fading ? ' page-loader--fading' : ''}`} aria-hidden="true">
      <div className="pl-content">
        {/* Animated smoke rings */}
        <div className="pl-rings">
          <span className="pl-ring pl-ring--1" />
          <span className="pl-ring pl-ring--2" />
          <span className="pl-ring pl-ring--3" />
        </div>

        {/* Brand name */}
        <div className="pl-brand">
          <span className="pl-brand-name">LAZY LIZARD</span>
          <span className="pl-brand-sub">SMOKEHOUSE</span>
        </div>

        {/* Loading bar */}
        <div className="pl-bar">
          <div className="pl-bar-fill" />
        </div>

        <p className="pl-tagline">Stoking the pit…</p>
      </div>
    </div>
  );
}

export default PageLoader;
