import React, { Component } from 'react';

import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';

export default class UserSettings extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      username: 'xXTeddyBearSlayer69Xx',
      email: 'SlayTeddiesAllDay@aol.com',
      filename: '',
      frontPageList: [
        {
          id: 1,
          name: 'Top Recipes of the Day'
        },
        {
          id: 2,
          name: 'Newest Recipes'
        },
        {
          id: 3,
          name: 'Featured Mixer'
        }
      ],
      droppedItems: [],
      draggedItem: {}
    };
  }

  handleFileInput(event) {
    this.setState({ filename: event.target.files[0].name });
  }

  render() {
    return (
      <Container>
        <Row className="text-center">
          <Col>
            <h1>User Settings</h1>
          </Col>
        </Row>
        <Form>
          <Row className="text-center">
            <Col>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Username</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  name="username"
                  type="text"
                  defaultValue={this.state.username}
                  placeholder={this.state.username}
                  aria-describedby="Username"
                />
              </InputGroup>
            </Col>
            <Col>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>E-mail</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  name="e-mail"
                  type="email"
                  defaultValue={this.state.email}
                  placeholder={this.state.email}
                  aria-describedby="E-mail address"
                />
              </InputGroup>
              <br />
            </Col>
          </Row>
          <Row className="text-center">
            <Col md="3" className="align-self-center">
              <img
                src="/media/harold.jpeg"
                alt="Current profile pic"
                className="w-50"
              />
            </Col>
            <Col md="6" className="align-self-center">
              <h3>Profile Picture</h3>
              <InputGroup>
                <div className="custom-file">
                  <Form.Control
                    name="profilePic"
                    type="file"
                    className="custom-file-input"
                    onChange={event => this.handleFileInput(event)}
                  />
                  <Form.Label className="custom-file-label text-left">
                    {this.state.filename
                      ? this.state.filename
                      : 'Choose a picture'}
                  </Form.Label>
                </div>
                <InputGroup.Prepend>
                  <Button className="button-animation">
                    <span>Upload</span>
                  </Button>
                </InputGroup.Prepend>
              </InputGroup>
            </Col>
          </Row>
          <hr />
          <Row className="text-center">
            <Col />
          </Row>
          <Row className="text-center">
            <Col>
              <Button className="button-animation">
                <span>Save</span>
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}
