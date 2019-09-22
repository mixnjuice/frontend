import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';

export default class IngredientList extends Component {
  static propTypes = {
    nicotine: PropTypes.number.isRequired,
    flavor: PropTypes.number.isRequired,
    vg: PropTypes.number.isRequired,
    pg: PropTypes.number.isRequired
  };

  static defaultProps = {
    nicotine: 0,
    flavor: 0,
    vg: 0,
    pg: 0
  };

  render() {
    const { nicotine, flavor, vg, pg } = this.props;

    return (
      <ProgressBar>
        <ProgressBar variant="danger" now={nicotine} label="Nic" />
        <ProgressBar now={flavor} label="Flv" />
        <ProgressBar variant="success" now={vg} label="VG" />
        <ProgressBar variant="warning" now={pg} label="PG" />
      </ProgressBar>
    );
  }
}
