import { Helmet } from 'react-helmet';
import React, { Component } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Table
} from 'react-bootstrap';

import FlavorData from '../data/flavors.json';
import FlavorStash from '../data/flavorstash.json';

export default class RecipeEditor extends Component {
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
      searchStash: '',
      ShowStash: false
    };
  }

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
      <Container className="justify-content-center align-items-center text-center">
        <Helmet title="Recipe Editor" />
        <h1>Recipe Editor</h1>
        <Form
          noValidate
          validated={validated}
          onSubmit={e => this.handleSubmit(e)}
        >
          <Form.Row className="justify-content-center">
            <Form.Group as={Col} md="8" controlId="recipeName">
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
          <Form.Row className="justify-content-center">
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
          <Form.Row className="justify-content-center">
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
          </Form.Row>
          <h2>Bases</h2>
          <Form.Row className="justify-content-center align-items-end">
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
          <Form.Row className="justify-content-center align-items-end">
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
          </Form.Row>
          {!this.state.noNic && <h2>Nicotine Strength</h2>}
          <Form.Row className="justify-content-center">
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
            {this.state.showStash ? (
              <Button
                variant="info"
                className="button-animation"
                size="sm"
                onClick={e => this.hideStash(e)}
              >
                <span>Hide</span>
              </Button>
            ) : (
              <Button
                variant="info"
                className="button-animation"
                size="sm"
                onClick={e => this.showStash(e)}
              >
                <span>Show</span>
              </Button>
            )}
          </h2>
          <Container className="justify-content-center">
            <Row className="justify-content-center">
              <Col md="8">
                {this.state.ShowStash && (
                  <Form.Row className="justify-content-center">
                    <Form.Group as={Col} md="4" controlId="searchStash">
                      <Form.Label>Search your stash</Form.Label>
                      <InputGroup>
                        <Form.Control
                          name="searchStash"
                          type="text"
                          placeholder="TFA Bacon"
                          onChange={e => this.handleUserInput(e)}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Form.Row>
                )}
                {this.state.ShowStash && (
                  <Table size="sm" borderless striped>
                    <tbody>
                      {this.state.stash.map((flavor, index) => {
                        if (
                          flavor.name
                            .toLowerCase()
                            .includes(this.state.searchStash.toLowerCase()) ||
                          (flavor.vendor.abbreviation + ' ' + flavor.name)
                            .toLowerCase()
                            .includes(this.state.searchStash.toLowerCase())
                        ) {
                          return (
                            <tr key={index}>
                              <td>{flavor.vendor.name}</td>
                              <td>{flavor.name}</td>
                              <td>
                                {this.state.inuse[index] ? (
                                  <Button
                                    onClick={this.addIngredient.bind(
                                      this,
                                      index
                                    )}
                                    disabled={this.state.inuse[index]}
                                  >
                                    <span>Add to Recipe</span>
                                  </Button>
                                ) : (
                                  <Button
                                    className="button-animation"
                                    onClick={this.addIngredient.bind(
                                      this,
                                      index
                                    )}
                                    disabled={this.state.inuse[index]}
                                  >
                                    <span>Add to Recipe</span>
                                  </Button>
                                )}
                              </td>
                            </tr>
                          );
                        }
                      })}
                    </tbody>
                  </Table>
                )}
              </Col>
            </Row>
          </Container>
          <Container className="justify-content-center">
            <Row className="justify-content-center">
              <Col md="8">
                <h2>Ingredients</h2>
                <Table borderless>
                  <tbody>
                    {this.state.ingredients.map((ingredient, index) => (
                      <tr key={index}>
                        <td>
                          {ingredient.vendor.name} {ingredient.name}
                        </td>
                        <td className="recipe-percent">
                          <InputGroup>
                            <Form.Control
                              step="0.1"
                              name="fip[]"
                              type="number"
                              value={this.state.fip[index]}
                              onChange={event =>
                                this.handlePercent(event, index)
                              }
                              placeholder="0"
                              required
                            />
                            <InputGroup.Append>
                              <InputGroup.Text>%</InputGroup.Text>
                            </InputGroup.Append>
                          </InputGroup>
                        </td>
                        <td>
                          <Button
                            className="button-animation"
                            onClick={this.removeIngredient.bind(this, index)}
                          >
                            <span>Remove</span>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
          <Container>
            <h2>Recipe</h2>
            <Row className="justify-content-center">
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
              label="&nbsp;&nbsp;Agree to terms and conditions"
              feedback="You must agree before submitting."
            />
          </Form.Group>
          <Form.Row className="justify-content-center">
            <Form.Group as={Col} md="2">
              <Button className="button-animation" type="submit">
                <span>Save</span>
              </Button>
              &nbsp;
            </Form.Group>
          </Form.Row>
        </Form>
      </Container>
    );
  }
}
