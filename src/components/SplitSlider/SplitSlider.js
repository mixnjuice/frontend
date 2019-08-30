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
    leftLabel: 'VG',
    rightLabel: 'PG'
  };

  constructor(props) {
    super(props);

    this.state = { value: 50 };
    this.progressRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  handleClick(event) {
    const {
      progressRef: { current: progressRef },
      props: { tickInterval }
    } = this;
    const {
      nativeEvent: { screenX }
    } = event;
    const rect = progressRef.getBoundingClientRect();
    const percentage = ((screenX - rect.left) / rect.width) * 100;
    const quantized = Math.ceil(percentage / tickInterval) * tickInterval;

    this.handleChange({
      target: {
        name: 'left',
        value: quantized
      }
    });
  }

  render() {
    const { leftLabel, rightLabel } = this.props;

    return (
      <InputGroup className="split-slider">
        <div className="progress-container" ref={this.progressRef}>
          <ProgressBar onClick={this.handleClick}>
            <ProgressBar
              key={1}
              variant="success"
              label={leftLabel}
              now={this.leftValue}
            />
            <ProgressBar
              key={2}
              variant="warning"
              label={rightLabel}
              now={this.rightValue}
            />
          </ProgressBar>
        </div>
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
