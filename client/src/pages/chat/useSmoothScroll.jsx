// useSmoothScroll.js
import { useCallback,useRef } from 'react';

export default function useSmoothScroll(ref) {
  const scrollToBottom = useCallback(() => {
    if (ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [ref]);

  return { scrollToBottom };
}

export function useThrottle(callback, delay) {
  const lastCall = useRef(0);

  return useCallback((...args) => {
    const now = new Date().getTime();
    if (now - lastCall.current >= delay) {
      lastCall.current = now;
      callback(...args);
    }
  }, [callback, delay]);
}
