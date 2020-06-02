import dayjs from 'dayjs';
import { buildActions, buildUrl, getInitialState } from './index';
import { initialState } from 'reducers';

describe('utilities', () => {
  it('can buildActions', () => {
    const module = 'test';
    const actions = ['first', 'second', 'third'];
    const result = {
      first: 'test/first',
      second: 'test/second',
      third: 'test/third'
    };

    expect(buildActions(module, actions)).toEqual(result);
  });

  describe('buildUrl', () => {
    it('exists', () => {
      expect(buildUrl).toBeInstanceOf(Function);
    });

    it('returns a URL with no parameters', () => {
      const url = '/test';
      const result = buildUrl({ url });

      expect(result).toBe(`http://localhost:3000${url}`);
    });

    it('returns a URL with interpolated parameters', () => {
      const url = '/{aValue}/{somethingElse}';
      const params = {
        aValue: 'test',
        somethingElse: 'another'
      };
      const expectedUrl = 'http://localhost:3000/test/another';
      const result = buildUrl({ url, params });

      expect(result).toEqual(expectedUrl);
    });
  });

  describe('getInitialState', () => {
    it('exists', () => {
      expect(getInitialState).toBeInstanceOf(Function);
    });

    it('returns application state if data found', () => {
      const accessToken = 'testing';
      const expiration = '2030-01-01T00:00:00.000Z';

      localStorage.getItem.mockImplementation((key) => {
        if (key === 'accessToken') {
          return `"${accessToken}"`;
        } else if (key === 'expiration') {
          return `"${expiration}"`;
        } else {
          return null;
        }
      });

      expect(getInitialState()).toMatchObject({
        application: {
          authorization: {
            accessToken,
            expiration: dayjs(expiration)
          }
        }
      });
    });

    it('returns an empty object if no data found', () => {
      localStorage.getItem.mockReturnValue(null);

      expect(getInitialState()).toEqual(initialState);
    });

    it('returns an empty object if token is expired', () => {
      localStorage.getItem.mockImplementation((key) => {
        if (key === 'accessToken') {
          return '"testing"';
        } else if (key === 'expiration') {
          return '"2010-01-01T00:00:00.000Z"';
        } else {
          return null;
        }
      });

      expect(getInitialState()).toEqual(initialState);
    });

    it('returns an empty object if an error occurs', () => {
      localStorage.getItem.mockReturnValue('baddate');

      expect(getInitialState()).toEqual(initialState);
    });
  });
});
