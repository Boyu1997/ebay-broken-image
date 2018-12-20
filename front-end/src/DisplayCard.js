import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';

import { Card } from 'antd';

const { Meta } = Card;

class DisplayCard extends Component {
  render () {
    return (
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="Image" src={this.props.data.img_link} />}
      >
        <Meta
          title={this.props.data.name}
          description={this.props.data.price}
        />
      </Card>
    );
  }
}

export default DisplayCard
