import React, { Component } from 'react';
import { DashboardLink as DashLink } from 'components/Dashboard/';
import { Accordion, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class Menu extends Component {
  render() {
    return (
      <Accordion>
        <Card>
          <Card.Body>
            <FontAwesomeIcon icon="tachometer-alt" /> &nbsp;
            <DashLink to="#home" name="Home">
              Dashboard
            </DashLink>
          </Card.Body>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            <h3>
              <FontAwesomeIcon icon="user-shield" /> Roles
            </h3>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <div>
                <FontAwesomeIcon icon="user-shield" /> &nbsp;
                <DashLink to="#roles" name="Roles">
                  Roles
                </DashLink>
              </div>
              <div>
                <FontAwesomeIcon icon="plus" /> &nbsp;
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
              <FontAwesomeIcon icon="users" /> Users
            </h3>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <div>
                <FontAwesomeIcon icon="users-cog" /> &nbsp;
                <DashLink to="#users" name="Users">
                  Users
                </DashLink>
              </div>
              <div>
                <FontAwesomeIcon icon="plus" /> &nbsp;
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
              <FontAwesomeIcon icon="bezier-curve" /> Ingredients
            </h3>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              <div>
                <FontAwesomeIcon icon="eye-dropper" /> &nbsp;
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
              <FontAwesomeIcon icon="database" /> Database
            </h3>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="3">
            <Card.Body>
              <FontAwesomeIcon icon="clock" /> &nbsp;
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
