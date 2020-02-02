import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Table, OverlayTrigger, Tooltip } from 'react-bootstrap';

export default class RecipeComponents extends Component {
  static propTypes = {
    components: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        density: PropTypes.number,
        percentage: PropTypes.number,
        mililiters: PropTypes.number,
        grams: PropTypes.number
      })
    ).isRequired
  };

  renderTooltip(density) {
    return <Tooltip>{density.toFixed(2)} g/ml</Tooltip>;
  }

  render() {
    const { components } = this.props;

    if (!Array.isArray(components) || components.length === 0) {
      return null;
    }

    const totalMl = components.reduce((acc, curr) => acc + curr.mililiters, 0);
    const totalGrams = components.reduce((acc, curr) => acc + curr.grams, 0);

    return (
      <Table>
        <thead>
          <tr>
            <th>Component</th>
            <th>%</th>
            <th>ml</th>
            <th>g</th>
          </tr>
        </thead>
        <tbody>
          {components.map(component => (
            <tr key={component.name}>
              <td>{component.name}</td>
              <td>
                {component.percentage % 1 !== 0
                  ? component.percentage.toPrecision(2)
                  : Math.round(component.percentage)}
                %
              </td>
              <td>{component.mililiters.toFixed(2)} ml</td>
              <td>
                <OverlayTrigger
                  placement="left"
                  overlay={this.renderTooltip(component.density)}
                >
                  <span>{component.grams.toFixed(2)} g</span>
                </OverlayTrigger>
              </td>
            </tr>
          ))}
          <tr className="font-weight-bold">
            <td className="bt-2">Total</td>
            <td className="bt-2">100%</td>
            <td className="bt-2">{Math.round(totalMl)} ml</td>
            <td className="bt-2">{totalGrams.toFixed(2)} g</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}
