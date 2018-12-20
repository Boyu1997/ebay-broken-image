import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './App.css';
import 'antd/dist/antd.css';

import { Input } from 'antd';
import { Layout, Menu, Breadcrumb } from 'antd';

import * as API from './API.js'

const Search = Input.Search;
const { Header, Content, Footer } = Layout;

class App extends Component {
  state = {
    query : "",
    data: [],
  }
  searchQuery = (query) => {
    this.setState({ query: query })
    API.search(query.trim()).then((payloads) => {
      console.log(payloads);
      this.setState({ data : payloads });
    })
  }

  render() {
    return (
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Search
              style={{ width: '60%', margin: '0px 12px 0px 12px' }}
              placeholder="input search text"
              enterButton="Search"
              size="large"
              onSearch={value => this.searchQuery(value)}
            />
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <div style={{ background: '#fff', padding: 36, minHeight: 380 }}>
             Content
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          CS156 Final Project @ M20 Boyu Jiang
        </Footer>
      </Layout>
    );
  }
}

// #components-layout-demo-fixed .logo {
//   width: 120px;
//   height: 31px;
//   background: rgba(255,255,255,.2);
//   margin: 16px 24px 16px 0;
//   float: left;
// }

export default App;
