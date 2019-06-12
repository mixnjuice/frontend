import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Link } from '@reach/router';
import { Container, Row, Col, CardGroup, Card, Button } from 'react-bootstrap';

export class Home extends Component {
  render() {
    return (
      <Container>
        <Row className="text-center">
          <Col>
            <h1>Welcome to MixNJuice!</h1>
            <p style={{ 'font-size': '0.8em' }}>
              <Link to="#">Click here to customize your front page!</Link>
            </p>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <h2>Top recipes of the day</h2>
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
                  <Card.Text>by David Dyess</Card.Text>
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
                  <Card.Text>by JosefBud</Card.Text>
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
                  <Card.Text>by ayan4m1</Card.Text>
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
                  <Card.Text>by pscn</Card.Text>
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
                  <Card.Text>by Korlimann</Card.Text>
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
        <Row className="text-center">
          <Col>
            <hr />
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
                  <Card.Text>by David Dyess</Card.Text>
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
                  <Card.Text>by JosefBud</Card.Text>
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
                  <Card.Text>by ayan4m1</Card.Text>
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
                  <Card.Text>by pscn</Card.Text>
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
                  <Card.Text>by Korlimann</Card.Text>
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
        <Row className="text-center">
          <Col>
            <hr />
            <h2>Featured mixer of the month</h2>
            <Card className="text-center">
              <Card.Header>mlNikon</Card.Header>
              <Card.Body>
                <Row>
                  <Col>
                    <img src="/media/harold.jpeg" alt="" className="w-50" />
                  </Col>
                  <Col>
                    <Card.Title>I&apos;m not creative enough</Card.Title>
                    <Card.Text>
                      To figure out what could go here, but it&apos;s an idea.
                    </Card.Text>
                    <Button variant="primary">
                      <span>Check out their recipes</span>
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer className="text-muted">2 days ago</Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect(
  null,
  null
)(Home);
