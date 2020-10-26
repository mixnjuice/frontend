import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import unified from 'unified';
import parse from 'remark-parse';
import remark2react from 'remark-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Button, ButtonGroup, Col, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { actions as noteActions } from 'reducers/note';
import { getFlavorNote, isLoading } from 'selectors/note';

export default function Note({ flavorId, userId }) {
  Note.propTypes = {
    flavorId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired
  };

  const dispatch = useDispatch();
  const loading = useSelector(isLoading);
  const note = useSelector(getFlavorNote);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    dispatch(noteActions.requestNote({ flavorId }));
  }, [dispatch]);

  const handleToggleEditing = () => {
    setEditing(!editing);
  };

  const addNoteIcon = (id) => {
    return (
      <Fragment>
        {!editing && (
          <Button
            className="button-animation"
            size="sm"
            onClick={() => handleToggleEditing(id)}
          >
            <FontAwesomeIcon icon="plus" size="sm" title="Add Flavor Note" />
          </Button>
        )}
      </Fragment>
    );
  };

  const editNoteIcon = (id) => {
    return (
      <Fragment>
        {!editing && (
          <Button
            className="button-animation"
            size="sm"
            onClick={() => handleToggleEditing(id)}
          >
            <FontAwesomeIcon icon="pen" size="sm" title="Edit Flavor Note" />
          </Button>
        )}
      </Fragment>
    );
  };

  const handleNoteSubmit = (values) => {
    const { update } = values;
    const noteEdit = values.note;

    if (!noteEdit) {
      dispatch(noteActions.deleteNote(values));
    } else if (update === true) {
      dispatch(noteActions.updateNote(values));
    } else {
      dispatch(noteActions.createNote(values));
    }

    handleToggleEditing();
  };

  const noteEditor = () => {
    const update = Boolean(note?.[flavorId]?.note);

    return (
      <FinalForm
        onSubmit={handleNoteSubmit}
        initialValues={{
          flavorId,
          note: note?.[flavorId]?.note,
          update,
          userId
        }}
        render={({ handleSubmit, submitting, values }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Row>
              <Field name="note">
                {({ input }) => (
                  <Form.Group as={Col}>
                    <InputGroup>
                      <Form.Control
                        {...input}
                        as="textarea"
                        placeholder="Flavor Note"
                        rows="10"
                      />
                    </InputGroup>
                  </Form.Group>
                )}
              </Field>
            </Form.Row>
            {values?.note ? (
              <Form.Row>
                <h4>Preview:</h4>
                <Col md="12">
                  {
                    /* eslint-disable-next-line no-sync */
                    unified()
                      .use(parse)
                      .use(remark2react)
                      .processSync(values.note).result
                  }
                </Col>
              </Form.Row>
            ) : null}
            <Field name="userId">
              {({ input }) => <Form.Control {...input} type="hidden" />}
            </Field>
            <Field name="flavorId">
              {({ input }) => <Form.Control {...input} type="hidden" />}
            </Field>
            <Field name="update">
              {({ input }) => <Form.Control {...input} type="hidden" />}
            </Field>
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
                    onClick={(e) => handleToggleEditing(false, e)}
                    className="button-animation button--cancel"
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

  if (loading !== flavorId) {
    return (
      <Fragment>
        <h3>
          {note[flavorId] ? editNoteIcon(flavorId) : addNoteIcon(flavorId)}{' '}
          Flavor Notes
        </h3>
        {!editing && note[flavorId] ? (
          <Fragment>
            {
              /* eslint-disable-next-line no-sync */
              unified()
                .use(parse)
                .use(remark2react)
                .processSync(note[flavorId].note).result
            }
          </Fragment>
        ) : null}
        {editing ? noteEditor() : null}
      </Fragment>
    );
  } else {
    return <Fragment>Loading...</Fragment>;
  }
}
