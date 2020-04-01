import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import {
  mockComponent,
  mockComponentWithProps,
  withProvider,
  withMemoryRouter
} from 'utils/testing';

describe('testing utilities', () => {
  const TestComponent = mockComponent('Test');

  describe('mockComponent', () => {
    it('exists', () => {
      expect(mockComponent).toBeInstanceOf(Function);
    });

    it('can create a simple React component', () => {
      const type = 'test';
      const result = mockComponent(type);

      expect(result).toBeDefined();
      const component = result();

      expect(component).toBeDefined();
      expect(component.type).toBe(type);
    });

    it('can create a React component with props', () => {
      const type = 'test';
      const props = {
        test: 'value'
      };
      const result = mockComponent(type, props);

      expect(result).toBeDefined();
      const component = result();

      expect(component).toBeDefined();
      expect(component.type).toBe(type);
      expect(component.props).toEqual(expect.objectContaining(props));
    });
  });

  describe('mockComponentWithProps', () => {
    it('can create a React component with props', () => {
      const type = 'test';
      const props = {
        test: 'value'
      };
      const MockComponent = mockComponentWithProps(type)(props);
      const component = renderer.create(MockComponent);
      const instance = component.root;

      expect(instance).toBeDefined();
      expect(instance.type).toEqual(type);
      expect(instance.props).toEqual(expect.objectContaining(props));
    });
  });

  describe('withMemoryRouter', () => {
    it('exists', () => {
      expect(withMemoryRouter).toBeInstanceOf(Function);
    });

    it('can wrap a component', () => {
      const RoutedComponent = withMemoryRouter(TestComponent);
      const component = renderer.create(<RoutedComponent />);

      expect(component.root.findByType(MemoryRouter)).toBeDefined();
      expect(component.root.findByType(TestComponent)).toBeDefined();
    });
  });

  describe('withProvider', () => {
    it('exists', () => {
      expect(withProvider).toBeInstanceOf(Function);
    });

    it('can wrap a component', () => {
      const state = {};
      const mockStore = configureStore();
      const store = mockStore(state);
      const ConnectedComponent = withProvider(TestComponent, store);
      const component = renderer.create(<ConnectedComponent />);

      expect(component.root.findByType(Provider)).toBeDefined();
      expect(component.root.findByType(TestComponent)).toBeDefined();
    });
  });
});
