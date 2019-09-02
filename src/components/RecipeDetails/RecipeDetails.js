import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class RecipeDetails extends Component {
  static propTypes = {
    maxVG: PropTypes.bool.isRequired,
    percentVG: PropTypes.number.isRequired,
    shakeAndVape: PropTypes.bool.isRequired,
    steepDays: PropTypes.number.isRequired,
    flavors: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  static defaultProps = {
    maxVG: false,
    percentVG: 50,
    shakeAndVape: false,
    steepDays: 0,
    flavors: []
  };

  render() {
    const { maxVG, shakeAndVape, steepDays, flavors, percentVG } = this.props;
    const percentPG = 100 - percentVG;
    const flavorTotal = flavors.reduce((accum, current) => {
      return accum + current.percent;
    }, 0);

    return (
      <Table striped bordered>
        <caption className="text-center">
          {maxVG ? (
            <span>Max VG |&nbsp;</span>
          ) : (
            <span>
              {percentPG}% PG / {percentVG}% VG |&nbsp;
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
}
