import MD5 from 'md5.js';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { Link, NavLink } from 'react-router-dom';
import {
  Dropdown,
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Row,
  Col
} from 'react-bootstrap';

import { actions as appActions } from 'reducers/application';
import { getUser, isLoggedIn } from 'selectors/application';

export class Header extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    user: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.logoutUser = this.logoutUser.bind(this);
  }

  componentDidMount() {
    const { actions, user } = this.props;

    if (!user) {
      actions.requestCurrentUser();
    }
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

  get gravatar() {
    const {
      user: { emailAddress }
    } = this.props;

    const gravatar = new MD5().update(emailAddress).digest('hex');

    return `https://www.gravatar.com/avatar/${gravatar}?s=50`;
  }

  render() {
    const { loggedIn, user } = this.props;

    return (
      <Container fluid className="mb-5">
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
                  {loggedIn
                    ? this.renderNavItem('/recipe/editor', 'Recipe Editor')
                    : null}
                  {this.renderNavItem('/flavors', 'Flavors')}
                  {loggedIn ? (
                    <Dropdown alignRight className="my-auto">
                      <Dropdown.Toggle as={Link} id="user-dropdown">
                        {user && (
                          <Fragment>
                            <img
                              alt="User"
                              src={this.gravatar}
                              className="rounded-circle"
                            />
                          </Fragment>
                        )}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item as={NavLink} to="/user/profile">
                          Profile
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as={NavLink} to="/user/recipes">
                          Recipes
                        </Dropdown.Item>
                        <Dropdown.Item as={NavLink} to="/user/favorites">
                          Favorites
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as={NavLink} to="/user/shopping-list">
                          Flavor Stash
                        </Dropdown.Item>
                        <Dropdown.Item as={NavLink} to="/user/shopping-list">
                          Shopping List
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as={NavLink} to="/user/settings">
                          Settings
                        </Dropdown.Item>
                        <Dropdown.Item as={NavLink} to="/dashboard">
                          Dashboard
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item
                          as={NavLink}
                          to="/login"
                          onClick={this.logoutUser}
                        >
                          Logout
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
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
  loggedIn: isLoggedIn(state),
  user: getUser(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...appActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
