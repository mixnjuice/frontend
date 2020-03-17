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

  it('can render with icon-only prop', () => {
    const newProps = {};

    Object.assign(newProps, {
      ...props,
      iconOnly: true
    });
    const tree = renderer.create(<ToggleButton {...newProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('can render "switch" variant', () => {
    props.variant = 'switch';
    const tree = renderer.create(<ToggleButton {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('can render "grid-list" variant', () => {
    props.variant = 'grid-list';
    const tree = renderer.create(<ToggleButton {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
