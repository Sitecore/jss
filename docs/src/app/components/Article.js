import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Link, withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import RouteLinkedRichText from './RouteLinkedRichText';

class Article extends React.Component {
  componentDidMount() {
    this.highlightBlocks();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.highlightBlocks();
  }

  // enabling syntax highligher
  highlightBlocks() {
    if (typeof hljs !== 'undefined') {
      // eslint-disable-next-line react/no-find-dom-node
      const container = ReactDOM.findDOMNode(this);
      container.querySelectorAll('pre code').forEach((el) => hljs.highlightBlock(el));
    }
  }

  render() {
    const { fields, sitecoreContext } = this.props;

    return (
      <React.Fragment>
        <RouteLinkedRichText tag="div" field={fields.text} className="article markdown-section" />
        <hr />
        <div>
          Found a problem? Have something to add?&nbsp;
          <Link field={sitecoreContext.route.fields.editLink} />
        </div>
      </React.Fragment>
    );
  }
}

Article.propTypes = {
  fields: PropTypes.shape({
    text: PropTypes.shape({
      value: PropTypes.string,
      editable: PropTypes.string,
    }),
  }),
};

export default withSitecoreContext()(Article);
