import { parseContainerClass } from '../src/parseContainerClass';

describe('parseContainerClass', () => {
  // Basic container class
  test('parses container class correctly', () => {
    expect(parseContainerClass('container')).toEqual({
      'width': '100%',
      '@media (min-width: 640px)': { 'max-width': '640px' },
      '@media (min-width: 768px)': { 'max-width': '768px' },
      '@media (min-width: 1024px)': { 'max-width': '1024px' },
      '@media (min-width: 1280px)': { 'max-width': '1280px' },
      '@media (min-width: 1536px)': { 'max-width': '1536px' },
    });
  });

  // Container type modifiers
  test('parses container type modifiers correctly', () => {
    expect(parseContainerClass('container-normal')).toEqual({
      'container-type': 'normal'
    });
    
    expect(parseContainerClass('container-size')).toEqual({
      'container-type': 'size'
    });
    
    expect(parseContainerClass('container-inline-size')).toEqual({
      'container-type': 'inline-size'
    });
  });

  // Container name modifier
  test('parses container name modifiers correctly', () => {
    expect(parseContainerClass('container-name-sidebar')).toEqual({
      'container-name': 'sidebar'
    });
    
    expect(parseContainerClass('container-name-main')).toEqual({
      'container-name': 'main'
    });
  });

  // Invalid class
  test('returns null for invalid classes', () => {
    expect(parseContainerClass('cont')).toBeNull();
    expect(parseContainerClass('not-container')).toBeNull();
    expect(parseContainerClass('container-center')).toBeNull();
    expect(parseContainerClass('container-px-4')).toBeNull();
  });
});
