import React from 'react';

export default class SearchBox extends React.Component {
  componentDidMount() {
    docsearch({
      apiKey: 'be76fcb7f3c958d6058ed6410d997522',
      indexName: 'jss',
      inputSelector: '#search-input',
      debug: false,
    });
  }
  render() {
    return (
      <form className="bd-search d-flex align-items-center">
        <input
          type="search"
          className="form-control"
          id="search-input"
          placeholder="Search..."
          aria-label="Search for..."
          autoComplete="off"
        />
        <button
          className="btn btn-link bd-search-docs-toggle d-md-none p-0 ml-3"
          type="button"
          data-toggle="collapse"
          data-target="#bd-docs-nav"
          aria-controls="bd-docs-nav"
          aria-expanded="false"
          aria-label="Toggle docs navigation"
        />
      </form>
    );
  }
}
