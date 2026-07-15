import React, { useEffect } from 'react';
import './StarsEffect.css';

const StarsEffect = () => {
  useEffect(() => {
    const createStar = () => {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.animationDuration = `${Math.random() * 2 + 3}s`;
      document.body.appendChild(star);

      setTimeout(() => {
        star.remove();
      }, 5000);
    };

    const interval = setInterval(createStar, 100);

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default StarsEffect;
