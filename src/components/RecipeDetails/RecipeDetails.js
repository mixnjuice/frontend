import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function RecipeDetails({
  maxVg,
  percentVg,
  shakeAndVape,
  steepDays,
  flavors
}) {
  const percentPg = 100 - percentVg;
  const flavorTotal = flavors.reduce((accum, current) => {
    return accum + current.percent;
  }, 0);

  return (
    <Table striped bordered>
      <caption className="text-center">
        {maxVg ? (
          <span>Max VG |&nbsp;</span>
        ) : (
          <span>
            {percentPg}% PG / {percentVg}% VG |&nbsp;
          </span>
        )}
        {shakeAndVape ? (
          <span>Shake &amp; Vape |&nbsp;</span>
        ) : (
          <span>Steep for {steepDays} days |&nbsp;</span>
        )}
        <span>Flavor total: {flavorTotal}%</span>
      </caption>
      <thead>
        <tr>
          <th>Flavor</th>
          <th>Percent</th>
          <th>Stash</th>
        </tr>
      </thead>
      <tbody>
        {flavors.map((flavor, index) => (
          <tr key={index}>
            <td>
              <a href={'/flavor?id=' + flavor.id}>
                {flavor.abbreviation} {flavor.name}
              </a>
            </td>
            <td>{flavor.percent.toFixed(1)}%</td>
            <td>
              {flavor.inStash ? (
                <FontAwesomeIcon icon={['far', 'check-square']} />
              ) : (
                <FontAwesomeIcon icon={['far', 'square']} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

RecipeDetails.defaultProps = {
  maxVg: false,
  percentVg: 50,
  shakeAndVape: false,
  steepDays: 0,
  flavors: []
};

RecipeDetails.propTypes = {
  maxVg: PropTypes.bool.isRequired,
  percentVg: PropTypes.number.isRequired,
  shakeAndVape: PropTypes.bool.isRequired,
  steepDays: PropTypes.number.isRequired,
  flavors: PropTypes.arrayOf(PropTypes.object).isRequired
};
