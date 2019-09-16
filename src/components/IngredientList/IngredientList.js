import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Table, InputGroup, Form } from 'react-bootstrap';

export default class IngredientList extends Component {
  static propTypes = {
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        vendor: PropTypes.object.isRequired,
        percentage: PropTypes.number.isRequired
      })
    ).isRequired,
    onRemoveClick: PropTypes.func
  };

  static defaultProps = {
    ingredients: []
  };

  constructor(props) {
    super(props);

    this.handlePercentChange = this.handlePercentChange.bind(this);
  }

  handlePercentChange(event) {
    const { ingredients } = this.props;
    const {
      target: { name, value }
    } = event;

    const toUpdate = ingredients.find(ingredient => ingredient.id === name);

    if (toUpdate) {
      toUpdate.millipercent = value;
    }
  }

  render() {
    const { ingredients, onRemoveClick } = this.props;

    return (
      <Table borderless>
        <tbody>
          {ingredients.map(ingredient => (
            <tr key={ingredient.id}>
              <td>
                {ingredient.vendor.name} {ingredient.name}
              </td>
              <td className="recipe-percent">
                <InputGroup>
                  <Form.Control
                    step="0.1"
                    name={ingredient.id}
                    type="number"
                    value={ingredient.percentage}
                    onChange={this.handlePercentChange}
                    placeholder="0"
                    required
                  />
                  <InputGroup.Append>
                    <InputGroup.Text>%</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </td>
              <td>
                <Button className="button-animation" onClick={onRemoveClick}>
                  <FontAwesomeIcon icon="trash" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}
