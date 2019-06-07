import { required, email, length } from './validation';

describe('validators', () => {
  describe('required', () => {
    it('returns undefined for valid values', () => {
      expect(required(true)).toBeUndefined();
      expect(required('dummy')).toBeUndefined();
    });

    it('returns a string for invalid values', () => {
      expect(required(null)).toBe('required');
      expect(required('')).toBe('required');
      expect(required(false)).toBe('required');
    });
  });

  describe('email', () => {
    it('returns undefined for valid values', () => {
      expect(email('someone@test.org')).toBeUndefined();
      expect(email('another+fancy@gmail.cc')).toBeUndefined();
    });

    it('returns a string for invalid values', () => {
      expect(email(null)).toBe('email');
      expect(email('bogus')).toBe('email');
      expect(email('jsf89weah328t99t8ht2@jsafkjifoaj')).toBe('email');
    });
  });

  describe('length', () => {
    it('returns undefined for valid values', () => {
      expect(length(1)('value')).toBeUndefined();
      expect(length(0, 8)('short')).toBeUndefined();
    });

    it('returns a string for invalid values', () => {
      expect(length(1)('')).toBe('min-length');
      expect(length(8)('bogus')).toBe('min-length');
      expect(length(1, 8)('longstringhamham')).toBe('max-length');
    });
  });
});
