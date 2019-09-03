import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import ConnectedMain from './Main';
import { withMemoryRouter } from 'utils';

describe('Dashboard <Main />', () => {
  const mockStore = configureStore();

  const RoutedMain = withMemoryRouter(ConnectedMain);
  const role = {
    roleId: 3,
    name: 'test',
    userId: 20
  };
  const users = [
    {
      activationCode: null,
      created: '20190805T04:16:38.930Z',
      emailAddress: 'blah@blah.com',
      id: 1,
      password: 'secret'
    },
    {
      activationCode: null,
      created: '20190805T04:16:38.930Z',
      emailAddress: 'blah2@blah.com',
      id: 2,
      password: 'secret'
    }
  ];

  let dashboard = {};

  let store = null;

  it('renders Home correctly', () => {
    dashboard = {
      dashboardComponent: {
        name: 'Home',
        item: null
      },
      stats: {
        activatedUsers: 1991,
        flavorTags: 90,
        flavors: 8617,
        recipeTags: 55,
        recipes: 42,
        tags: 115,
        userTokens: 300,
        users: 2000,
        vendors: 98
      }
    };
    store = mockStore({ dashboard });

    expect(
      renderer
        .create(
          <Provider store={store}>
            <RoutedMain />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('renders Flavors correctly', () => {
    dashboard = {
      dashboardComponent: {
        name: 'Flavors'
      }
    };
    const flavors = {
      flavors: [
        {
          id: '1',
          vendorId: 3,
          name: '27 Bears',
          slug: null,
          density: null,
          Vendor: {
            id: 3,
            name: 'Capella',
            slug: 'capella',
            code: 'CAP'
          }
        },
        {
          id: '2',
          vendorId: 3,
          name: '27 Fish',
          slug: null,
          density: null,
          Vendor: {
            id: 3,
            name: 'Capella',
            slug: 'capella',
            code: 'CAP'
          }
        },
        {
          id: '3',
          vendorId: 3,
          name: 'Acai',
          slug: null,
          density: null,
          Vendor: {
            id: 3,
            name: 'Capella',
            slug: 'capella',
            code: 'CAP'
          }
        },
        {
          id: '4',
          vendorId: 3,
          name: 'Amaretto',
          slug: null,
          density: null,
          Vendor: {
            id: 3,
            name: 'Capella',
            slug: 'capella',
            code: 'CAP'
          }
        },
        {
          id: '5',
          vendorId: 3,
          name: 'Anise',
          slug: null,
          density: null,
          Vendor: 'Object'
        },
        {
          id: '6',
          vendorId: 3,
          name: 'Apple Pie',
          slug: null,
          density: null,
          Vendor: 'Object'
        },
        {
          id: '7',
          vendorId: 3,
          name: 'Apple Pie v2',
          slug: null,
          density: null,
          Vendor: 'Object'
        },
        {
          id: '8',
          vendorId: 3,
          name: 'Apple Snacks',
          slug: null,
          density: null,
          Vendor: 'Object'
        },
        {
          id: '9',
          vendorId: 3,
          name: 'Apricot',
          slug: null,
          density: null,
          Vendor: 'Object'
        },
        {
          id: '10',
          vendorId: 3,
          name: 'Banana',
          slug: null,
          density: null,
          Vendor: 'Object'
        },
        {
          id: '11',
          vendorId: 3,
          name: 'Banana Split',
          slug: null,
          density: null,
          Vendor: 'Object'
        },
        {
          id: '12',
          vendorId: 3,
          name: 'Bavarian Cream',
          slug: null,
          density: null,
          Vendor: 'Object'
        },
        {
          id: '13',
          vendorId: 3,
          name: 'Biscuit',
          slug: null,
          density: null,
          Vendor: 'Object'
        },
        {
          id: '15',
          vendorId: 3,
          name: 'Blackberry',
          slug: null,
          density: null,
          Vendor: 'Object'
        },
        {
          id: '14',
          vendorId: 3,
          name: 'Black Currant',
          slug: null,
          density: null,
          Vendor: 'Object'
        },
        {
          id: '17',
          vendorId: 3,
          name: 'Blueberry',
          slug: null,
          density: null,
          Vendor: 'Object'
        },
        {
          id: '18',
          vendorId: 3,
          name: 'Blueberry Cinnamon Crumble',
          slug: null,
          density: null,
          Vendor: 'Object'
        },
        {
          id: '19',
          vendorId: 3,
          name: 'Blueberry Extra',
          slug: null,
          density: null,
          Vendor: 'Object'
        },
        {
          id: '20',
          vendorId: 3,
          name: 'Blueberry Jam',
          slug: null,
          density: null,
          Vendor: 'Object'
        },
        {
          id: '21',
          vendorId: 3,
          name: 'Blueberry Pomegranate',
          slug: null,
          density: null,
          Vendor: 'Object'
        }
      ]
    };

    store = mockStore({ dashboard, flavors });

    expect(
      renderer
        .create(
          <Provider store={store}>
            <RoutedMain />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('renders Migations correctly', () => {
    dashboard = {
      dashboardComponent: {
        name: 'Migrations'
      },
      migrations: [
        {
          version: '0',
          name: null,
          md5: null,
          runAt: null
        },
        {
          version: '1',
          name: 'initial-tables',
          md5: '21a37c3b009b10c825eeb503316d8455',
          runAt: '2019-08-05T04:08:51.887Z'
        },
        {
          version: '2',
          name: 'initial-data',
          md5: 'b7e138254b5aa7e7f5a2c4b01a47a4bf',
          runAt: '2019-08-05T04:08:52.133Z'
        },
        {
          version: '3',
          name: 'remove-extra',
          md5: '1c21f069a9eba5b6a90c3d7e1000b631',
          runAt: '2019-08-05T04:08:52.152Z'
        },
        {
          version: '4',
          name: 'oauth',
          md5: '93bbe1fba0fe3a0199bb64da5f588619',
          runAt: '2019-08-05T04:08:52.430Z'
        },
        {
          version: '5',
          name: 'vendor-identifier',
          md5: '1e307264fb5e163c731fd3a853188106',
          runAt: '2019-08-05T04:08:52.661Z'
        },
        {
          version: '6',
          name: 'cleanup',
          md5: '3ace3654625342de9408b1a02eab779c',
          runAt: '2019-08-05T04:08:52.683Z'
        },
        {
          version: '7',
          name: 'preparations-diluents',
          md5: '9df28acfb709b31aa010551d3ee106c8',
          runAt: '2019-08-05T04:08:52.873Z'
        },
        {
          version: '8',
          name: 'user-registration',
          md5: '26e034920dcce1f448b9a4161403268d',
          runAt: '2019-08-05T04:08:53.125Z'
        },
        {
          version: '9',
          name: 'recipe-vendor',
          md5: 'eeee5bb71f86970c746a31a30449bba2',
          runAt: '2019-08-05T04:08:53.258Z'
        },
        {
          version: '10',
          name: 'millipercent',
          md5: '5ca462e6fbe8bae86c75552b276fa988',
          runAt: '2019-08-05T04:08:53.501Z'
        },
        {
          version: '11',
          name: 'prep-diluents-pk',
          md5: 'b329bbec7eeb9af639b0964a21deb7a9',
          runAt: '2019-08-05T04:08:53.600Z'
        },
        {
          version: '12',
          name: 'tag-and-version',
          md5: '87647de8630b05c444d158a2cf87d3a3',
          runAt: '2019-08-11T00:57:10.873Z'
        },
        {
          version: '13',
          name: 'unique-role-name',
          md5: 'c6c7d7aabd456322c7fa38068da1014c',
          runAt: '2019-08-11T00:57:10.999Z'
        }
      ]
    };
    store = mockStore({ dashboard });

    expect(
      renderer
        .create(
          <Provider store={store}>
            <RoutedMain />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('renders Roles correctly', () => {
    dashboard = {
      dashboardComponent: {
        name: 'Roles'
      }
    };
    const roles = {
      roles: [
        {
          id: 1,
          name: 'Administrator'
        },
        {
          id: 2,
          name: 'User'
        },
        {
          id: 3,
          name: 'Tester'
        },
        {
          id: 4,
          name: 'Moderator'
        },
        {
          id: 8,
          name: 'Everyone'
        },
        {
          id: 9,
          name: 'Myself'
        }
      ]
    };

    store = mockStore({ dashboard, roles });

    expect(
      renderer
        .create(
          <Provider store={store}>
            <RoutedMain />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('renders Role/Add correctly', () => {
    dashboard = {
      dashboardComponent: {
        name: 'Role/Add'
      }
    };
    store = mockStore({ dashboard });

    expect(
      renderer
        .create(
          <Provider store={store}>
            <RoutedMain />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('renders Role/Edit correctly', () => {
    dashboard = {
      dashboardComponent: {
        name: 'Role/Edit',
        item: role
      }
    };
    store = mockStore({ dashboard });

    expect(
      renderer
        .create(
          <Provider store={store}>
            <RoutedMain />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('renders Role/Delete correctly', () => {
    dashboard = {
      dashboardComponent: {
        name: 'Role/Delete',
        item: role
      }
    };
    store = mockStore({ dashboard, roles: { roleUsers: null } });

    expect(
      renderer
        .create(
          <Provider store={store}>
            <RoutedMain />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('renders Role/Users correctly', () => {
    dashboard = {
      dashboardComponent: {
        name: 'Role/Users',
        item: role
      }
    };
    store = mockStore({ dashboard, roles: { roleUsers: null } });

    expect(
      renderer
        .create(
          <Provider store={store}>
            <RoutedMain />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('renders Role/Add/User correctly', () => {
    dashboard = {
      dashboardComponent: {
        name: 'Role/Add/User',
        item: role
      }
    };
    store = mockStore({
      dashboard,
      roles: { roleUsers: null },
      users: { users }
    });

    expect(
      renderer
        .create(
          <Provider store={store}>
            <RoutedMain />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('renders Role/Delete/User correctly', () => {
    dashboard = {
      dashboardComponent: {
        name: 'Role/Delete/User',
        item: role
      }
    };
    store = mockStore({ dashboard, roles: { roleUsers: null } });

    expect(
      renderer
        .create(
          <Provider store={store}>
            <RoutedMain />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('renders Users correctly', () => {
    dashboard = {
      dashboardComponent: {
        name: 'Users'
      }
    };
    store = mockStore({ dashboard, users: { users } });

    expect(
      renderer
        .create(
          <Provider store={store}>
            <RoutedMain />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('renders User/Roles correctly', () => {
    dashboard = {
      dashboardComponent: {
        name: 'User/Roles',
        item: 3
      }
    };
    const userRoles = [
      {
        userId: '3',
        roleId: 1,
        active: true,
        created: '2019-08-12T05:11:03.132Z',
        Role: {
          id: 1,
          name: 'Administrator'
        }
      },
      {
        userId: '3',
        roleId: 8,
        active: true,
        created: '2019-08-12T05:36:53.928Z',
        Role: {
          id: 8,
          name: 'Everyone'
        }
      },
      {
        userId: '3',
        roleId: 9,
        active: true,
        created: '2019-08-12T06:20:00.599Z',
        Role: {
          id: 9,
          name: 'Myself'
        }
      }
    ];

    store = mockStore({ dashboard, users: { roles: userRoles } });

    expect(
      renderer
        .create(
          <Provider store={store}>
            <RoutedMain />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
