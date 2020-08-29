import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Button, Col, Container, Row, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const seekLocations = {
  FIRST: 'First',
  LAST: 'Last',
  NEXT: 'Next',
  PREV: 'Previous'
};

export const pagination = (WrappedComponent) =>
  class extends Component {
    static displayName = 'Pagination';
    static propTypes = {
      actions: PropTypes.shape({
        action: PropTypes.func.isRequired
      }).isRequired,
      collection: PropTypes.array.isRequired,
      pager: PropTypes.object.isRequired
    };

    constructor(props) {
      super(props);

      const { pager } = this.props;

      this.state = {
        limit: pager.limit,
        page: pager.page
      };
      this.changePage = this.changePage.bind(this);
      this.changeLimit = this.changeLimit.bind(this);
      this.requestPage = debounce(this.requestPage.bind(this), 250);
      this.handleSeek = this.handleSeek.bind(this);
    }

    componentDidMount() {
      this.requestPage();
    }

    get pagerCounter() {
      const { pages } = this.props.pager;

      return [...Array(pages).keys()].map((value) => value + 1);
    }

    changePage(page) {
      const {
        target: { value }
      } = page;

      this.setState({ page: parseInt(value, 10) }, this.requestPage);
    }

    changeLimit(limit) {
      const {
        target: { value }
      } = limit;

      this.setState({ limit: parseInt(value, 10) }, this.requestPage);
    }

    handleSeek(location) {
      const { pages } = this.props.pager;
      const { page: currentPage } = this.state;

      let page;

      switch (location) {
        case seekLocations.FIRST:
        default:
          page = 1;
          break;
        case seekLocations.LAST:
          page = pages;
          break;
        case seekLocations.NEXT:
          page = Math.min(currentPage + 1, pages);
          break;
        case seekLocations.PREV:
          page = Math.max(currentPage - 1, 1);
          break;
      }

      this.setState({ page }, this.requestPage);
    }

    requestPage() {
      const { actions, pager } = this.props;
      const { limit, page } = this.state;

      actions.action({ ...pager, limit, page });
    }

    get navigation() {
      return (
        <Row className="pager pb-2">
          <Col xs={{ offset: 6, size: 3 }} className="text-right">
            <FormControl
              className="pager-limit"
              type="number"
              min="20"
              max="200"
              step="20"
              onChange={this.changeLimit}
              value={this.state.limit}
            />{' '}
            rows per page
          </Col>
          <Col xs={3} className="text-right">
            <Button
              size="sm"
              onClick={() => this.handleSeek(seekLocations.FIRST)}
            >
              <FontAwesomeIcon icon="angle-double-left" />
            </Button>
            <Button
              size="sm"
              onClick={() => this.handleSeek(seekLocations.PREV)}
            >
              <FontAwesomeIcon icon="angle-left" />
            </Button>
            <FormControl
              className="pager-page"
              type="number"
              min={1}
              max={this.state.page}
              step={1}
              onChange={this.changePage}
              value={this.state.page}
            />
            <Button
              size="sm"
              onClick={() => this.handleSeek(seekLocations.NEXT)}
            >
              <FontAwesomeIcon icon="angle-right" />
            </Button>
            <Button
              size="sm"
              onClick={() => this.handleSeek(seekLocations.LAST)}
            >
              <FontAwesomeIcon icon="angle-double-right" />
            </Button>
          </Col>
        </Row>
      );
    }

    render() {
      const { collection, pager } = this.props;

      return (
        <WrappedComponent
          collection={collection}
          pager={pager}
          pagerNavigation={this.navigation}
          {...this.props}
        />
      );
    }
  };

export const mapStateToProps = (dataSelector, pagerSelector) => (state) => ({
  collection: dataSelector(state),
  pager: pagerSelector(state)
});

export const mapDispatchToProps = (action) => (dispatch) => ({
  actions: bindActionCreators({ action }, dispatch)
});

export const withPagination = (action, dataSelector, pagerSelector) => (
  WrappedComponent
) =>
  connect(
    mapStateToProps(dataSelector, pagerSelector),
    mapDispatchToProps(action)
  )(pagination(WrappedComponent));

export default withPagination;

export class PagerInfo extends Component {
  static propTypes = {
    contentType: PropTypes.string.isRequired,
    pager: PropTypes.object.isRequired
  };

  render() {
    const {
      contentType,
      pager: { count, pages }
    } = this.props;

    return (
      <Container fluid>
        <Row>
          <Col>
            {count} {contentType}
          </Col>
          <Col className="text-right">{pages} Pages</Col>
        </Row>
      </Container>
    );
  }
}
