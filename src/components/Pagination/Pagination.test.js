import React from 'react';
import renderer from 'react-test-renderer';
import { pagination, seekLocations } from './Pagination';

// Prevent findDOMNode error in test from Dropdown component in react-bootstrap
jest.mock('react-dom', () => ({
  findDOMNode: () => ({})
}));

jest.mock('lodash.debounce', () => fn => fn);

describe('<Pagination />', () => {
  const actions = {
    action: jest.fn()
  };
  const page = {
    target: {
      value: 1
    }
  };
  const limit = {
    target: {
      value: 40
    }
  };
  const collection = [
    {
      id: '1',
      vendorId: 3,
      name: '27 Bears',
      slug: null,
      density: null,
      Vendor: { id: 3, name: 'Capella', slug: 'capella', code: 'CAP' }
    },
    {
      id: '2',
      vendorId: 3,
      name: '27 Fish',
      slug: null,
      density: null,
      Vendor: { id: 3, name: 'Capella', slug: 'capella', code: 'CAP' }
    },
    {
      id: '3',
      vendorId: 3,
      name: 'Acai',
      slug: null,
      density: null,
      Vendor: { id: 3, name: 'Capella', slug: 'capella', code: 'CAP' }
    },
    {
      id: '4',
      vendorId: 3,
      name: 'Amaretto',
      slug: null,
      density: null,
      Vendor: { id: 3, name: 'Capella', slug: 'capella', code: 'CAP' }
    },
    {
      id: '5',
      vendorId: 3,
      name: 'Anise',
      slug: null,
      density: null,
      Vendor: { id: 3, name: 'Capella', slug: 'capella', code: 'CAP' }
    }
  ];
  const pager = { count: 861, limit: 5, page: 1, pages: 173 };
  const TestComponent = () => <p />;
  const Component = pagination(TestComponent);
  const props = {
    actions,
    pager,
    collection
  };

  const createComponent = () => {
    const component = renderer.create(<Component {...props} />);
    const { instance } = component.root.findByType(Component);

    return { component, instance };
  };

  it('renders correctly', () => {
    const { component, instance } = createComponent();

    expect(component.toJSON()).toMatchSnapshot();
    expect(instance.state).toEqual({
      limit: pager.limit,
      page: pager.page
    });
  });

  it('can changePage', () => {
    const { instance } = createComponent();

    instance.requestPage = jest.fn();

    instance.changePage(page);

    expect(instance.requestPage).toHaveBeenCalled();
    expect(instance.state.page).toEqual(page.target.value);
  });

  it('can changeLimit', () => {
    const { instance } = createComponent();

    instance.requestPage = jest.fn();

    instance.changeLimit(limit);

    expect(instance.requestPage).toHaveBeenCalled();
    expect(instance.state.limit).toEqual(limit.target.value);
  });

  it('can handleSeek', () => {
    const { instance } = createComponent();

    instance.requestPage = jest.fn();

    // jump to first page
    instance.handleSeek(seekLocations.FIRST);

    expect(instance.requestPage).toHaveBeenCalled();
    expect(instance.state.page).toBe(1);

    // jump to last page
    instance.handleSeek(seekLocations.LAST);

    expect(instance.state.page).toBe(pager.pages);

    // step back one page
    instance.handleSeek(seekLocations.PREV);

    expect(instance.state.page).toBe(pager.pages - 1);

    // step forward one page
    instance.handleSeek(seekLocations.NEXT);

    expect(instance.state.page).toBe(pager.pages);

    // ensure that we cannot go past the last page
    instance.handleSeek(seekLocations.NEXT);

    expect(instance.state.page).toBe(pager.pages);

    // ensure that we cannot go past the first page
    instance.handleSeek(seekLocations.FIRST);
    instance.handleSeek(seekLocations.PREV);

    expect(instance.state.page).toBe(1);
  });

  it('can requestPage', () => {
    const { instance } = createComponent();

    instance.requestPage();

    expect(actions.action).toHaveBeenCalledWith(pager);

    actions.action.mockReset();

    instance.changeLimit(limit);

    expect(actions.action).toHaveBeenCalledWith({
      ...pager,
      limit: limit.target.value
    });
  });
});
