import dayjs from 'dayjs';
import { Helmet } from 'react-helmet';
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form as FinalForm, Field } from 'react-final-form';
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row
} from 'react-bootstrap';
import ToggleButton from 'components/ToggleButton/ToggleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { actions as flavorActions } from 'reducers/flavor';
import { getStash, isLoaded } from 'selectors/flavor';
import Note from 'components/FlavorStash/Note';

export default function FlavorStash() {
  const dispatch = useDispatch();
  const stash = useSelector(getStash);
  const stashLoaded = useSelector(isLoaded);

  const [expanded, setExpanded] = useState({});
  const [editingStash, setEditing] = useState(false);
  const [removed, setRemoved] = useState({});
  const [usage, setUsage] = useState({});

  useEffect(() => {
    if (!stashLoaded) {
      dispatch(flavorActions.requestStash());
    }
  }, [stashLoaded, dispatch]);

  const date = (d) => {
    return dayjs(d).format('YYYY-MM-DD');
  };

  const addToStash = (id) => {
    dispatch(flavorActions.addStash({ id }));
    removed[id] = false;
    setRemoved({ ...removed });
  };

  const removeFromStash = (id) => {
    dispatch(flavorActions.removeStash({ id }));
    removed[id] = true;
    setRemoved({ ...removed });
  };

  const expandIcon = (isExpanded) => {
    return (
      <FontAwesomeIcon
        rotation={expanded ? 90 : 270}
        icon="chevron-left"
        className={`mr-2 ${isExpanded ? 'arrow--up' : 'arrow--down'}`}
      />
    );
  };

  const stashButton = (id, has) => {
    return (
      <ToggleButton
        value={has}
        onClick={has ? () => removeFromStash(id) : () => addToStash(id)}
        title={has ? 'Remove from Stash' : 'Add to Stash'}
        variant="check"
      />
    );
  };

  const handleStashEditor = (id) => {
    setEditing(id ? id : false);
  };

  const editIcon = (id) => {
    return (
      <Fragment>
        {!editingStash ? (
          <Button
            className="button-animation"
            size="sm"
            onClick={(e) => handleStashEditor(id, e)}
          >
            <FontAwesomeIcon icon="pen" size="sm" title="Edit Details" />
          </Button>
        ) : null}
      </Fragment>
    );
  };

  const handleStashSubmit = (values) => {
    const { flavorId, minMillipercent, maxMillipercent } = values;

    dispatch(flavorActions.updateStash(values));

    usage[flavorId] = {
      minMillipercent,
      maxMillipercent
    };
    setEditing(false);
    setUsage({ ...usage });
  };

  const expandFlavor = (flavor) => {
    const { flavorId } = flavor;

    expanded[flavorId] = !expanded?.[flavorId];

    setExpanded({ ...expanded });
  };

  const stashEditor = (flavor) => {
    const { flavorId, maxMillipercent, minMillipercent } = flavor;

    return (
      <FinalForm
        onSubmit={handleStashSubmit}
        initialValues={{
          flavorId,
          maxMillipercent:
            usage?.[flavorId]?.maxMillipercent || maxMillipercent / 1000,
          minMillipercent:
            usage?.[flavorId]?.minMillipercent || minMillipercent / 1000
        }}
        render={({ handleSubmit, submitting }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <h3>Usage Range:</h3>
            <Form.Row>
              <Field name="minMillipercent">
                {({ input }) => (
                  <Form.Group as={Col}>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend">
                          Min
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control {...input} type="number" step="0.1" />
                      <InputGroup.Text>%</InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                )}
              </Field>
              <Field name="maxMillipercent">
                {({ input }) => (
                  <Form.Group as={Col}>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend">
                          Max
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control {...input} type="number" step="0.1" />
                      <InputGroup.Text>%</InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                )}
              </Field>
              <Field name="flavorId">
                {({ input }) => <Form.Control {...input} type="hidden" />}
              </Field>
            </Form.Row>
            <Form.Row>
              <Form.Group>
                <ButtonGroup>
                  <Button
                    className="button-animation"
                    variant="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    <FontAwesomeIcon icon="save" size="sm" />
                    &nbsp;<span>Save</span>
                  </Button>
                  <Button
                    onClick={(e) => handleStashEditor(false, e)}
                    className="button-animation button--cancel"
                    variant="danger"
                  >
                    <span>Cancel</span>
                  </Button>
                </ButtonGroup>
              </Form.Group>
            </Form.Row>
          </Form>
        )}
      />
    );
  };

  return (
    <Container>
      <Helmet title="Your Flavor Stash" />
      <Row className="text-center">
        <Col>
          <h1>Flavor Stash</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          {stash.map((flavor, index) => {
            const minMillipercent = flavor.minMillipercent / 1000;
            const maxMillipercent = flavor.maxMillipercent / 1000;
            const milliPercents = usage[flavor.flavorId]
              ? `${usage[flavor.flavorId].minMillipercent} - ${
                  usage[flavor.flavorId].maxMillipercent
                }`
              : `${minMillipercent} - ${maxMillipercent}`;

            return (
              <Card key={index} className="mb-1">
                <Card.Body
                  className="border-bottom cursor--pointer"
                  onClick={(e) => expandFlavor(flavor, e)}
                >
                  <Row>
                    <Col>
                      <h3
                        id={`flavor-${flavor.flavorId}`}
                        className={
                          expanded[flavor.flavorId] ? 'text--primary' : null
                        }
                      >
                        {expandIcon(Boolean(expanded[flavor.flavorId]))}{' '}
                        {flavor.Flavor.name} ({flavor.Flavor.Vendor.code})
                      </h3>
                    </Col>
                    {!expanded[flavor.flavorId] && (
                      <Col className="text-center">
                        <h4>
                          <strong>Use:</strong> {milliPercents}%
                        </h4>
                      </Col>
                    )}
                    <Col className="text-right">
                      <h5>Added: {date(flavor.created)}</h5>
                    </Col>
                  </Row>
                </Card.Body>

                {expanded[flavor.flavorId] && (
                  <Fragment>
                    <Card.Body>
                      <Card.Title>{flavor.Flavor.Vendor.name}</Card.Title>

                      <Row>
                        <Col>
                          <strong>Density:</strong>{' '}
                          {flavor.Flavor.density || 'Not Available'}
                        </Col>
                        <Col>
                          {editIcon(flavor.flavorId)} <strong>Use:</strong>{' '}
                          {milliPercents}%
                        </Col>
                      </Row>

                      {editingStash === flavor.flavorId
                        ? stashEditor(flavor)
                        : ''}
                      <hr />
                      <Note flavorId={flavor.flavorId} userId={flavor.userId} />
                    </Card.Body>
                    <Card.Footer>
                      <span className="float-left">ID: {flavor.flavorId}</span>
                      <span className="float-right">
                        {stashButton(
                          flavor.flavorId,
                          Boolean(!removed[flavor.flavorId])
                        )}
                      </span>
                    </Card.Footer>
                  </Fragment>
                )}
              </Card>
            );
          })}
          {!stash[0] && (
            <Col className="text-center">
              Navigate to{' '}
              <Link to="/flavors" title="Flavors">
                Flavors
              </Link>{' '}
              to add to your Flavor Stash.
            </Col>
          )}
        </Col>
      </Row>
    </Container>
  );
}
