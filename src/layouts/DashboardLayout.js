import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import React from 'react';
import { Card } from 'react-bootstrap';

export default function DashboardLayout({
  children,
  header,
  options,
  pageTitle,
  subTitle
}) {
  return (
    <Card border={options.border} style={options.style}>
      <Helmet title={pageTitle} />
      {options.header && header ? <Card.Header>{header}</Card.Header> : ''}
      <Card.Body>
        {!options.header && options.title && header ? (
          <Card.Title>{header}</Card.Title>
        ) : (
          ''
        )}
        {subTitle ? <Card.Subtitle>{subTitle}</Card.Subtitle> : ''}
        {children}
      </Card.Body>
    </Card>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.any.isRequired,
  header: PropTypes.string,
  options: PropTypes.object,
  pageTitle: PropTypes.string,
  subTitle: PropTypes.any
};
