import React from 'react';
import renderer from 'react-test-renderer';
import { theme } from './Theme';

describe('Theme HOC', () => {
  const TestComponent = () => <p />;
  const Component = theme(TestComponent);
  const props = {
    theme: 'default'
  };

  const createComponent = () => {
    const component = renderer.create(<Component {...props} />);
    const { instance } = component.root.findByType(Component);

    return { component, instance };
  };

  it('renders correctly', () => {
    const { component, instance } = createComponent();

    expect(component.toJSON()).toMatchSnapshot();
    expect(instance.state).toBeNull();
  });
});
