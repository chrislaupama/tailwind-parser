import { parseTouchClass } from '../src/parseTouchClass';

describe('parseTouchClass', () => {
  // Basic touch action classes
  test('parses basic touch action classes correctly', () => {
    expect(parseTouchClass('touch-auto')).toEqual({ 'touch-action': 'auto' });
    expect(parseTouchClass('touch-none')).toEqual({ 'touch-action': 'none' });
    expect(parseTouchClass('touch-manipulation')).toEqual({ 'touch-action': 'manipulation' });
  });

  // Directional touch action classes
  test('parses directional touch action classes correctly', () => {
    expect(parseTouchClass('touch-pan-x')).toEqual({ 'touch-action': 'pan-x' });
    expect(parseTouchClass('touch-pan-left')).toEqual({ 'touch-action': 'pan-left' });
    expect(parseTouchClass('touch-pan-right')).toEqual({ 'touch-action': 'pan-right' });
    expect(parseTouchClass('touch-pan-y')).toEqual({ 'touch-action': 'pan-y' });
    expect(parseTouchClass('touch-pan-up')).toEqual({ 'touch-action': 'pan-up' });
    expect(parseTouchClass('touch-pan-down')).toEqual({ 'touch-action': 'pan-down' });
  });

  // Pinch zoom touch action classes
  test('parses pinch-zoom touch action classes correctly', () => {
    expect(parseTouchClass('touch-pinch-zoom')).toEqual({ 'touch-action': 'pinch-zoom' });
  });

  // Invalid class
  test('returns null for invalid classes', () => {
    expect(parseTouchClass('touch-wrong')).toBeNull();
    expect(parseTouchClass('not-touch')).toBeNull();
  });
});
