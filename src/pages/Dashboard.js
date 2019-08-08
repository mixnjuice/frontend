import PropTypes from 'prop-types';
// import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
// import ComponentSelector from 'components/Dashboard/ComponentSelector';
import Selector from 'components/Dashboard/Selector';
import { Accordion, Card, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBezierCurve,
  faClock,
  faDatabase,
  faEyeDropper,
  faUsers,
  faUsersCog,
  faUserShield,
  faTachometerAlt
} from '@fortawesome/free-solid-svg-icons';

import { actions as dashboardActions } from 'reducers/dashboard';
import { getDashboardComponent } from 'selectors/dashboard';

export class Dashboard extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    dashboardComponent: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    /* this.state = {
      dashboard: 'Home'
    }; */
    this.select = this.select.bind(this);
  }

  select(name, item) {
    // this.setState({ dashboard: name });
    const { actions } = this.props;

    actions.selectDashboard({
      name,
      item
    });
  }

  render() {
    const { dashboardComponent } = this.props;

    return (
      <Container>
        <Row className="text-center">
          <Col>
            <h1>Dashboard</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={3}>
            <Accordion>
              <Card>
                <Card.Body>
                  <FontAwesomeIcon icon={faTachometerAlt} /> &nbsp;
                  <a href="#home" onClick={e => this.select('Home', null, e)}>
                    Dashboard
                  </a>
                </Card.Body>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  <h3>
                    <FontAwesomeIcon icon={faUsers} /> Users
                  </h3>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <div>
                      <FontAwesomeIcon icon={faUsersCog} /> &nbsp;
                      <a
                        href="#users"
                        onClick={e => this.select('Users', null, e)}
                      >
                        Users
                      </a>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faUserShield} /> &nbsp;
                      <a
                        href="#roles"
                        onClick={e => this.select('Roles', null, e)}
                      >
                        Roles
                      </a>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                  <h3>
                    <FontAwesomeIcon icon={faBezierCurve} /> Ingredients
                  </h3>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <div>
                      <FontAwesomeIcon icon={faEyeDropper} /> &nbsp;
                      <a
                        href="#flavors"
                        onClick={e => this.select('Flavors', null, e)}
                      >
                        Flavors
                      </a>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="2">
                  <h3>
                    <FontAwesomeIcon icon={faDatabase} /> Database
                  </h3>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                  <Card.Body>
                    <FontAwesomeIcon icon={faClock} /> &nbsp;
                    <a
                      href="#migrations"
                      onClick={e => this.select('Migrations', null, e)}
                    >
                      Migration History
                    </a>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
          <Col xs={12} md={9}>
            <Selector component={dashboardComponent.name} />
          </Col>
        </Row>
      </Container>
    );
  }
}

// export default Dashboard;

const mapStateToProps = state => ({
  dashboardComponent: getDashboardComponent(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...dashboardActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
