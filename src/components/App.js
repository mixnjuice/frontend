import React, { Component } from 'react';

import { connect } from 'react-redux';

import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Nav,
  Navbar,
  Row,
  Table
} from 'react-bootstrap';

import { faHeart } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import FlavorData from '../data/flavors.json';

import FlavorStash from '../data/flavorstash.json';

export class App extends Component {
  render() {
    return (
      <Container>
        {/* Navbar Start*/}
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">MixNJuice</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        {/* Navbar End */}
        <hr />
        {/* Login Start */}
        <Row>
          <Col sm={6}>
            <h1>Login</h1>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We&apos;ll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group controlId="formBasicChecbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
        {/* Login End */}
        <hr />
        {/* User Registration Start*/}
        <h1>Register</h1>
        <UserRegistration />
        {/* User Registration End*/}
        <hr />
        {/* Flavors Start*/}
        <h1>Flavors</h1>
        <Flavors />
        {/* Flavors End*/}
        <hr />
        {/* Calculator Start*/}
        <h1>Recipe Calculator</h1>
        <Calculator />
        {/* Calculator End*/}
        <hr />
        {/* Footer Start */}
        <Row>
          <Col sm={12} style={{ textAlign: 'center' }}>
            Built with &nbsp;
            <FontAwesomeIcon icon={faHeart} style={{ color: 'red' }} />
            &nbsp; by the Gusta Project
          </Col>
        </Row>
        {/* Footer End */}
      </Container>
    );
  }
}

export default connect(
  null,
  null
)(App);

