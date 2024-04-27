// USES
// 1. Disable Logo Carousel in Product Section Landing Page
export function prefersReducedMotion() {
  // Check if the user has a preference for reduced motion
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Set up a media query for a window width greater than 1024 pixels
// USES
export function mq1024() {
  return window.matchMedia("(max-width: 1024px)");
}

// 1. Switch Menu Desktop / Mobile
export function mq768() {
  return window.matchMedia("(max-width: 767px)");
}
