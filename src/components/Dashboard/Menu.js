import React, { Component } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faDatabase,
  faUsers,
  faUsersCog,
  faUserShield,
  faTachometerAlt
} from '@fortawesome/free-solid-svg-icons';

export class Menu extends Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      dashboard: 'Home'
    };
    this.select = this.select.bind(this);
  }
  select(name) {
    this.setState({ dashboard: name });
  }
  render() {
    return (
      <Accordion>
        <Card>
          <Card.Body>
            <FontAwesomeIcon icon={faTachometerAlt} /> &nbsp;
            <a href="#home" onClick={e => this.select('Home', e)}>
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
                <a href="#users" onClick={e => this.select('Users', e)}>
                  Manage Users
                </a>
              </div>
              <div>
                <FontAwesomeIcon icon={faUserShield} /> &nbsp;
                <a href="#roles" onClick={e => this.select('Roles', e)}>
                  Manage Roles
                </a>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            <h3>
              <FontAwesomeIcon icon={faDatabase} /> Database
            </h3>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <FontAwesomeIcon icon={faClock} /> &nbsp;
              <a href="#migrations" onClick={e => this.select('Migrations', e)}>
                Migration History
              </a>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
}

export default Menu;
