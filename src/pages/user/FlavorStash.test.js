import React from 'react';
import renderer from 'react-test-renderer';

import { FlavorStash } from './FlavorStash';

describe('<FlavorStash />', () => {
  const actions = {
    requestStash: jest.fn()
  };
  const props = {
    actions,
    stash: [
      { Flavor: { name: 'Sweet Cream', Vendor: { code: 'CAP' } } },
      { Flavor: { name: 'Tatanka', Vendor: { code: 'FLV' } } }
    ],
    stashLoaded: true
  };

  it('can render', () => {
    const tree = renderer.create(<FlavorStash {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
    expect(actions.requestStash).not.toHaveBeenCalled();
  });

  it('can render with an empty stash', () => {
    const tree = renderer
      .create(<FlavorStash {...props} stash={[]} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('calls requestStash on mount', () => {
    renderer.create(<FlavorStash {...props} stashLoaded={false} />);

    expect(actions.requestStash).toHaveBeenCalled();
  });
});
