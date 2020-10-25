import { render, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';

import ToggleButton from './ToggleButton';

describe('<ToggleButton />', () => {
  const props = {
    onClick: jest.fn(),
    variant: 'check',
    title: 'Toggle me real good!'
  };

  it('can render "check" variant', () => {
    const { asFragment } = render(<ToggleButton {...props} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('uses "check" variant as default', () => {
    const { getByTestId } = render(<ToggleButton {...props} />);

    expect(getByTestId('toggle-button')).toBeInTheDocument();
  });

  it('calls onClick on click', async () => {
    const { getByRole } = render(<ToggleButton {...props} />);
    const button = getByRole('button');

    expect(button).toBeInTheDocument();
    expect(props.onClick).not.toHaveBeenCalled();
    fireEvent.click(button);

    await waitFor(() => {
      expect(props.onClick).toHaveBeenCalled();
    });
  });

  it('can render with icon-only prop', () => {
    const newProps = {
      ...props,
      iconOnly: true
    };
    const { asFragment } = render(<ToggleButton {...newProps} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('can render "switch" variant', () => {
    const newProps = {
      ...props,
      variant: 'switch'
    };
    const { asFragment } = render(<ToggleButton {...newProps} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('can render "grid-list" variant', () => {
    const newProps = {
      ...props,
      variant: 'grid-list'
    };
    const { asFragment } = render(<ToggleButton {...newProps} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
