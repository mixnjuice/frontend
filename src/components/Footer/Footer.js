import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { actions as appActions } from 'reducers/application';
import { isLoggedIn } from 'selectors/application';

export class Footer extends Component {
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
      <li>
        <NavLink exact to={to} activeClassName="active">
          {text}
        </NavLink>
      </li>
    );
  }

  logoutUser() {
    const { actions } = this.props;

    actions.logoutUser();
  }

  render() {
    const { loggedIn } = this.props;

    return (
      <footer className="footer mt-auto py-2 page-footer">
        <Container>
          <Row>
            <Col xs="12" lg="4">
              <h2>Navigation</h2>
              <ul className="p-1">
                {this.renderNavItem('/', 'Home')}
                {this.renderNavItem('/recipes', 'Recipes')}
                {loggedIn &&
                  this.renderNavItem('/recipe/editor', 'Recipe Editor')}
                {this.renderNavItem('/flavors', 'Flavors')}
              </ul>
            </Col>
            <Col xs="12" lg="4" className="middle">
              <h2>User Links</h2>
              <ul className="p-1">
                {loggedIn && (
                  <Fragment>
                    {this.renderNavItem('/user/profile', 'Profile')}
                    {this.renderNavItem('/user/recipes', 'Recipes')}
                    {this.renderNavItem('/user/favorites', 'Favorites')}
                    {this.renderNavItem('/user/flavor-stash', 'Flavor Stash')}
                    {this.renderNavItem('/user/shopping-list', 'Shopping List')}
                    {this.renderNavItem('/user/settings', 'Settings')}
                    {this.renderNavItem('/dashboard', 'Dashboard')}
                    <li>
                      <NavLink
                        to="#"
                        exact
                        className="nav--link-custom"
                        onClick={this.logoutUser}
                      >
                        Logout
                        <br />
                      </NavLink>
                    </li>
                  </Fragment>
                )}
                {!loggedIn && (
                  <Fragment>
                    {this.renderNavItem('/login', 'Login')}
                    {this.renderNavItem('/register', 'Register')}
                  </Fragment>
                )}
              </ul>
            </Col>
            <Col xs="12" lg="4">
              <h2>Social</h2>
              <a
                href="https://www.instagram.com/mixnjuice/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={['fab', 'instagram']}
                  size="3x"
                  className="mx-2 icon-link"
                />
              </a>
              <a
                href="https://twitter.com/mixnjuice"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={['fab', 'twitter']}
                  size="3x"
                  className="mx-2 icon-link"
                />
              </a>
            </Col>
          </Row>
          <Row className="text-center">
            <Col>
              <small>
                Copyright &copy; {new Date().getFullYear()} mixnjuice.com.
                Recipes are property of their respective creators.
              </small>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: isLoggedIn(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(appActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
