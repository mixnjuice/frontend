import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from '@reach/router';
import { Row, Col, Card, Button } from 'react-bootstrap';

export class FeaturedMixer extends Component {
  render() {
    return (
      <Row className="text-center">
        <Col>
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
            <Card.Footer className="text-muted">
              <span>The next featured mixer will be here in 5 days</span>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default connect(
  null,
  null
)(FeaturedMixer);
