import React, { useEffect } from 'react';
import './RainEffect.css';

const RainEffect = () => {
  useEffect(() => {
    const createRainDrop = () => {
      const rainDrop = document.createElement('div');
      rainDrop.className = 'rain-drop';
      rainDrop.style.left = `${Math.random() * 100}vw`;
      rainDrop.style.animationDuration = `${Math.random() * 2 + 3}s`;
      document.body.appendChild(rainDrop);

      setTimeout(() => {
        rainDrop.remove();
      }, 5000);
    };

    const interval = setInterval(createRainDrop, 100);

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default RainEffect;
