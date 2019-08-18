import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { InputGroup, ProgressBar, FormControl } from 'react-bootstrap';

export default class SplitSlider extends Component {
  static propTypes = {
    tickInterval: PropTypes.number.isRequired,
    leftLabel: PropTypes.string.isRequired,
    rightLabel: PropTypes.string.isRequired
  };

  static defaultProps = {
    tickInterval: 5,
    leftLabel: 'PG',
    rightLabel: 'VG'
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.state = { value: 50 };
  }

  get leftValue() {
    return this.state.value;
  }

  get rightValue() {
    return 100 - this.state.value;
  }

  handleChange(event) {
    const {
      target: { name, value }
    } = event;

    const intValue = parseInt(value, 10);

    if (!intValue || intValue < 0 || intValue > 100) {
      return;
    }

    this.setState({
      value: name === 'left' ? intValue : Math.max(0, 100 - intValue)
    });
  }

  render() {
    const { leftLabel, rightLabel } = this.props;

    return (
      <InputGroup className="split-slider">
        <ProgressBar>
          <ProgressBar
            key={1}
            variant="warning"
            label={leftLabel}
            now={this.leftValue}
          />
          <ProgressBar
            key={2}
            variant="success"
            label={rightLabel}
            now={this.rightValue}
          />
        </ProgressBar>
        <FormControl
          name="left"
          value={this.leftValue}
          onChange={this.handleChange}
        />
        <FormControl
          name="right"
          value={this.rightValue}
          onChange={this.handleChange}
        />
      </InputGroup>
    );
  }
}
