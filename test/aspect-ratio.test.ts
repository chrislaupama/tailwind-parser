import { parseAspectRatioClass } from '../src/parseAspectRatioClass';

describe('parseAspectRatioClass', () => {
  // Standard aspect ratio values
  test('parses aspect-auto correctly', () => {
    expect(parseAspectRatioClass('aspect-auto')).toEqual({ 'aspect-ratio': 'auto' });
  });

  test('parses aspect-square correctly', () => {
    expect(parseAspectRatioClass('aspect-square')).toEqual({ 'aspect-ratio': '1 / 1' });
  });

  test('parses aspect-video correctly', () => {
    expect(parseAspectRatioClass('aspect-video')).toEqual({ 'aspect-ratio': '16 / 9' });
  });

  // Custom aspect ratio values (arbitrary values)
  test('parses aspect ratio with arbitrary values correctly', () => {
    expect(parseAspectRatioClass('aspect-[4/3]')).toEqual({ 'aspect-ratio': '4/3' });
    expect(parseAspectRatioClass('aspect-[16/10]')).toEqual({ 'aspect-ratio': '16/10' });
    expect(parseAspectRatioClass('aspect-[2.35/1]')).toEqual({ 'aspect-ratio': '2.35/1' });
  });

  // Invalid class
  test('returns null for invalid classes', () => {
    expect(parseAspectRatioClass('aspect-wrong')).toBeNull();
    expect(parseAspectRatioClass('not-aspect')).toBeNull();
  });
});
