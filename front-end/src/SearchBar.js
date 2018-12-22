import React, { Component } from 'react';

import './SearchBar.css';

class DisplayCard extends Component {
  state = {
    keyword: "",
    modelVersion: "pool_5",
  }
  render () {
    return (
      <div className="search-bar-container">
        <div style={{width: '9%', height: '48px'}}></div>
        <div style={{width: '20%', height: '48px', lineHeight: '48px'}}>
            <a
              href="https://github.com/Boyu1997/ebay-broken-image"
              target="_blank"
              rel="noopener noreferrer"
              className="search-bar-title"
            >
              eBay-broken-image
            </a>
        </div>
        <div className="search-box-container">
          <input
            placeholder="input search text (default: hat)"
            className="search-box-input"
            type="text"
            value={this.state.keyword}
            onChange={(event) => this.setState({ keyword:event.target.value })}
          />
          <select
            className="search-box-model-selector"
            value={this.state.modelVersion}
            onChange={(event) => this.setState({ modelVersion:event.target.value })}
          >
            <option value="disabled" disabled>Select Model...</option>
            <option value="pool_5">Model 1</option>
            <option value="none">Model 2</option>
            <option value="pool_4">Model 3</option>
            <option value="pool_3">Model 4</option>
          </select>
          <button
            type="button"
            className="search-box-button"
            onClick={(event) => this.props.onSearchQuery(this.state.keyword, this.state.modelVersion)}
          >
            <span>Search</span>
          </button>
        </div>
      </div>
    );
  }
}

export default DisplayCard
