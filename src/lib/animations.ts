
import { useEffect, useState } from 'react';

// Custom hook for staggered animations
export const useStaggeredAnimation = (items: any[], delay = 100) => {
  const [staggeredItems, setStaggeredItems] = useState<any[]>([]);

  useEffect(() => {
    if (!items.length) return;

    setStaggeredItems([]);
    
    const timeouts: NodeJS.Timeout[] = [];
    
    items.forEach((item, index) => {
      const timeout = setTimeout(() => {
        setStaggeredItems(prev => [...prev, item]);
      }, index * delay);
      
      timeouts.push(timeout);
    });
    
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [items, delay]);

  return staggeredItems;
};

// Custom hook for intersection observer animations
export const useIntersectionObserver = (
  options = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(ref);
      }
    }, options);

    observer.observe(ref);

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [ref, options]);

  return [setRef, isVisible] as const;
};

// Utility for page transitions
export const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }
};
