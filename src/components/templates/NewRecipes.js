import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from '@reach/router';
import { Row, Col, CardGroup, Card } from 'react-bootstrap';

export class NewRecipes extends Component {
  render() {
    return (
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
    );
  }
}

export default connect(
  null,
  null
)(NewRecipes);
