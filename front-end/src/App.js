import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './App.css';
import 'antd/dist/antd.css';

import { Input } from 'antd';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Row, Col } from 'antd';

import * as API from './API.js'
import DisplayCard from './DisplayCard.js'

const Search = Input.Search;
const { Header, Content, Footer } = Layout;

class App extends Component {
  state = {
    query : "",
    data: [{"feature":[-412.5169945367363,-255.72834645654206],"id":0,"img_link":"https://i.ebayimg.com/thumbs/images/m/maP6A7XvB2y4BMo48QyzrDA/s-l225.jpg","name":"Beanie Plain Knit Hat Winter Warm Cuff Cap Slouchy Skull Ski Warm Men Woman","price":"$3.99","product_link":"https://www.ebay.com/itm/Beanie-Plain-Knit-Hat-Winter-Warm-Cuff-Cap-Slouchy-Skull-Ski-Warm-Men-Woman/253142148405?hash=item3af072a535:m:maP6A7XvB2y4BMo48QyzrDA:rk:1:pf:0"},{"feature":[-12.378869371419986,-132.88617462050755],"id":1,"img_link":"https://i.ebayimg.com/thumbs/images/m/mEDKIjgigCLTVk9uuUYMjOA/s-l225.jpg","name":"Bubble Knit Slouchy CC Baggy Beanie Oversize Winter Hat Ski Cap Skull Women","price":"$8.59 to $9.39","product_link":"https://www.ebay.com/itm/Bubble-Knit-Slouchy-CC-Baggy-Beanie-Oversize-Winter-Hat-Ski-Cap-Skull-Women/251689647770?hash=item3a99df3e9a:m:mEDKIjgigCLTVk9uuUYMjOA:rk:2:pf:0"},{"feature":[578.382350709254,-404.2381691298077],"id":2,"img_link":"https://i.ebayimg.com/thumbs/images/m/mrk7mj2RV-VP0__vcOGA9jg/s-l225.jpg","name":"Unisex Winter Visor Beanie Knit Hat Cap Crochet Men Women Ski Thick Warm Acrylic","price":"$10.39","product_link":"https://www.ebay.com/itm/Unisex-Winter-Visor-Beanie-Knit-Hat-Cap-Crochet-Men-Women-Ski-Thick-Warm-Acrylic/262116505439?hash=item3d075c775f:m:mrk7mj2RV-VP0__vcOGA9jg:rk:3:pf:0"},{"feature":[-461.13584372606755,152.51811190742293],"id":3,"img_link":"https://i.ebayimg.com/thumbs/images/m/m5TQv_yesoMa8ytgy1YBHlQ/s-l225.jpg","name":"Spandex Dome Cap Helmet Liner Sports FootBall Biker Beanie Hat Head wrap Black ","price":"$3.98","product_link":"https://www.ebay.com/itm/Spandex-Dome-Cap-Helmet-Liner-Sports-FootBall-Biker-Beanie-Hat-Head-wrap-Black/272647531064?hash=item3f7b0f2a38:m:m5TQv_yesoMa8ytgy1YBHlQ:rk:4:pf:0"},{"feature":[307.6493569249696,640.3345782994343],"id":4,"img_link":"https://i.ebayimg.com/thumbs/images/m/m1ISRom4Qdhk5oINipSHDfg/s-l225.jpg","name":"Custom Personalized Embroidered Text on Black Snapback Cap Hat - New","price":"$9.99 to $15.99","product_link":"https://www.ebay.com/itm/Custom-Personalized-Embroidered-Text-on-Black-Snapback-Cap-Hat-New/253524259401?hash=item3b07393249:m:m1ISRom4Qdhk5oINipSHDfg:rk:5:pf:0"}],
  }
  searchQuery = (query) => {
    this.setState({ query: query })
    API.search(query.trim()).then((payloads) => {
      console.log(payloads);
      console.log(payloads.data_set);
      this.setState({ data : payloads.data_set });
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
        <Content style={{ padding: '0 100px', marginTop: 64 }}>
          <div style={{ background: '#fff', padding: 36, minHeight: 380 }}>
             <Row align="bottom" justify="space-around space-between">
               {this.state.data.map(d => (
                 <Col span={6}>
                  <DisplayCard data={d}/>
                 </Col>
               ))}
             </Row>
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
