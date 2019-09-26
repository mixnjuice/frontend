import PropTypes from 'prop-types';
import React, { Component, Fragment, createRef } from 'react';
import { ProgressBar, Tooltip, Overlay } from 'react-bootstrap';

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

  constructor(props) {
    super(props);

    this.refList = {
      nicotine: createRef(),
      flavor: createRef(),
      vg: createRef(),
      pg: createRef()
    };
    this.state = {
      nicotine: false,
      flavor: false,
      vg: false,
      pg: false
    };
    this.toggleTooltipVisibility = this.toggleTooltipVisibility.bind(this);
  }

  toggleTooltipVisibility(name) {
    this.setState({
      [name]: !this.state[name]
    });
  }

  tooltip(name) {
    const { [name]: show } = this.state;
    const { [name]: value } = this.props;
    const {
      [name]: { current: ref }
    } = this.refList;

    return (
      <Overlay target={ref} show={show} placement="top">
        <Tooltip id={`${name}-tooltip`}>{Math.round(value)}%</Tooltip>
      </Overlay>
    );
  }

  render() {
    const { nicotine, flavor, vg, pg } = this.props;

    return (
      <Fragment>
        <ProgressBar className="ingredient-bar">
          <ProgressBar
            label="Nic"
            now={nicotine}
            name="nicotine"
            variant="danger"
            ref={this.refList.nicotine}
            onMouseEnter={() => this.toggleTooltipVisibility('nicotine')}
            onMouseLeave={() => this.toggleTooltipVisibility('nicotine')}
          />
          <ProgressBar
            now={flavor}
            label="Flv"
            ref={this.refList.flavor}
            onMouseEnter={() => this.toggleTooltipVisibility('flavor')}
            onMouseLeave={() => this.toggleTooltipVisibility('flavor')}
          />
          <ProgressBar
            variant="success"
            now={vg}
            label="VG"
            ref={this.refList.vg}
            onMouseEnter={() => this.toggleTooltipVisibility('vg')}
            onMouseLeave={() => this.toggleTooltipVisibility('vg')}
          />
          <ProgressBar
            variant="warning"
            now={pg}
            label="PG"
            ref={this.refList.pg}
            onMouseEnter={() => this.toggleTooltipVisibility('pg')}
            onMouseLeave={() => this.toggleTooltipVisibility('pg')}
          />
        </ProgressBar>
        {this.tooltip('nicotine')}
        {this.tooltip('flavor')}
        {this.tooltip('vg')}
        {this.tooltip('pg')}
      </Fragment>
    );
  }
}
