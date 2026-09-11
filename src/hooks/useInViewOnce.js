import { useEffect, useRef, useState } from 'react';

export function useInViewOnce(threshold = 0.2) {
  const ref = useRef(null);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasBeenInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasBeenInView(true);
          observer.disconnect();   // fires once, then stops watching
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, hasBeenInView]);

  return [ref, hasBeenInView];
}