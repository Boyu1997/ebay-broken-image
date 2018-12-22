import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './App.css';
import SearchBar from './SearchBar.js';
import DisplayCard from './DisplayCard.js';

import * as API from './API.js';

class App extends Component {
  state = {
    data: [],
    info: "",
    wait: "hidden",
  }
  searchQuery = (keyword, modelVersion) => {
    this.setState( {
      info: "hidden",
      wait: "",
    })
    API.search(keyword.trim(), modelVersion).then((payloads) => {
      console.log(payloads.data_set);
      this.setState({
        wait: "hidden",
        data: payloads,
      });
    })
  }

  findClosest = (id) => {
    var featureOfId = this.state.data[id].feature;
    var distanceFromId = [];
    this.state.data.map((d) => (
      distanceFromId.push(
        {
          "id": d.id,
          "distance": Math.pow(Math.pow((d.feature[0]-featureOfId[0]),2) +
                                        Math.pow((d.feature[1]-featureOfId[1]),2), 0.5)
        }
      )
    ));

    // sort by distance
    distanceFromId.sort(function(a, b) {
      return ((a['distance'] < b['distance']) ? -1 : ((a['distance'] > b['distance']) ? 1 : 0));
    });
    distanceFromId = distanceFromId.slice(1, 6);

    for (var i = 0; i < 5; i++) {
      distanceFromId[i]['img_link'] = this.state.data[distanceFromId[i]['id']]['img_link'];
      distanceFromId[i]['name'] = this.state.data[distanceFromId[i]['id']]['name'];
      distanceFromId[i]['product_link'] = this.state.data[distanceFromId[i]['id']]['product_link'];
      distanceFromId[i]['price'] = this.state.data[distanceFromId[i]['id']]['price'];
    }
    return distanceFromId;
  }

  render() {
    return (
      <div className='App'>
        <div className='search-grid-container'>
          <SearchBar
            onSearchQuery={this.searchQuery}
          />
        </div>
        <div className='display-grid-container'>
          <div className="message-container">
            <div className={`message-info ${this.state.info}`}>
              Start Searching
            </div>
            <div className={`message-wait ${this.state.wait}`}>
              Wait...
            </div>
          </div>
          {this.state.data.map((d) => (
            <DisplayCard
              key={d.id}
              id={d.id}
              imgLink={d.img_link}
              name={d.name}
              productLink={d.product_link}
              price={d.price}
              onFindClosest={this.findClosest}
            />

          ))}
        </div>
        <div class='foot-note'>
          Boyu Jiang CS156 Final Project
        </div>
      </div>

    );
  }
}

export default App;
