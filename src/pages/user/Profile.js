import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form';
import {
  Container,
  Row,
  Col,
  Card,
  CardGroup,
  ButtonGroup,
  Button,
  Form,
  InputGroup
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { actions as appActions } from 'reducers/application';
import { actions as profileActions } from 'reducers/profile';
import { isLoggedIn } from 'selectors/application';
import { getCurrentUser, getUserProfile } from 'selectors/profile';

export class Profile extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    collection: PropTypes.any,
    currentUser: PropTypes.bool,
    loggedIn: PropTypes.bool.isRequired,
    editting: PropTypes.bool.isRequired
  };
  constructor(props) {
    super(props);
    const {
      actions,
      match: { params, path }
    } = this.props;

    this.state = { editting: false };

    if (path === '/user/profile' || path === '/user') {
      actions.requestCurrentUserProfile();
    }
    if (path === '/user/:userName') {
      actions.requestProfile({ name: params.userName });
    }

    this.handleEditor = this.handleEditor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  get Gravatar() {
    const { collection } = this.props;

    return 'https://www.gravatar.com/avatar/' + collection.gravatar + '?s=250';
  }

  get Website() {
    const { collection } = this.props;
    const url = '//' + collection.url;

    return <a href={url}>{collection.url}</a>;
  }

  get locationIcon() {
    return <FontAwesomeIcon icon="city" />;
  }

  get webIcon() {
    return <FontAwesomeIcon icon="globe" />;
  }

  get bioIcon() {
    return <FontAwesomeIcon icon="info-circle" />;
  }

  handleEditor(toggle) {
    if (toggle) {
      this.setState({ editting: true });
    } else {
      this.setState({ editting: false });
    }
  }

  handleSubmit(values) {
    const { actions } = this.props;

    actions.updateProfile(values);
    this.setState({ editting: false });
  }

  profileEditor() {
    const {
      collection: { bio, location, url },
      currentUser
    } = this.props;

    if (currentUser) {
      return (
        <Card body>
          <FinalForm
            onSubmit={this.handleSubmit}
            initialValues={{ bio, location, url }}
            render={({ handleSubmit, submitting }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Row>
                  <Field name="location">
                    {({ input }) => (
                      <Form.Group as={Col}>
                        <InputGroup>
                          <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend">
                              {this.locationIcon}
                            </InputGroup.Text>
                          </InputGroup.Prepend>
                          <Form.Control
                            {...input}
                            type="text"
                            placeholder="Location"
                            aria-describedby="inputGroupPrepend"
                          />
                        </InputGroup>
                      </Form.Group>
                    )}
                  </Field>
                </Form.Row>
                <Form.Row>
                  <Field name="url">
                    {({ input }) => (
                      <Form.Group as={Col}>
                        <InputGroup>
                          <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend">
                              {this.webIcon}
                            </InputGroup.Text>
                          </InputGroup.Prepend>
                          <Form.Control
                            {...input}
                            type="text"
                            placeholder="example.com"
                          />
                        </InputGroup>
                      </Form.Group>
                    )}
                  </Field>
                </Form.Row>
                <Form.Row>
                  <Field name="bio">
                    {({ input }) => (
                      <Form.Group as={Col}>
                        <InputGroup>
                          <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend">
                              {this.bioIcon}
                            </InputGroup.Text>
                          </InputGroup.Prepend>
                          <Form.Control
                            {...input}
                            as="textarea"
                            placeholder="Info"
                            style={{ minHeight: '400px' }}
                          />
                        </InputGroup>
                      </Form.Group>
                    )}
                  </Field>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Button
                      className="button-animation"
                      variant="primary"
                      type="submit"
                      disabled={submitting}
                    >
                      <span>Save</span>
                    </Button>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Button
                      onClick={e => this.handleEditor(false, e)}
                      className="button-animation"
                      variant="primary"
                    >
                      <span>Cancel</span>
                    </Button>
                  </Form.Group>
                </Form.Row>
              </Form>
            )}
          />
        </Card>
      );
    }
  }

  render() {
    const { collection, currentUser } = this.props;
    const { editting } = this.state;

    return (
      <Container>
        <Helmet title="Your Profile" />
        <Row className="text-center">
          <Col>
            <p>
              This is what other users see when they look at your profile.
              <br />
              <Link to="/user-settings">Click here to edit your profile</Link>
            </p>
          </Col>
        </Row>
        <Row className="text-center mb-3">
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src={this.Gravatar} />
              <Card.Header as="h1">{collection.name}</Card.Header>
              {!editting && (collection.location || collection.url) ? (
                <Card.Body>
                  {collection.location ? (
                    <div>
                      {this.locationIcon} {collection.location}
                    </div>
                  ) : null}

                  {collection.url ? (
                    <div>
                      {this.webIcon} {this.Website}
                    </div>
                  ) : null}
                </Card.Body>
              ) : null}
            </Card>
            {!editting && collection.bio ? (
              <Card body className="text-left">
                {collection.bio}
              </Card>
            ) : null}
            {!currentUser ? (
              <ButtonGroup className="mt-3">
                <Button className="button-animation" variant="primary">
                  <span>Message</span>
                </Button>
                <Button className="button-animation" variant="primary">
                  <span>Follow</span>
                </Button>
                <Button className="button-animation" variant="primary">
                  <span>Report</span>
                </Button>
              </ButtonGroup>
            ) : (
              !editting && (
                <Button
                  onClick={e => this.handleEditor(true, e)}
                  className="button-animation mt-3"
                  variant="primary"
                >
                  <span>Edit Profile</span>
                </Button>
              )
            )}
            {editting && this.profileEditor()}
          </Col>
          <Col>
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
          </Col>
          <hr />
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: getCurrentUser(state),
  loggedIn: isLoggedIn(state),
  collection: getUserProfile(state),
  editting: false
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...appActions,
      ...profileActions
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
