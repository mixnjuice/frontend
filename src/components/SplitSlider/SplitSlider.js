import PropTypes from 'prop-types';
import React, { useRef, useState, useCallback } from 'react';
import { InputGroup, ProgressBar, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SplitSlider({
  tickInterval,
  leftLabel,
  rightLabel,
  initialValue,
  name,
  onChange
}) {
  const progressRef = useRef();
  const [value, setValue] = useState(initialValue);
  const [dragging, setDragging] = useState(false);
  const emptyCanvas = document.createElement('canvas');
  const handleChange = useCallback(
    (event) => {
      const {
        target: { name: targetName, value: rawValue }
      } = event;

      const intValue = parseInt(rawValue, 10);

      if (intValue === false || intValue < 0 || intValue > 100) {
        return;
      }

      const newValue =
        targetName === 'left' ? intValue : Math.max(0, 100 - intValue);

      if (newValue !== value) {
        setValue(newValue);
        onChange({
          target: { name, value: newValue }
        });
      }
    },
    [value, name, onChange]
  );
  const handleClick = useCallback(
    (event) => {
      const {
        nativeEvent: { screenX }
      } = event;
      const rect = progressRef.current.getBoundingClientRect();
      const percentage = ((screenX - rect.left) / rect.width) * 100;
      const quantized = Math.round(percentage / tickInterval) * tickInterval;
      const clamped = Math.min(100, Math.max(0, quantized));

      handleChange({
        target: {
          name: 'left',
          value: clamped
        }
      });
    },
    [progressRef, tickInterval, handleChange]
  );
  const handleReset = useCallback(() => setValue(50), [setValue]);
  const handleDragStart = useCallback(
    (event) => {
      event.dataTransfer.setDragImage(emptyCanvas, 0, 0);
      event.persist();
      setDragging(true);
      handleClick(event);
    },
    [setDragging, handleClick, emptyCanvas]
  );
  const handleDrag = useCallback(
    (event) => {
      if (!dragging) {
        return;
      }

      event.persist();
      handleClick(event);
    },
    [handleClick, dragging]
  );
  const handleDragEnter = useCallback((event) => {
    event.dataTransfer.dropEffect = 'move';
  }, []);
  const handleDragEnd = useCallback(
    (event) => {
      event.persist();
      handleClick(event);
      setDragging(false);
    },
    [handleClick, setDragging]
  );

  const leftValue = value;
  const rightValue = Math.max(0, 100 - leftValue);

  return (
    <InputGroup className="split-slider">
      <div className="progress-container" ref={progressRef}>
        <ProgressBar
          draggable
          onClick={handleClick}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          onDragEnter={handleDragEnter}
          onDragOver={(event) => event.preventDefault()}
        >
          <ProgressBar
            key={1}
            variant="success"
            label={leftLabel}
            now={leftValue}
          />
          <ProgressBar
            key={2}
            variant="warning"
            label={rightLabel}
            now={rightValue}
          />
        </ProgressBar>
      </div>
      <FormControl name="left" value={leftValue} onChange={handleChange} />
      <FormControl name="right" value={rightValue} onChange={handleChange} />
      <InputGroup.Append>
        <Button onClick={handleReset}>
          <FontAwesomeIcon icon="undo" size="sm" />
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
}

SplitSlider.defaultProps = {
  value: 50,
  tickInterval: 5,
  leftLabel: 'VG',
  rightLabel: 'PG'
};

SplitSlider.propTypes = {
  tickInterval: PropTypes.number.isRequired,
  leftLabel: PropTypes.string.isRequired,
  rightLabel: PropTypes.string.isRequired,
  initialValue: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
