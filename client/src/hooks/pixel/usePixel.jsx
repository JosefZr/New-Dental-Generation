// src/hooks/usePixel.js
import { useEffect } from 'react';

const usePixel = (pixelId = '1167739504817121') => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Load script
    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    
    document.head.appendChild(script);

    // Initialize
    window.fbq = window.fbq || function() {
      (window.fbq.queue = window.fbq.queue || []).push(arguments);
    };
    
    window.fbq('init', pixelId, { 
      debug: true 
    });
    window.fbq('track', 'PageView');

    return () => {
      document.head.removeChild(script);
    };
  }, [pixelId]);
};

export default usePixel;