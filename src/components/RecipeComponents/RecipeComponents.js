import PropTypes from 'prop-types';
import React from 'react';
import { Table, OverlayTrigger, Tooltip } from 'react-bootstrap';

export default function RecipeComponents({ components }) {
  if (!Array.isArray(components) || components.length === 0) {
    return null;
  }

  const totalMl = components.reduce((acc, curr) => acc + curr.milliliters, 0);
  const totalGrams = components.reduce((acc, curr) => acc + curr.grams, 0);

  return (
    <Table striped>
      <thead>
        <tr>
          <th>Component</th>
          <th className="text-right">%</th>
          <th className="text-right">mL</th>
          <th className="text-right">g</th>
        </tr>
      </thead>
      <tbody>
        {components.map((component) => (
          <tr key={component.name}>
            <td>{component.name}</td>
            <td className="text-right">
              {component.percentage % 1 !== 0
                ? component.percentage.toPrecision(2)
                : Math.round(component.percentage)}
              %
            </td>
            <td className="text-right">{component.milliliters.toFixed(2)}</td>
            <td className="text-right">
              <OverlayTrigger
                placement="left"
                overlay={<Tooltip>{component.density.toFixed(2)} g/mL</Tooltip>}
              >
                <span>{component.grams.toFixed(2)}</span>
              </OverlayTrigger>
            </td>
          </tr>
        ))}
        <tr className="font-weight-bold">
          <td className="bt-2">Total</td>
          <td className="bt-2 text-right">100%</td>
          <td className="bt-2 text-right">{totalMl.toFixed(2)} mL</td>
          <td className="bt-2 text-right">{totalGrams.toFixed(2)} g</td>
        </tr>
      </tbody>
    </Table>
  );
}

RecipeComponents.propTypes = {
  components: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      density: PropTypes.number,
      percentage: PropTypes.number,
      milliliters: PropTypes.number,
      grams: PropTypes.number
    })
  ).isRequired
};
