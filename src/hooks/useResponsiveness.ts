import { useState, useEffect, useCallback } from 'react';

type ResponsivenessOptions = {
  breakpoint?: number;
};

const getWindowWidth = () => (typeof window !== 'undefined' ? window.innerWidth : 1024);
const getWindowHeight = () => (typeof window !== 'undefined' ? window.innerHeight : 768);

export function useResponsiveness(options: number | ResponsivenessOptions = 1024) {
  const mobileBreakpoint = typeof options === 'number' ? options : options.breakpoint ?? 1024;
  const [isMobile, setIsMobile] = useState(() => getWindowWidth() < mobileBreakpoint);
  const [width, setWidth] = useState(getWindowWidth);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(
    () => getWindowHeight() > getWindowWidth() ? 'portrait' : 'landscape'
  );

  const handleResize = useCallback(() => {
    const newWidth = window.innerWidth;
    setWidth(newWidth);
    setIsMobile(newWidth < mobileBreakpoint);

    const newOrientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
    setOrientation(newOrientation);
  }, [mobileBreakpoint]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [handleResize]);

  return { isMobile, width, orientation };
}
