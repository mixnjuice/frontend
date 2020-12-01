import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, CardGroup, Card } from 'react-bootstrap';

import ImageOne from 'media/card-test-1.jpg';
import ImageTwo from 'media/card-test-2.jpg';
import ImageThree from 'media/card-test-3.jpg';
import ImageFour from 'media/card-test-4.jpeg';
import ImageFive from 'media/card-test-5.jpeg';

export default function NewRecipes() {
  return (
    <Row className="text-center">
      <Col>
        <h2>Newest recipes</h2>
        <CardGroup>
          <Card>
            <Card.Img
              variant="top"
              src={ImageOne}
              className="img-fluid w-75 mx-auto"
            />
            <Card.Body>
              <Card.Title>
                <Link to="/user/david">Strawberry Milkshake</Link>
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
              src={ImageTwo}
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
              src={ImageThree}
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
              src={ImageFour}
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
              src={ImageFive}
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