// User Registration Component
class UserRegistration extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      validated: false,
      email: '',
      emailConf: '',
      passw: '',
      passwConf: '',
      message: '',
      errorMessage: false
    };
  }

  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    const form = event.currentTarget;

    if (this.state.passwConf !== this.state.passw) {
      this.setState({ passwConf: '' });
      event.preventDefault();
      event.stopPropagation();
    }

    if (this.state.emailConf !== this.state.email) {
      this.setState({ emailConf: '' });
      event.preventDefault();
      event.stopPropagation();
    }

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({ validated: true });
  }

  render() {
    const { validated } = this.state;

    const errorMessage = this.state.errorMessage;

    return (
      <Form
        noValidate
        validated={validated}
        onSubmit={e => this.handleSubmit(e)}
      >
        <Form.Row>
          <Form.Group as={Col} md="4" controlId="validationUsername">
            <Form.Label>Username</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              name="email"
              type="email"
              value={this.state.email}
              onChange={event => this.handleUserInput(event)}
              placeholder="Enter email"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email address.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="emailConf">
            <Form.Label>Confirm Email Address</Form.Label>
            <Form.Control
              name="emailConf"
              type="email"
              value={this.state.emailConf}
              onChange={event => this.handleUserInput(event)}
              placeholder="Confirm Enter email"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email address.
            </Form.Control.Feedback>
            {this.state.email !== this.state.emailConf && (
              <Alert as="span" variant="danger">
                Email Addresses do not match
              </Alert>
            )}
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="passw">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="passw"
              type="password"
              value={this.state.passw}
              onChange={event => this.handleUserInput(event)}
              placeholder="Enter Password"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="passwConf">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              name="passwConf"
              type="password"
              value={this.state.passwConf}
              onChange={event => this.handleUserInput(event)}
              placeholder="Confirm Password"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Password.
            </Form.Control.Feedback>
            {this.state.passw !== this.state.passwConf && (
              <Alert as="span" variant="danger">
                Passwords do not match
              </Alert>
            )}
          </Form.Group>
        </Form.Row>
        <Form.Group>
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
          />
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col} md="2">
            <Button type="submit">Register</Button>&nbsp;
          </Form.Group>
          <Form.Group as={Col} md="3">
            {errorMessage && (
              <Alert as="span" variant="danger">
                {this.state.message}
              </Alert>
            )}
          </Form.Group>
        </Form.Row>
      </Form>
    );
  }
}
// End Registration
// Calculator Component
class Calculator extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      validated: false,
      recipeName: '',
      maxVG: false,
      noNic: false,
      amount: false,
      strength: false,
      ingredients: [],
      fip: [],
      inuse: [],
      flavors: FlavorData,
      stash: FlavorStash,
      ShowStash: false
    };
  }

  componentDidMount() {}

  showStash() {
    this.setState({ ShowStash: true });
  }

  hideStash() {
    this.setState({ ShowStash: false });
  }

  addIngredient(index) {
    var ingr = this.state.ingredients;

    if (!this.state.inuse[index]) {
      ingr[index] = this.state.stash[index];
      this.setState({
        ingredients: ingr
      });
      const inu = this.state.inuse;

      inu[index] = true;
      this.setState({ inuse: inu });
    }
  }

  removeIngredient(index) {
    var ingre = this.state.ingredients;
    var inu = this.state.inuse;

    delete ingre[index];
    delete inu[index];

    this.setState({ ingredients: ingre, inuse: inu });
  }

  handleUserCheck(e) {
    const name = e.target.name;

    if (this.state[name] === true) {
      this.setState({ [name]: false });
    } else {
      this.setState({ [name]: true });
    }
  }

  handlePercent(e /* , index*/) {
    this.handleUserInput(e);

    // TODO: Calculate mix percentage here
  }

  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({ validated: true });
  }

  render() {
    const { validated } = this.state;

    return (
      <Form
        noValidate
        validated={validated}
        onSubmit={e => this.handleSubmit(e)}
      >
        <Form.Row>
          <Form.Group as={Col} md="12" controlId="recipeName">
            <Form.Label>Recipe Name</Form.Label>
            <Form.Control
              name="recipeName"
              type="text"
              value={this.state.receipeName}
              onChange={event => this.handleUserInput(event)}
              placeholder="Recipe Name"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose a recipe name.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <h2>Options</h2>
        <Form.Row>
          <Form.Group>
            <Form.Check
              inline
              name="maxVG"
              label="Max VG"
              type="checkbox"
              checked={this.state.maxVG}
              onChange={event => this.handleUserCheck(event)}
            />
            <Form.Check
              inline
              name="noNic"
              label="No Nicotine"
              type="checkbox"
              checked={this.state.noNic}
              onChange={event => this.handleUserCheck(event)}
            />
            <Form.Check inline label="Flavor Stash Only" type="checkbox" />
          </Form.Group>
        </Form.Row>
        <h2>Bases</h2>
        <Form.Row>
          <Form.Group as={Col} md="2" controlId="amount">
            <Form.Label>Batch Amount</Form.Label>
            <InputGroup>
              <Form.Control
                name="amount"
                type="number"
                value={this.state.amount}
                onChange={event => this.handleUserInput(event)}
                placeholder="0"
                required
              />
              <InputGroup.Append>
                <InputGroup.Text id="amount-unit">mL</InputGroup.Text>
              </InputGroup.Append>
              <Form.Control.Feedback type="invalid">
                Please provide a batch amount.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          {!this.state.noNic && (
            <Form.Group as={Col} md="2" controlId="nicStrength">
              <Form.Label>Nicotine Base Strength</Form.Label>
              <InputGroup>
                <Form.Control
                  name="nicStrength"
                  type="number"
                  value={this.state.nicStrength}
                  onChange={event => this.handleUserInput(event)}
                  placeholder="0"
                  required
                />
                <InputGroup.Append>
                  <InputGroup.Text id="amount-unit">mg</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
          )}
          {!this.state.noNic && (
            <Form.Group as={Col} md="2" controlId="nicPG">
              <Form.Label>Nicotine Base PG</Form.Label>
              <InputGroup>
                <Form.Control
                  name="nicPG"
                  type="number"
                  value={this.state.nicPG}
                  onChange={event => this.handleUserInput(event)}
                  placeholder="0"
                  required
                />
                <InputGroup.Append>
                  <InputGroup.Text id="amount-unit">%</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
          )}
          {!this.state.noNic && (
            <Form.Group as={Col} md="2" controlId="nicVG">
              <Form.Label>Nicotine Base VG</Form.Label>
              <InputGroup>
                <Form.Control
                  name="nicVG"
                  type="number"
                  value={this.state.nicVG}
                  onChange={event => this.handleUserInput(event)}
                  placeholder="0"
                  required
                />
                <InputGroup.Append>
                  <InputGroup.Text id="amount-unit">%</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
          )}
          {!this.state.maxVG && (
            <Form.Group as={Col} md="2" controlId="pgBase">
              <Form.Label>PG Base</Form.Label>
              <InputGroup>
                <Form.Control
                  name="pgBase"
                  type="number"
                  value={this.state.pgBase}
                  onChange={event => this.handleUserInput(event)}
                  placeholder="0"
                  required
                />
                <InputGroup.Append>
                  <InputGroup.Text id="amount-unit">%</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
          )}
          {!this.state.maxVG && (
            <Form.Group as={Col} md="2" controlId="vgBase">
              <Form.Label>VG Base</Form.Label>
              <InputGroup>
                <Form.Control
                  name="vgBase"
                  type="number"
                  value={this.state.vgBase}
                  onChange={event => this.handleUserInput(event)}
                  placeholder="0"
                  required
                />
                <InputGroup.Append>
                  <InputGroup.Text id="amount-unit">%</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
          )}
        </Form.Row>
        {!this.state.noNic && <h2>Nicotine Strength</h2>}
        <Form.Row>
          {!this.state.noNic && (
            <Form.Group as={Col} md="2" controlId="desiredNicStrength">
              <Form.Label>Desired Strength</Form.Label>
              <InputGroup>
                <Form.Control
                  name="desiredNicStrength"
                  type="number"
                  value={this.state.desiredNicStrength}
                  onChange={event => this.handleUserInput(event)}
                  placeholder="0"
                  required
                />
                <InputGroup.Append>
                  <InputGroup.Text id="amount-unit">mg</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
          )}
        </Form.Row>
        <h2>
          Flavor Stash
          <span>&nbsp;&nbsp;&nbsp;</span>
          {this.state.ShowStash && (
            <Button variant="info" size="sm" onClick={e => this.hideStash(e)}>
              Hide
            </Button>
          )}
          {!this.state.ShowStash && (
            <Button variant="info" size="sm" onClick={e => this.showStash(e)}>
              Show
            </Button>
          )}
        </h2>
        <Container>
          {this.state.ShowStash && (
            <Table size="sm" borderless striped>
              <tbody>
                {this.state.stash.map((flavor, index) => (
                  <tr key={index}>
                    <td>{flavor.vendor.name}</td>
                    <td>{flavor.name}</td>
                    <td>
                      <Button
                        onClick={this.addIngredient.bind(this, index)}
                        disabled={this.state.inuse[index]}
                      >
                        Add to Recipe
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Container>
        <h2>Ingredients</h2>
        <Table borderless>
          <tbody>
            {this.state.ingredients.map((ingredient, index) => (
              <tr key={index}>
                <td>
                  {ingredient.vendor.name} {ingredient.name}
                </td>
                <td>
                  <InputGroup>
                    <Form.Control
                      name="fip[]"
                      type="number"
                      value={this.state.fip[index]}
                      onChange={event => this.handlePercent(event, index)}
                      placeholder="0"
                      required
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>%</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </td>
                <td>
                  <Button onClick={this.removeIngredient.bind(this, index)}>
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Container>
          <h2>Recipe</h2>
          <Row>
            <Col md={{ span: 6 }}>
              <center>
                <h3>{this.state.recipeName || 'Please add a name!'}</h3>
              </center>
              <Table size="sm" striped bordered hover>
                <thead>
                  <tr>
                    <th>Ingredient</th>
                    <th>mL</th>
                    <th>g</th>
                    <th>%</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.ingredients.map((ingredient, index) => (
                    <tr key={index}>
                      <td>{ingredient.name}</td>
                      <td>{ingredient.ml}</td>
                      <td>{ingredient.g}</td>
                      <td>{ingredient.percent}</td>
                    </tr>
                  ))}
                  <tr>
                    <td>CAP Chocolate Fudge Brownie V2</td>
                    <td>1.20</td>
                    <td>1.24</td>
                    <td>6.0</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
        <Form.Group>
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
          />
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col} md="2">
            <Button type="submit">Save</Button>&nbsp;
          </Form.Group>
        </Form.Row>
      </Form>
    );
  }
}
// End Calculator
// Flavors
class Flavors extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      validated: false,
      amount: '0',
      strength: '0',
      data: FlavorData
    };
  }

  componentDidMount() {}

  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({ validated: true });
  }

  render() {
    return (
      <Container>
        {this.state.data.map((flavor, index) => (
          <div key={index}>
            {flavor.vendor.abbreviation} {flavor.name}
          </div>
        ))}
      </Container>
    );
  }
}
