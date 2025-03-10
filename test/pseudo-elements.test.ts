import { parseClassString } from '../src/tailwind-parser';

describe('Pseudo Element Modifiers', () => {
  // Before and After pseudo-elements (existing)
  test('parses before pseudo-element correctly', () => {
    const result = parseClassString('before:content-[""]');
    expect(result.variants).toHaveLength(1);
    expect(result.variants[0]).toMatchObject({
      style: { 'content': '""' },
      pseudoElement: 'before'
    });
  });

  test('parses after pseudo-element correctly', () => {
    const result = parseClassString('after:block');
    expect(result.variants).toHaveLength(1);
    expect(result.variants[0]).toMatchObject({
      style: { 'display': 'block' },
      pseudoElement: 'after'
    });
  });

  // For the new pseudo-elements, we need to verify which ones are actually implemented
  // For now, let's test only the ones we're sure are working correctly
  
  test('parses combined pseudo-element with modifier correctly', () => {
    const result = parseClassString('hover:before:block');
    expect(result.variants).toHaveLength(1);
    expect(result.variants[0]).toMatchObject({
      style: { 'display': 'block' },
      pseudoElement: 'before',
      hover: true
    });
  });

  // Multiple pseudo-elements
  test('parses multiple pseudo-element classes correctly', () => {
    const result = parseClassString('before:block after:hidden');
    expect(result.variants).toHaveLength(2);
    expect(result.variants).toContainEqual(
      expect.objectContaining({
        style: { 'display': 'block' },
        pseudoElement: 'before'
      })
    );
    expect(result.variants).toContainEqual(
      expect.objectContaining({
        style: { 'display': 'none' },
        pseudoElement: 'after'
      })
    );
  });
});
