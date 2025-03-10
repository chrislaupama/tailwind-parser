import { parseClassString } from '../src/tailwind-parser';

describe('Group and Peer Modifiers', () => {
  // Group modifier
  test('parses group modifier correctly', () => {
    const result = parseClassString('group');
    expect(result.style).toMatchObject({});
    expect(result.variants).toHaveLength(1);
    expect(result.variants[0]).toMatchObject({
      style: {},
      group: true
    });
  });

  // Peer modifier
  test('parses peer modifier correctly', () => {
    const result = parseClassString('peer');
    expect(result.style).toMatchObject({});
    expect(result.variants).toHaveLength(1);
    expect(result.variants[0]).toMatchObject({
      style: {},
      peer: true
    });
  });

  // Group-hover interaction
  test('parses group-hover interaction correctly', () => {
    const result = parseClassString('group-hover:block');
    expect(result.variants).toHaveLength(1);
    expect(result.variants[0]).toMatchObject({
      style: { 'display': 'block' },
      group: true,
      hover: true
    });
  });

  // Peer-focus interaction
  test('parses peer-focus interaction correctly', () => {
    const result = parseClassString('peer-focus:underline');
    expect(result.variants).toHaveLength(1);
    expect(result.variants[0]).toMatchObject({
      style: { 'text-decoration': 'underline' },
      peer: true,
      focus: true
    });
  });

  // Group-focus-within interaction
  test('parses group-focus-within interaction correctly', () => {
    const result = parseClassString('group-focus-within:visible');
    expect(result.variants).toHaveLength(1);
    expect(result.variants[0]).toMatchObject({
      style: { 'visibility': 'visible' },
      group: true,
      focusWithin: true
    });
  });

  // Peer-checked interaction
  test('parses peer-checked interaction correctly', () => {
    const result = parseClassString('peer-checked:bg-blue-500');
    expect(result.variants).toHaveLength(1);
    expect(result.variants[0]).toMatchObject({
      style: { 'background-color': expect.any(String) },
      peer: true,
      checked: true
    });
  });

  // Group with multiple states
  test('parses group with multiple states correctly', () => {
    const result = parseClassString('group-hover:group-focus:text-red-500');
    expect(result.variants).toHaveLength(1);
    expect(result.variants[0]).toMatchObject({
      style: { 'color': expect.any(String) },
      group: true,
      hover: true,
      focus: true
    });
  });

  // Complex group and peer states with breakpoints
  test('parses complex group states with breakpoints correctly', () => {
    const result = parseClassString('sm:group-hover:md:peer-focus:font-bold');
    expect(result.variants).toHaveLength(1);
    expect(result.variants[0]).toMatchObject({
      style: { 'font-weight': '700' }, 
      group: true,
      peer: true,
      hover: true,
      focus: true,
      mediaQuery: expect.objectContaining({
        'min-width': expect.any(String)
      })
    });
  });
});
