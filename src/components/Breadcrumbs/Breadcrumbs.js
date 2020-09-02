import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default function Breadcrumbs({ active, base, links }) {
  Breadcrumbs.propTypes = {
    base: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.object),
    active: PropTypes.string
  };

  const BasePath = () => {
    const Home = () => {
      return (
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
      );
    };

    switch (base) {
      case 'admin':
        return (
          <Fragment>
            <Home />
            <li className="breadcrumb-item">
              <Link to="/admin">Admin</Link>
            </li>
          </Fragment>
        );
      default:
        return <Home />;
    }
  };

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <BasePath />
        {links &&
          links.map((item, index) => {
            return (
              <li key={index} className="breadcrumb-item">
                <Link to={item.url}>{item.name}</Link>
              </li>
            );
          })}
        <li className="breadcrumb-item active" aria-current="page">
          <span className="active">{active}</span>
        </li>
      </ol>
    </nav>
  );
}
