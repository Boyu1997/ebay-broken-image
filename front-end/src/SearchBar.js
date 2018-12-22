import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './SearchBar.css';

class DisplayCard extends Component {
  // state = {
  //   nearest: [],
  // }
  // showClosest = () => {
  //   this.setState({
  //     nearest: this.props.onFindClosest(this.props.id),
  //   });
  // };
  render () {
    return (
      <div className="search-bar-container">
        <div style={{width: '9%', height: '48px'}}></div>
        <div style={{width: '20%', height: '48px', lineHeight: '48px'}}>
            <a href="https://github.com/Boyu1997/ebay-broken-image" target="_blank" className="search-bar-title">eBay-broken-image</a>
        </div>
        <div className="search-box-container">
          <input placeholder="input search text" className="search-box-input" type="text" />
          <select className="search-box-model-selector">
            <option value="disabled" disabled>Select Model...</option>
            <option value="pool_5">Model 1</option>
            <option value="none">Model 2</option>
            <option value="pool_4">Model 3</option>
            <option value="pool_3">Model 4</option>
          </select>
          <button type="button" className="search-box-button">
            <span>Search</span>
          </button>
        </div>
      </div>
    );
  }
}

export default DisplayCard
