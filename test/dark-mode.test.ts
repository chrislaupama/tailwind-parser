import { parseClassString } from '../src/tailwind-parser';

describe('Dark Mode & Media Query Modifiers', () => {
  // Dark mode modifier
  test('parses dark mode modifier correctly', () => {
    const result = parseClassString('dark:bg-gray-900');
    expect(result.variants).toHaveLength(1);
    expect(result.variants[0]).toMatchObject({
      style: { 'background-color': expect.any(String) },
      mediaQuery: { 'dark': true }
    });
  });

  // Print mode modifier
  test('parses print mode modifier correctly', () => {
    const result = parseClassString('print:hidden');
    expect(result.variants).toHaveLength(1);
    expect(result.variants[0]).toMatchObject({
      style: { 'display': 'none' },
      mediaQuery: { 'print': true }
    });
  });

  // Portrait mode modifier
  test('parses portrait mode modifier correctly', () => {
    const result = parseClassString('portrait:block');
    expect(result.variants).toHaveLength(1);
    expect(result.variants[0]).toMatchObject({
      style: { 'display': 'block' },
      mediaQuery: { 'portrait': true }
    });
  });

  // Landscape mode modifier
  test('parses landscape mode modifier correctly', () => {
    const result = parseClassString('landscape:inline');
    expect(result.variants).toHaveLength(1);
    expect(result.variants[0]).toMatchObject({
      style: { 'display': 'inline' },
      mediaQuery: { 'landscape': true }
    });
  });

  // Multiple media query modifiers
  test('parses multiple media query modifiers correctly', () => {
    const result = parseClassString('dark:print:text-white');
    expect(result.variants).toHaveLength(1);
    expect(result.variants[0]).toMatchObject({
      style: { 'color': expect.any(String) },
      mediaQuery: { 
        'dark': true,
        'print': true 
      }
    });
  });

  // Dark mode with breakpoint
  test('parses dark mode with breakpoint correctly', () => {
    const result = parseClassString('md:dark:text-white');
    expect(result.variants).toHaveLength(1);
    expect(result.variants[0]).toMatchObject({
      style: { 'color': expect.any(String) },
      mediaQuery: { 
        'min-width': '768px',
        'dark': true
      }
    });
  });
});
