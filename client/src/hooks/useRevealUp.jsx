import { useEffect } from 'react';

const useReveal = (direction = 'vertical') => {
  useEffect(() => {
    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('activation');
        } else {
          entry.target.classList.remove('activation');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, { threshold: 0.1 });

    const reveals = document.querySelectorAll(`.reveal-${direction}`);

    reveals.forEach((reveal) => observer.observe(reveal));

    return () => {
      reveals.forEach((reveal) => observer.unobserve(reveal));
    };
  }, [direction]);
};

export default useReveal;
