export type AnimationType =
  | 'none'
  | 'fadeIn'
  | 'slideInLeft'
  | 'slideInRight'
  | 'slideInUp'
  | 'slideInDown'
  | 'zoomIn'
  | 'zoomOut';

export type TransitionType =
  | 'none'
  | 'fade'
  | 'slideLeft'
  | 'slideRight'
  | 'slideUp'
  | 'slideDown'
  | 'zoom';

export type EasingType = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
export type ObjectFitType = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
export type FontWeight = '400' | '500' | '600' | '700' | '800' | '900';
export type TextAlign = 'left' | 'center' | 'right';

export interface AdTextElement {
  id: string;
  text: string;
  x: number;               // 0–100 % of canvas width, center-anchored
  y: number;               // 0–100 % of canvas height, center-anchored
  fontSize: number;        // px at 1920×1080 reference resolution
  fontWeight: FontWeight;
  fontFamily: string;
  color: string;
  opacity: number;         // 0–1
  textAlign: TextAlign;
  letterSpacing: number;   // em units (0 = normal)
  lineHeight: number;      // multiplier e.g. 1.2
  textShadow: boolean;
  animation: AnimationType;
  animationDuration: number; // ms
  animationDelay: number;    // ms
  easing: EasingType;
}

export interface AdSlide {
  id: string;
  backgroundImage: string | null;  // data URL
  backgroundImageName: string | null;
  objectFit: ObjectFitType;
  offsetX: number;          // 0–100 (object-position-x %)
  offsetY: number;          // 0–100 (object-position-y %)
  backgroundColor: string;
  overlayColor: string;
  overlayOpacity: number;   // 0–1
  durationMs: number;
  transition: TransitionType;
  transitionDuration: number; // ms
  textElements: AdTextElement[];
}
