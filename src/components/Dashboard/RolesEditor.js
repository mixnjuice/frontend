import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Form as FinalForm, Field } from 'react-final-form';
import { Button, Form, Modal } from 'react-bootstrap';

import { actions as rolesActions } from 'reducers/roles';
import { getAllRoles } from 'selectors/roles';

export class RolesEditor extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    roles: PropTypes.array,
    action: PropTypes.string,
    item: PropTypes.object,
    onHide: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.handleAddRoleSubmit = this.handleAddRoleSubmit.bind(this);
    this.handleUpdateRoleSubmit = this.handleUpdateRoleSubmit.bind(this);
  }

  handleAddRoleSubmit({ name }) {
    const { actions } = this.props;

    actions.addRole({ name });
  }

  handleUpdateRoleSubmit({ name }) {
    const { actions, item } = this.props;

    actions.updateRole({ id: item.id, name });
  }

  /*
  componentDidMount() {
    const { actions } = this.props;

    actions.requestRoles();
  }
  */
  render() {
    const { action } = this.props;

    switch (action) {
      case 'add':
      default:
        return (
          <Modal
            {...this.props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Create a Role
              </Modal.Title>
            </Modal.Header>
            <FinalForm
              onSubmit={this.handleAddRoleSubmit}
              render={({ handleSubmit, submitting }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Modal.Body>
                    <Field name="name" required="true">
                      {({ input, meta }) => (
                        <Form.Group>
                          <Form.Label>Role Name</Form.Label>
                          <Form.Control
                            {...input}
                            type="text"
                            placeholder="role name"
                            isInvalid={meta.error}
                          />
                          {meta.error && (
                            <Form.Control.Feedback type="invalid">
                              {meta.error === 'required'
                                ? 'This field is required'
                                : ''}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                      )}
                    </Field>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      className="button-animation"
                      variant="primary"
                      type="submit"
                      disabled={submitting}
                      onClick={this.props.onHide}
                    >
                      <span>Save</span>
                    </Button>
                    <Button variant="danger" onClick={this.props.onHide}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Form>
              )}
            />
          </Modal>
        );
    }
  }
}

const mapStateToProps = state => ({
  roles: getAllRoles(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...rolesActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RolesEditor);
