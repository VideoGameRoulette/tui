import type { AdSlide, AdTextElement } from './types';

const uid = () => Math.random().toString(36).slice(2, 10);

export const createDefaultSlide = (): AdSlide => ({
  id: uid(),
  backgroundImage: null,
  backgroundImageName: null,
  objectFit: 'cover',
  offsetX: 50,
  offsetY: 50,
  backgroundColor: '#0f172a',
  overlayColor: '#000000',
  overlayOpacity: 0,
  durationMs: 8000,
  transition: 'fade',
  transitionDuration: 600,
  textElements: [],
});

export const createDefaultTextElement = (): AdTextElement => ({
  id: uid(),
  text: 'Your Text Here',
  x: 50,
  y: 50,
  fontSize: 96,
  fontWeight: '700',
  fontFamily: 'system-ui, sans-serif',
  color: '#ffffff',
  opacity: 1,
  textAlign: 'center',
  letterSpacing: 0,
  lineHeight: 1.2,
  textShadow: false,
  animation: 'fadeIn',
  animationDuration: 800,
  animationDelay: 0,
  easing: 'ease-out',
});
