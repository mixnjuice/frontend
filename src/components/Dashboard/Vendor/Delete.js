import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { Button, Form } from 'react-bootstrap';
import {
  DashboardLink as DashLink,
  DashboardLayout as Layout
} from 'components/Dashboard/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { actions as vendorsActions } from 'reducers/vendor';
import { actions as dashActions } from 'reducers/dashboard';

export class VendorDelete extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    layoutOptions: PropTypes.object.isRequired,
    vendorId: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { actions, vendorId, name } = this.props;

    actions.deleteVendor({ vendorId, name });
    actions.selectDashboard({ name: 'Vendors' });
  }

  render() {
    const { name, layoutOptions } = this.props;

    return (
      <Layout
        pageTitle="Delete Vendor - Dashboard"
        header={`Vendors > Delete Vendor > ${name}`}
        options={layoutOptions}
      >
        <FontAwesomeIcon icon="chevron-left" /> &nbsp;
        <DashLink to="#vendors" name="Vendors">
          <span>Back</span>
        </DashLink>
        <FinalForm
          onSubmit={this.handleSubmit}
          render={({ handleSubmit, submitting }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Delete</Form.Label>
                <h3>Delete Vendor: {name}?</h3>
              </Form.Group>
              <Button
                className="button-animation"
                variant="primary"
                type="submit"
                disabled={submitting}
              >
                <span>Delete</span>
              </Button>
            </Form>
          )}
        />
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...vendorsActions,
      ...dashActions
    },
    dispatch
  )
});

export default connect(null, mapDispatchToProps)(VendorDelete);
