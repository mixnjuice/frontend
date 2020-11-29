import MD5 from 'md5.js';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import React, { Fragment, useCallback } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Row,
  Col,
  Dropdown
} from 'react-bootstrap';
import { animated } from 'react-spring';

import Logo from 'media/logo.svg';
import { actions as appActions } from 'reducers/application';
import { getUser, isLoggedIn } from 'selectors/application';
import useHoverBounce from 'components/HoverBounce/useHoverBounce';

export function HeaderNavItem({ to, text }) {
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

HeaderNavItem.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export function HeaderNavDropdownItem({ to, text }) {
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

HeaderNavDropdownItem.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default function Header() {
  const [dropdownStyle, dropdownTrigger] = useHoverBounce({
    y: 20
  });
  const dispatch = useDispatch();
  const logoutUser = useCallback(() => {
    dispatch(appActions.logoutUser());
  }, [dispatch]);
  const loggedIn = useSelector(isLoggedIn);
  const user = useSelector(getUser);

  let gravatarUrl = '';

  if (user) {
    const emailHash = new MD5().update(user.emailAddress).digest('hex');

    gravatarUrl = `https://www.gravatar.com/avatar/${emailHash}?s=50&d=mp`;
  }

  return (
    <Container fluid className="mb-5">
      <Row className="navigation-container">
        <Col>
          <Navbar expand="lg">
            <Navbar.Brand className="pt-0">
              <img src={Logo} alt="logo" className="image--logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
              <Nav>
                <HeaderNavItem to="/" text="Home" />
                <HeaderNavItem to="/recipes" text="Recipes" />
                {loggedIn ? (
                  <HeaderNavItem to="/recipe/editor" text="Recipe Editor" />
                ) : null}
                <HeaderNavItem to="/flavors" text="Flavors" />
                {!loggedIn ? (
                  <Fragment>
                    <HeaderNavItem to="/login" text="Login" />
                    <HeaderNavItem to="/register" text="Register" />
                  </Fragment>
                ) : null}
              </Nav>
              <Nav className="ml-auto">
                {loggedIn ? (
                  <Dropdown
                    alignRight
                    className="nav--link-custom px-3"
                    onMouseEnter={dropdownTrigger}
                  >
                    <animated.span style={dropdownStyle}>
                      <Dropdown.Toggle as={Link} to="#" id="user-dropdown">
                        {user && (
                          <Fragment>
                            <img
                              alt="User"
                              src={gravatarUrl}
                              className="rounded-circle"
                            />
                          </Fragment>
                        )}
                      </Dropdown.Toggle>
                    </animated.span>
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
                      <Dropdown.Item as={NavLink} to="/user/flavor-stash">
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
                        onClick={logoutUser}
                      >
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : null}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Col>
      </Row>
    </Container>
  );
}
