import { parseContentClass } from '../src/parseContentClass';

describe('parseContentClass', () => {
  // Basic content classes
  test('parses basic content classes correctly', () => {
    expect(parseContentClass('content-none')).toEqual({ 'content': 'none' });
    expect(parseContentClass('content-empty')).toEqual({ 'content': '""' });
  });

  // Content with string values
  test('parses content with string values correctly', () => {
    expect(parseContentClass('content-[\'Hello\']')).toEqual({ 'content': '"Hello"' });
    // Note: The content-[''] would be captured by content-empty
  });

  // Content with url and special values
  test('parses content with url and function values correctly', () => {
    expect(parseContentClass('content-[url(image.jpg)]')).toEqual({ 'content': 'url(image.jpg)' });
    expect(parseContentClass('content-[attr(title)]')).toEqual({ 'content': 'attr(title)' });
  });

  // Invalid class
  test('returns null for invalid classes', () => {
    expect(parseContentClass('content-wrong')).toBeNull();
    expect(parseContentClass('not-content')).toBeNull();
    expect(parseContentClass('content-normal')).toBeNull();
  });
});
