import { useEffect } from 'react';

const useReveal = (direction = 'vertical') => {
  useEffect(() => {
    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('activation');
        } else {
          // Optional: Remove this line if you want elements to stay visible
          entry.target.classList.remove('activation');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, { 
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px' // Adjust this to trigger earlier/later
    });

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
