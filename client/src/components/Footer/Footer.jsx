// Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {


  const bubbles = Array.from({ length: 128 }, () => ({
    size: `${2 + Math.random() * 4}rem`,
    distance: `${6 + Math.random() * 4}rem`,
    position: `${-5 + Math.random() * 110}%`,
    time: `${2 + Math.random() * 2}s`,
    delay: `${-1 * (2 + Math.random() * 2)}s`,
  }));


  return (
<div className="main">
      <div className="footer">
        <div className="bubbles">
          {bubbles.map((style, index) => (
            <div
              key={index}
              className="bubble"
              style={{
                '--size': style.size,
                '--distance': style.distance,
                '--position': style.position,
                '--time': style.time,
                '--delay': style.delay,
              }}
            ></div>
          ))}
        </div>
        <div className="content">
          <p>© 2024 Web-dizajn </p>
        </div>
      </div>
      
    </div>
  );
};

export default Footer;
