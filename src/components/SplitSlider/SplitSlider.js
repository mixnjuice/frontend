import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { InputGroup, ProgressBar, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class SplitSlider extends Component {
  static propTypes = {
    tickInterval: PropTypes.number.isRequired,
    leftLabel: PropTypes.string.isRequired,
    rightLabel: PropTypes.string.isRequired,
    initialValue: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    value: 50,
    tickInterval: 5,
    leftLabel: 'VG',
    rightLabel: 'PG'
  };

  constructor(props) {
    super(props);

    this.progressRef = React.createRef();
    this.state = { value: this.props.initialValue, dragging: false };
    this.emptyCanvas = document.createElement('canvas');
    this.handleDrag = this.handleDrag.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
  }

  get leftValue() {
    return this.state.value;
  }

  get rightValue() {
    return Math.max(0, 100 - this.state.value);
  }

  handleChange(event) {
    const {
      target: { name: targetName, value: rawValue }
    } = event;
    const { onChange, name } = this.props;
    const { value: currentValue } = this.state;

    const intValue = parseInt(rawValue, 10);

    if (intValue === false || intValue < 0 || intValue > 100) {
      return;
    }

    const value =
      targetName === 'left' ? intValue : Math.max(0, 100 - intValue);

    if (value !== currentValue) {
      this.setState({ value });
      onChange({
        target: { name, value }
      });
    }
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
    const quantized = Math.round(percentage / tickInterval) * tickInterval;
    const clamped = Math.min(100, Math.max(0, quantized));

    this.handleChange({
      target: {
        name: 'left',
        value: clamped
      }
    });
  }

  handleReset() {
    this.setState({
      value: 50
    });
  }

  handleDragStart(event) {
    event.dataTransfer.setDragImage(this.emptyCanvas, 0, 0);
    event.persist();
    this.setState(
      {
        dragging: true
      },
      () => {
        this.handleClick(event);
      }
    );
  }

  handleDrag(event) {
    const { dragging } = this.state;

    if (!dragging) {
      return;
    }

    event.persist();
    this.handleClick(event);
  }

  handleDragEnter(event) {
    event.dataTransfer.dropEffect = 'move';
  }

  handleDragEnd(event) {
    event.persist();
    this.handleClick(event);
    this.setState({
      dragging: false
    });
  }

  render() {
    const { leftLabel, rightLabel } = this.props;

    return (
      <InputGroup className="split-slider">
        <div className="progress-container" ref={this.progressRef}>
          <ProgressBar
            draggable
            onClick={this.handleClick}
            onDrag={this.handleDrag}
            onDragEnd={this.handleDragEnd}
            onDragStart={this.handleDragStart}
            onDragEnter={this.handleDragEnter}
            onDragOver={event => event.preventDefault()}
          >
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
        <InputGroup.Append>
          <Button onClick={this.handleReset}>
            <FontAwesomeIcon icon="undo" size="sm" />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }
}
