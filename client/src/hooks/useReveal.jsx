import { useEffect } from 'react';

const useReveal = (direction = 'vertical') => {
  useEffect(() => {
    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && isScrolledFarEnough()) {
          entry.target.classList.add('activation');
        } else {
          entry.target.classList.remove('activation');
        }
      });
    };

    const isScrolledFarEnough = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.body.scrollHeight;
      const threshold = 2800; // Distance from bottom to start the animations

      return scrollPosition + threshold < documentHeight;
    };

    const observer = new IntersectionObserver(handleIntersect, { threshold: 0.1 });

    const reveals = document.querySelectorAll(
      `.reveal-${direction}, .reveal-horizontal-left, .reveal-horizontal-right, .reveal-up`
    );

    reveals.forEach((reveal) => observer.observe(reveal));

    return () => {
      reveals.forEach((reveal) => observer.unobserve(reveal));
    };
  }, [direction]);
};

export default useReveal;
