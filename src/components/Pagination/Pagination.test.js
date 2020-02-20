import React from 'react';
import renderer from 'react-test-renderer';
// import withPagination, { pagination, mapStateToProps, mapDispatchToProps } from './Pagination';
import { pagination } from './Pagination';
// Prevent findDOMNode error in test from Dropdown component in react-bootstrap
jest.mock('react-dom', () => ({
  findDOMNode: () => ({})
}));

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
  // const ConnectedComponent = withPagination(TestComponent);
  const props = {
    actions,
    pager,
    collection
  };

  const component = renderer.create(<Component {...props} />);
  const { instance } = component.root.findByType(Component);

  instance.setState = jest.fn();

  it('renders correctly', () => {
    expect(
      renderer.create(<Component {...props} />).toJSON()
    ).toMatchSnapshot();
    expect(instance).toBeDefined();
  });

  it('can changePage', () => {
    instance.changePage(page);
    expect(actions.action).toHaveBeenCalledWith({ ...pager, page: 1 });
  });

  it('can changeLimit', () => {
    instance.changeLimit(limit);
    expect(instance.setState).toHaveBeenCalledWith({ limit: 40 });
  });

  it('can updateLimit', () => {
    instance.updateLimit();
    expect(actions.action).toHaveBeenCalledWith({ page: 1, limit: 20 });
  });
});
