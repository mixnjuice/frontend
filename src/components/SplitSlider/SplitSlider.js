import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { InputGroup, ProgressBar, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

    this.progressRef = React.createRef();
    this.state = { value: 50, dragging: false };
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
