import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
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
    if (typeof hljs !== undefined) {
      // eslint-disable-next-line react/no-find-dom-node
      const container = ReactDOM.findDOMNode(this);
      container.querySelectorAll('pre code').forEach((el) => hljs.highlightBlock(el));
    }
  }

  render() {
    return (
      <RouteLinkedRichText
        tag="div"
        field={this.props.fields.text}
        className="article markdown-section"
      />
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

export default Article;
