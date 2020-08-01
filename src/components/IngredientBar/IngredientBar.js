import PropTypes from 'prop-types';
import React, { Fragment, useRef, useState, useCallback } from 'react';
import { ProgressBar, Tooltip, Overlay } from 'react-bootstrap';

export default function IngredientBar(props) {
  const [nicotineVisible, setNicotineVisible] = useState(false);
  const [flavorVisible, setFlavorVisible] = useState(false);
  const [vgVisible, setVgVisible] = useState(false);
  const [pgVisible, setPgVisible] = useState(false);
  const components = {
    nicotine: {
      ref: useRef(),
      getter: () => nicotineVisible,
      setter: setNicotineVisible
    },
    flavor: {
      ref: useRef(),
      getter: () => flavorVisible,
      setter: setFlavorVisible
    },
    vg: {
      ref: useRef(),
      getter: () => vgVisible,
      setter: setVgVisible
    },
    pg: {
      ref: useRef(),
      getter: () => pgVisible,
      setter: setPgVisible
    }
  };
  const setTooltipVisibility = useCallback(
    (name, value) => components[name].setter(value),
    [components]
  );
  const getTooltip = useCallback(
    (name) => {
      const { [name]: value } = props;
      const {
        [name]: {
          ref: { current: ref },
          getter
        }
      } = components;
      const show = getter();

      return (
        <Overlay target={ref} show={show} placement="top">
          <Tooltip id={`${name}-tooltip`}>{Math.round(value)}%</Tooltip>
        </Overlay>
      );
    },
    [components, props]
  );

  const { nicotine, flavor, vg, pg } = props;

  const nicotineLabel = nicotine > 5 ? `Nic (${Math.round(nicotine)}%)` : 'Nic';
  const flavorLabel = flavor > 5 ? `Flavor (${Math.round(flavor)}%)` : 'Flv';
  const vgLabel = vg > 5 ? `VG (${Math.round(vg)}%)` : 'VG';
  const pgLabel = pg > 5 ? `PG (${Math.round(pg)}%)` : 'PG';

  return (
    <Fragment>
      <ProgressBar className="ingredient-bar">
        <ProgressBar
          now={nicotine}
          variant="danger"
          label={nicotineLabel}
          ref={components.nicotine.ref}
          onMouseEnter={() => setTooltipVisibility('nicotine', true)}
          onMouseLeave={() => setTooltipVisibility('nicotine', false)}
        />
        <ProgressBar
          now={flavor}
          label={flavorLabel}
          ref={components.flavor.ref}
          onMouseEnter={() => setTooltipVisibility('flavor', true)}
          onMouseLeave={() => setTooltipVisibility('flavor', false)}
        />
        <ProgressBar
          now={vg}
          variant="success"
          label={vgLabel}
          ref={components.vg.ref}
          onMouseEnter={() => setTooltipVisibility('vg', true)}
          onMouseLeave={() => setTooltipVisibility('vg', false)}
        />
        <ProgressBar
          now={pg}
          variant="warning"
          label={pgLabel}
          ref={components.pg.ref}
          onMouseEnter={() => setTooltipVisibility('pg', true)}
          onMouseLeave={() => setTooltipVisibility('pg', false)}
        />
      </ProgressBar>
      {getTooltip('nicotine')}
      {getTooltip('flavor')}
      {getTooltip('vg')}
      {getTooltip('pg')}
    </Fragment>
  );
}

IngredientBar.propTypes = {
  nicotine: PropTypes.number.isRequired,
  flavor: PropTypes.number.isRequired,
  vg: PropTypes.number.isRequired,
  pg: PropTypes.number.isRequired
};

IngredientBar.defaultProps = {
  nicotine: 0,
  flavor: 0,
  vg: 0,
  pg: 0
};
