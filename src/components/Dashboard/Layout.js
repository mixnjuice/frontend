import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
export class Layout extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    header: PropTypes.string,
    options: PropTypes.object,
    pageTitle: PropTypes.string,
    subTitle: PropTypes.any
  };
  constructor(props) {
    super(props);
  }

  render() {
    const { children, header, options, pageTitle, subTitle } = this.props;

    return (
      <Card border={options.border} style={options.style}>
        <Helmet title={pageTitle} />
        {options.header && header && <Card.Header>{header}</Card.Header>}
        <Card.Body>
          {!options.header && options.title && header && (
            <Card.Title>{header}</Card.Title>
          )}
          {subTitle && <Card.Subtitle>{subTitle}</Card.Subtitle>}
          {children}
        </Card.Body>
      </Card>
    );
  }
}

export default Layout;
