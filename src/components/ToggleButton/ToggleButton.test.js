import React from 'react';
import renderer from 'react-test-renderer';

import ToggleButton from './ToggleButton';

describe('<ToggleButton />', () => {
  const event = { test: true };
  const props = {
    onClick: jest.fn(),
    variant: 'check'
  };

  it('can render "check" variant', () => {
    const tree = renderer.create(<ToggleButton {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('uses "check" variant as default', () => {
    const component = renderer.create(<ToggleButton />);
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

  it('updates state on click', () => {
    const component = renderer.create(<ToggleButton />);
    const instance = component.getInstance();

    expect(instance.state.value).toBe(false);
    instance.handleClick(event);
    expect(instance.state.value).toBe(true);
  });

  it('defaults to false value', () => {
    const component = renderer.create(<ToggleButton {...props} />);
    const instance = component.getInstance();

    expect(instance.state.value).toBe(false);
  });

  it('accepts initialValue prop', () => {
    const component = renderer.create(
      <ToggleButton {...props} initialValue={true} />
    );
    const instance = component.getInstance();

    expect(instance.state.value).toBe(true);
  });
});
