import React, { Component } from 'react';

import { Link } from '@reach/router';

import {
  Container,
  Row,
  Col,
  Card,
  CardGroup,
  ButtonGroup,
  Button
} from 'react-bootstrap';

export default class Profile extends Component {
  render() {
    return (
      <Container>
        <Row className="text-center">
          <Col>
            <p>
              This is what other users see when they look at your profile.
              <br />
              <Link to="/userSettings">Click here to edit your profile</Link>
            </p>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <h1>xXTeddyBearSlayer69Xx</h1>
            <img src="/media/harold.jpeg" alt="Profile pic" />
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <ButtonGroup>
              <Button variant="primary">
                <span>Message</span>
              </Button>
              <Button variant="primary">
                <span>Follow</span>
              </Button>
              <Button variant="primary">
                <span>Report</span>
              </Button>
            </ButtonGroup>
            <hr />
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <h2>Newest recipes</h2>
            <CardGroup>
              <Card>
                <Card.Img
                  variant="top"
                  src="/media/card-test-1.jpg"
                  className="img-fluid w-75 mx-auto"
                />
                <Card.Body>
                  <Card.Title>
                    <Link to="#">Strawberry Milkshake</Link>
                  </Card.Title>
                  <Card.Text>created 10/13/2018</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small>
                    <span role="img" aria-label="Checkmark emoji">
                      ✔
                    </span>
                    ️ You have everything!
                  </small>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Img
                  variant="top"
                  src="/media/card-test-2.jpg"
                  className="img-fluid w-75 mx-auto"
                />
                <Card.Body>
                  <Card.Title>
                    <Link to="#">Bomb Pop</Link>
                  </Card.Title>
                  <Card.Text>created 12/1/2018</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small>
                    <span role="img" aria-label="Checkmark emoji">
                      ✔
                    </span>
                    ️ You have everything!
                  </small>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Img
                  variant="top"
                  src="/media/card-test-3.jpg"
                  className="img-fluid w-75 mx-auto"
                />
                <Card.Body>
                  <Card.Title>
                    <Link to="#">Tiramisu</Link>
                  </Card.Title>
                  <Card.Text>created 6/28/2019</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small>
                    <span role="img" aria-label="X emoji">
                      ❌
                    </span>{' '}
                    You are missing 1 flavor
                  </small>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Img
                  variant="top"
                  src="/media/card-test-4.jpeg"
                  className="img-fluid w-75 mx-auto"
                />
                <Card.Body>
                  <Card.Title>
                    <Link to="#">RY4 Tobaccy</Link>
                  </Card.Title>
                  <Card.Text>created 4/4/2019</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small>
                    <span role="img" aria-label="Checkmark emoji">
                      ✔
                    </span>
                    ️ You have everything!
                  </small>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Img
                  variant="top"
                  src="/media/card-test-5.jpeg"
                  className="img-fluid w-75 mx-auto"
                />
                <Card.Body>
                  <Card.Title>
                    <Link to="#">Fruit Punch</Link>
                  </Card.Title>
                  <Card.Text>created 1/1/2018</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small>
                    <span role="img" aria-label="X emoji">
                      ❌
                    </span>{' '}
                    You are missing 3 flavors
                  </small>
                </Card.Footer>
              </Card>
            </CardGroup>
            <hr />
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <h2>Most popular recipes</h2>
            <CardGroup>
              <Card>
                <Card.Img
                  variant="top"
                  src="/media/card-test-1.jpg"
                  className="img-fluid w-75 mx-auto"
                />
                <Card.Body>
                  <Card.Title>
                    <Link to="#">Strawberry Milkshake</Link>
                  </Card.Title>
                  <Card.Text>created 10/13/2018</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small>
                    <span role="img" aria-label="Checkmark emoji">
                      ✔
                    </span>
                    ️ You have everything!
                  </small>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Img
                  variant="top"
                  src="/media/card-test-2.jpg"
                  className="img-fluid w-75 mx-auto"
                />
                <Card.Body>
                  <Card.Title>
                    <Link to="#">Bomb Pop</Link>
                  </Card.Title>
                  <Card.Text>created 12/1/2018</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small>
                    <span role="img" aria-label="Checkmark emoji">
                      ✔
                    </span>
                    ️ You have everything!
                  </small>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Img
                  variant="top"
                  src="/media/card-test-3.jpg"
                  className="img-fluid w-75 mx-auto"
                />
                <Card.Body>
                  <Card.Title>
                    <Link to="#">Tiramisu</Link>
                  </Card.Title>
                  <Card.Text>created 6/28/2019</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small>
                    <span role="img" aria-label="X emoji">
                      ❌
                    </span>{' '}
                    You are missing 1 flavor
                  </small>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Img
                  variant="top"
                  src="/media/card-test-4.jpeg"
                  className="img-fluid w-75 mx-auto"
                />
                <Card.Body>
                  <Card.Title>
                    <Link to="#">RY4 Tobaccy</Link>
                  </Card.Title>
                  <Card.Text>created 4/4/2019</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small>
                    <span role="img" aria-label="Checkmark emoji">
                      ✔
                    </span>
                    ️ You have everything!
                  </small>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Img
                  variant="top"
                  src="/media/card-test-5.jpeg"
                  className="img-fluid w-75 mx-auto"
                />
                <Card.Body>
                  <Card.Title>
                    <Link to="#">Fruit Punch</Link>
                  </Card.Title>
                  <Card.Text>created 1/1/2018</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small>
                    <span role="img" aria-label="X emoji">
                      ❌
                    </span>{' '}
                    You are missing 3 flavors
                  </small>
                </Card.Footer>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}
