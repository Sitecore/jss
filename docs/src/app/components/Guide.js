import React from 'react';
import ReactDOM from 'react-dom';
import { Text, Link, withSitecoreContext, getFieldValue } from '@sitecore-jss/sitecore-jss-react';
import RouteLinkedRichText from './RouteLinkedRichText';

class Guide extends React.Component {
  componentDidMount() {
    this.highlightBlocks();
  }

  componentDidUpdate() {
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
    const toc = getFieldValue(fields, "toc", '').trim();

    return (
      <React.Fragment>
        <h1>
          <Text field={sitecoreContext.route.fields.title} />
        </h1>
        {toc && <section className="toc-container">
          <div class="title">In this guide</div>
          <RouteLinkedRichText tag="div" field={fields.toc} />
        </section>}
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

export default withSitecoreContext()(Guide);
