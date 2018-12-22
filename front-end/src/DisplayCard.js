import React, { Component } from 'react';

import './DisplayCard.css';

import ExpandCard from './ExpandCard.js';

class DisplayCard extends Component {
  state = {
    nearest: [],
  }
  showClosest = () => {
    this.setState({
      nearest: this.props.onFindClosest(this.props.id),
    });
  };
  render () {
    return (
      <div className="display-card-container">
        <div
          className="display-card"
          onClick={(event) => this.showClosest() }
        >
          <img className="display-card-img" src={ this.props.imgLink } alt='broken' />
          <div className="display-card-text-container">
            <a
              href={this.props.productLink}
              target="_blank"
              rel="noopener noreferrer"
              className="display-card-text-title"
            >
              { this.props.name }
            </a>
            <p className="display-card-text-price">{ this.props.price }</p>
          </div>
        </div>

        <div className="similar-expension-container">
          <ExpandCard
            nearest={this.state.nearest}
          />
        </div>
      </div>
    );
  }
}

export default DisplayCard
