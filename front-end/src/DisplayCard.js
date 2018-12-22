import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './DisplayCard.css';

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
          <img className="display-card-img" src={ this.props.imgLink } />
          <div className="display-card-text-container">
            <a href={this.props.productLink} target="_blank" className="display-card-text-title">{ this.props.name }</a>
            <p className="display-card-text-price">{ this.props.price }</p>
          </div>
        </div>

        <div className="similar-expension-container">
        {this.state.nearest.map((n) => (
          <DisplayCard
            key={n.id}
            id={n.id}
            imgLink={n.img_link}
            name={n.name}
            productLink={n.product_link}
            price={n.price}
          />

        ))}
        </div>
      </div>
    );
  }
}

export default DisplayCard

// <section class="image-grid">
//     <article class="image__cell" id="expand-jump-1">
//       <div class="image--basic">
//         <a href="#expand-jump-1">
//             <img class="basic__img" src="http://lorempixel.com/250/250/fashion/1" alt="Fashion 1" />
//         </a>
//         <div class="arrow--up"></div>
//       </div>
//       <div class="image--expand">
//         <a href="#close-jump-1" class="expand__close"></a>
//           <img class="image--large" src="http://lorempixel.com/400/400/fashion/1" alt="Fashion 1" />
//       </div>
//     </article>
// </section>
