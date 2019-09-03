import React, { Component } from 'react';
import { DashboardLink as DashLink } from 'components/Dashboard/';
import { Accordion, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBezierCurve,
  faClock,
  faDatabase,
  faEyeDropper,
  faPlus,
  faUsers,
  faUsersCog,
  faUserShield,
  faTachometerAlt
} from '@fortawesome/free-solid-svg-icons';
// import {  } from '@fortawesome/free-regular-svg-icons';

export class Menu extends Component {
  render() {
    return (
      <Accordion>
        <Card>
          <Card.Body>
            <FontAwesomeIcon icon={faTachometerAlt} /> &nbsp;
            <DashLink to="#home" name="Home">
              Dashboard
            </DashLink>
          </Card.Body>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            <h3>
              <FontAwesomeIcon icon={faUserShield} /> Roles
            </h3>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <div>
                <FontAwesomeIcon icon={faUserShield} /> &nbsp;
                <DashLink to="#roles" name="Roles">
                  Roles
                </DashLink>
              </div>
              <div>
                <FontAwesomeIcon icon={faPlus} /> &nbsp;
                <DashLink to="#roles/add" name="Role/Add">
                  Add Role
                </DashLink>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            <h3>
              <FontAwesomeIcon icon={faUsers} /> Users
            </h3>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <div>
                <FontAwesomeIcon icon={faUsersCog} /> &nbsp;
                <DashLink to="#users" name="Users">
                  Users
                </DashLink>
              </div>
              <div>
                <FontAwesomeIcon icon={faPlus} /> &nbsp;
                <DashLink to="#users/add" name="User/Add">
                  Add User
                </DashLink>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="2">
            <h3>
              <FontAwesomeIcon icon={faBezierCurve} /> Ingredients
            </h3>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              <div>
                <FontAwesomeIcon icon={faEyeDropper} /> &nbsp;
                <DashLink to="#flavors" name="Flavors">
                  Flavors
                </DashLink>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="3">
            <h3>
              <FontAwesomeIcon icon={faDatabase} /> Database
            </h3>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="3">
            <Card.Body>
              <FontAwesomeIcon icon={faClock} /> &nbsp;
              <DashLink to="#migrations" name="Migrations">
                Migration History
              </DashLink>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
}

export default Menu;
