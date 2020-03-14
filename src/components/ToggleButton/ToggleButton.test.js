import React from 'react';
import renderer from 'react-test-renderer';

import ToggleButton from './ToggleButton';

describe('<ToggleButton />', () => {
  const event = { test: true };
  const props = {
    onClick: jest.fn(),
    variant: 'check',
    title: 'Toggle me real good!'
  };

  it('can render "check" variant', () => {
    const tree = renderer.create(<ToggleButton {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('uses "check" variant as default', () => {
    const component = renderer.create(<ToggleButton {...props} />);
    const instance = component.getInstance();

    expect(instance.props.variant).toEqual('check');
  });

  it('calls onClick on click', () => {
    const component = renderer.create(<ToggleButton {...props} />);
    const instance = component.getInstance();

    expect(props.onClick).not.toHaveBeenCalled();
    instance.handleClick(event);
    expect(props.onClick).toHaveBeenCalledWith(event);
  });
});
