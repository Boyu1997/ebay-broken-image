import React, { Component } from 'react';

import './ExpandCard.css';

class ExpandCard extends Component {
  state = {
    nearest: [],
  }
  componentWillReceiveProps(newProps) {
    this.setState({ nearest: newProps.nearest });
  }
  render () {
    return (
      <div className="expand-card-container">
        <div
          className="expand-card"
          onClick={(event) => this.setState({ nearest: []})}
        >
          {this.state.nearest.map((n) => (
            <div key={n.id} >
              <img className="display-card-img" src={n.img_link} alt='broken' />
              <div className="display-card-text-container">
                <p className="display-card-text-price">Distance from selected: {n.distance.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ExpandCard
