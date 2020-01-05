import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container, Row, Col } from 'react-bootstrap';

import { actions as appActions } from 'reducers/application';
import { isLoggedIn } from 'selectors/application';

export class Header extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool.isRequired
  };
  constructor(props) {
    super(props);

    this.logoutUser = this.logoutUser.bind(this);
  }
  renderNavItem(to, text) {
    return (
      <Nav.Link
        as={NavLink}
        exact
        to={to}
        className="nav--link-custom px-3"
        activeClassName="active"
      >
        {text}
      </Nav.Link>
    );
  }

  renderNavDropdownItem(to, text) {
    return (
      <NavDropdown.Item
        as={NavLink}
        exact
        to={to}
        className="nav--link-custom"
        activeClassName="active"
      >
        {text}
        <br />
      </NavDropdown.Item>
    );
  }

  logoutUser() {
    const { actions } = this.props;

    actions.logoutUser();
  }

  render() {
    const { loggedIn } = this.props;

    return (
      <Container fluid>
        <Row className="navigation-container">
          <Col>
            <Navbar expand="lg">
              <Navbar.Brand className="pt-0">
                <img src="/media/logo.svg" alt="logo" className="image--logo" />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse>
                <Nav>
                  {this.renderNavItem('/', 'Home')}
                  {this.renderNavItem('/recipes', 'Recipes')}
                  {this.renderNavItem('/calculator', 'Calculator')}
                  {this.renderNavItem('/flavors', 'Flavors')}
                  {loggedIn ? (
                    <NavDropdown title="User">
                      {this.renderNavDropdownItem('/user/profile', 'Profile')}
                      {this.renderNavDropdownItem('/user/recipes', 'Recipes')}
                      {this.renderNavDropdownItem(
                        '/user/favorites',
                        'Favorites'
                      )}
                      {this.renderNavDropdownItem(
                        '/user/flavor-stash',
                        'Flavor Stash'
                      )}
                      {this.renderNavDropdownItem(
                        '/user/shopping-list',
                        'Shopping List'
                      )}
                      {this.renderNavDropdownItem('/user/settings', 'Settings')}

                      {this.renderNavDropdownItem('/dashboard', 'Dashboard')}
                      <NavDropdown.Item
                        as={NavLink}
                        to="#"
                        className="nav--link-custom"
                        activeClassName="active"
                        onClick={this.logoutUser}
                      >
                        Logout
                        <br />
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : null}
                  {!loggedIn ? (
                    <Fragment>
                      {this.renderNavItem('/login', 'Login')}
                      {this.renderNavItem('/register', 'Register')}
                    </Fragment>
                  ) : null}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: isLoggedIn(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(appActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
