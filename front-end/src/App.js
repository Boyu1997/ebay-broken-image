import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './App.css';
import logo from './logo.svg';
import DisplayCard from './DisplayCard.js';

import * as API from './API.js';

class App extends Component {
  state = {
    query : "",
    // data: [],
    data: [{"feature":[298.6043682777212,-102.37068249769192],"id":0,"img_link":"https://i.ebayimg.com/thumbs/images/m/mmpvgY-eO9s9oQJkL84xt_g/s-l225.jpg","name":"SPONSOREDBaseball Cap USA American Flag Hat Detachable Mesh Tactical Military Army Style","price":"$10.99","product_link":"https://www.ebay.com/itm/Baseball-Cap-USA-American-Flag-Hat-Detachable-Mesh-Tactical-Military-Army-Style/223140378208?hash=item33f433f660:rk:1:pf:0&var"},{"feature":[395.96814174420297,-65.58217346799071],"id":1,"img_link":"https://i.ebayimg.com/thumbs/images/m/maP6A7XvB2y4BMo48QyzrDA/s-l225.jpg","name":"Beanie Plain Knit Hat Winter Warm Cuff Cap Slouchy Skull Ski Warm Men Woman","price":"$3.99","product_link":"https://www.ebay.com/itm/Beanie-Plain-Knit-Hat-Winter-Warm-Cuff-Cap-Slouchy-Skull-Ski-Warm-Men-Woman/253142148405?hash=item3af072a535:m:maP6A7XvB2y4BMo48QyzrDA:rk:2:pf:0"},{"feature":[296.52812895866407,-220.76147536206747],"id":2,"img_link":"https://i.ebayimg.com/thumbs/images/m/mEDKIjgigCLTVk9uuUYMjOA/s-l225.jpg","name":"Bubble Knit Slouchy CC Baggy Beanie Oversize Winter Hat Ski Cap Skull Women","price":"$8.39 to $9.39","product_link":"https://www.ebay.com/itm/Bubble-Knit-Slouchy-CC-Baggy-Beanie-Oversize-Winter-Hat-Ski-Cap-Skull-Women/251689647770?hash=item3a99df3e9a:m:mEDKIjgigCLTVk9uuUYMjOA:rk:3:pf:0"},{"feature":[106.59596671571714,506.88243329682916],"id":3,"img_link":"https://i.ebayimg.com/thumbs/images/g/rhkAAOSwlqpatr5k/s-l225.jpg","name":"SPONSOREDPunisher Skull Tactical Morale Knit Skull Cap Hat Beanie","price":"$11.99","product_link":"https://www.ebay.com/itm/Punisher-Skull-Tactical-Morale-Knit-Skull-Cap-Hat-Beanie/152957712377?epid=3017150133&hash=item239cfd77f9:rk:4:pf:0"},{"feature":[114.86963590748003,-132.92858187505882],"id":4,"img_link":"https://i.ebayimg.com/thumbs/images/m/mOdqPDxpDplHDUcevSw_h6A/s-l225.jpg","name":"SPONSOREDUnisex Wireless Bluetooth Headset Beanie Hat Music With Headphones Earphone Cap","price":"$9.99","product_link":"https://www.ebay.com/itm/Unisex-Wireless-Bluetooth-Headset-Beanie-Hat-Music-With-Headphones-Earphone-Cap/123502396238?hash=item1cc151034e:rk:5:pf:0&var"},{"feature":[-329.00923626243895,-129.41981732163117],"id":5,"img_link":"https://i.ebayimg.com/thumbs/images/m/mrk7mj2RV-VP0__vcOGA9jg/s-l225.jpg","name":"Unisex Winter Visor Beanie Knit Hat Cap Crochet Men Women Ski Thick Warm Acrylic","price":"$10.39","product_link":"https://www.ebay.com/itm/Unisex-Winter-Visor-Beanie-Knit-Hat-Cap-Crochet-Men-Women-Ski-Thick-Warm-Acrylic/262116505439?hash=item3d075c775f:m:mrk7mj2RV-VP0__vcOGA9jg:rk:6:pf:0"},{"feature":[383.10675294817037,236.08476040656276],"id":6,"img_link":"https://i.ebayimg.com/thumbs/images/m/m5TQv_yesoMa8ytgy1YBHlQ/s-l225.jpg","name":"Spandex Dome Cap Helmet Liner Sports FootBall Biker Beanie Hat Head wrap Black ","price":"$3.98","product_link":"https://www.ebay.com/itm/Spandex-Dome-Cap-Helmet-Liner-Sports-FootBall-Biker-Beanie-Hat-Head-wrap-Black/272647531064?hash=item3f7b0f2a38:m:m5TQv_yesoMa8ytgy1YBHlQ:rk:7:pf:0"},{"feature":[144.8919913388145,411.25112353795805],"id":7,"img_link":"https://i.ebayimg.com/thumbs/images/m/m1ISRom4Qdhk5oINipSHDfg/s-l225.jpg","name":"Custom Personalized Embroidered Text on Black Snapback Cap Hat - New","price":"$9.99 to $15.99","product_link":"https://www.ebay.com/itm/Custom-Personalized-Embroidered-Text-on-Black-Snapback-Cap-Hat-New/253524259401?hash=item3b07393249:m:m1ISRom4Qdhk5oINipSHDfg:rk:8:pf:0"},{"feature":[-3.880762967332332,146.01076411909338],"id":8,"img_link":"https://i.ebayimg.com/thumbs/images/g/wmIAAOSwhCBbXc40/s-l225.jpg","name":"NEW THE NORTH FACE Mudder Trucker Mesh Snapback Cap Hat men ","price":"$19.95","product_link":"https://www.ebay.com/itm/NEW-THE-NORTH-FACE-Mudder-Trucker-Mesh-Snapback-Cap-Hat-men/192643021799?epid=1259611022&hash=item2cda6b3be7:g:wmIAAOSwhCBbXc40:rk:9:pf:0"},{"feature":[307.18685505331985,-247.13345175155015],"id":9,"img_link":"https://i.ebayimg.com/thumbs/images/m/mhLPavP716b7QRJX9uBHOtA/s-l225.jpg","name":"Polo Style Baseball Cap Ball Dad Hat Adjustable Plain Solid Washed Cotton Mens","price":"$6.99","product_link":"https://www.ebay.com/itm/Polo-Style-Baseball-Cap-Ball-Dad-Hat-Adjustable-Plain-Solid-Washed-Cotton-Mens/261444120376?epid=1860957664&hash=item3cdf48af38:m:mhLPavP716b7QRJX9uBHOtA:rk:10:pf:0"},{"feature":[-56.21987116011113,164.2974732185218],"id":10,"img_link":"https://i.ebayimg.com/thumbs/images/m/mMyd-FA6KTpH8zgyrs6wphw/s-l225.jpg","name":"Boonie Bucket Hat Fisherman Wide Brim Safari Cap 100 Percent Cotton Sun Masraze","price":"$5.99 to $10.84","product_link":"https://www.ebay.com/itm/Boonie-Bucket-Hat-Fisherman-Wide-Brim-Safari-Cap-100-Percent-Cotton-Sun-Masraze/191556607716?hash=item2c99a9dee4:m:mMyd-FA6KTpH8zgyrs6wphw:rk:11:pf:0"},{"feature":[331.13376013017,-213.32483706586885],"id":11,"img_link":"https://i.ebayimg.com/thumbs/images/m/mRaspC9w-FjmxrEIhpkEfkw/s-l225.jpg","name":"Loop Plain Baseball Cap Solid Color Blank Curved Visor Hat Adjustable Army Mens","price":"$3.99 to $4.59","product_link":"https://www.ebay.com/itm/Loop-Plain-Baseball-Cap-Solid-Color-Blank-Curved-Visor-Hat-Adjustable-Army-Mens/262625302493?hash=item3d25b017dd:m:mRaspC9w-FjmxrEIhpkEfkw:sc:USPSFirstClass!94043!US!-1:rk:12:pf:0"},{"feature":[197.29401204545442,-81.89225238676849],"id":12,"img_link":"https://i.ebayimg.com/thumbs/images/m/mRTWhVvuApMUChVDi1ia8Bw/s-l225.jpg","name":"Original Flexfit Fitted Baseball Hat 6277 Wooly Combed Twill Cap Blank Flex Fit","price":"$9.95 to $26.95","product_link":"https://www.ebay.com/itm/Original-Flexfit-Fitted-Baseball-Hat-6277-Wooly-Combed-Twill-Cap-Blank-Flex-Fit/112588163029?hash=item1a36c707d5:m:mRTWhVvuApMUChVDi1ia8Bw:rk:13:pf:0"},{"feature":[-302.48883867631747,8.869249502740868],"id":13,"img_link":"https://i.ebayimg.com/thumbs/images/m/mBiLStlJ3REaZ9KLFG6MSrQ/s-l225.jpg","name":"Mens Wool Cabbie Newsboy Hat Gatsby Cap  Winter Driving Golf 8 Panel Gift Women","price":"$5.99 to $7.99","product_link":"https://www.ebay.com/itm/Mens-Wool-Cabbie-Newsboy-Hat-Gatsby-Cap-Winter-Driving-Golf-8-Panel-Gift-Women/201685882449?hash=item2ef56a5651:m:mBiLStlJ3REaZ9KLFG6MSrQ:rk:14:pf:0"},{"feature":[-302.48883867631747,8.869249502740868],"id":14,"img_link":"https://i.ebayimg.com/thumbs/images/m/mBiLStlJ3REaZ9KLFG6MSrQ/s-l225.jpg","name":"SPONSOREDMens Wool Cabbie Newsboy Hat Gatsby Cap  Winter Driving Golf 8 Panel Gift Women","price":"$5.99","product_link":"https://www.ebay.com/itm/Mens-Wool-Cabbie-Newsboy-Hat-Gatsby-Cap-Winter-Driving-Golf-8-Panel-Gift-Women/201685882449?hash=item2ef56a5651:rk:15:pf:0&var"},{"feature":[52.15959674290853,375.6777379636054],"id":15,"img_link":"https://i.ebayimg.com/thumbs/images/g/-0oAAOSwAx9cDXQE/s-l225.jpg","name":"SPONSOREDMarmot Shadows Beanie Hat 1584-001 Black One Size NWT New 100% Acrylic","price":"$14.00","product_link":"https://www.ebay.com/itm/Marmot-Shadows-Beanie-Hat-1584-001-Black-One-Size-NWT-New-100-Acrylic/223277720987?epid=1102145247&hash=item33fc63a59b:rk:16:pf:0"},{"feature":[-238.44005172071013,-104.40498727706263],"id":16,"img_link":"https://i.ebayimg.com/thumbs/images/m/mgkvifSQ1itfc2UGAYWb2cg/s-l225.jpg","name":"Mens Boonie Bucket Hat Cap 100% Cotton Fishing Military Hunting Safari Hiking ","price":"$8.99","product_link":"https://www.ebay.com/itm/Mens-Boonie-Bucket-Hat-Cap-100-Cotton-Fishing-Military-Hunting-Safari-Hiking/172779595350?hash=item283a776656:m:mgkvifSQ1itfc2UGAYWb2cg:rk:17:pf:0"},{"feature":[-218.0212433676387,30.385686485237816],"id":17,"img_link":"https://i.ebayimg.com/thumbs/images/g/2toAAOSwX0db0AK5/s-l225.jpg","name":"L&M Mens Winter Hat Trapper Aviator Russian Trooper Earflap Warm Ski W/Mask LFM","price":"$9.88","product_link":"https://www.ebay.com/itm/L-M-Mens-Winter-Hat-Trapper-Aviator-Russian-Trooper-Earflap-Warm-Ski-W-Mask-LFM/142975755237?epid=15024823382&hash=item214a04e3e5:g:2toAAOSwX0db0AK5:sc:USPSStandardPost!94043!US!-1:rk:18:pf:0"},{"feature":[-24.462767282917813,479.435503166497],"id":18,"img_link":"https://i.ebayimg.com/thumbs/images/g/IDIAAOSwD89bv661/s-l225.jpg","name":"Lot of 6 Beanie Men Women Dark Colors Winter Cuffed Knit Beanies Hats Cap Caps","price":"$13.85","product_link":"https://www.ebay.com/itm/Lot-of-6-Beanie-Men-Women-Dark-Colors-Winter-Cuffed-Knit-Beanies-Hats-Cap-Caps/152120165566?hash=item236b1184be:g:IDIAAOSwD89bv661:sc:USPSFirstClass!94043!US!-1:rk:19:pf:0"},{"feature":[-210.92933860584276,-134.3625367751344],"id":19,"img_link":"https://i.ebayimg.com/thumbs/images/m/m39d1p1jGgzf4aHph3Cq0eQ/s-l225.jpg","name":"New! Richardson Trucker Ball Cap Meshback Hat Snapback 2-Tone Cap 112","price":"$5.49","product_link":"https://www.ebay.com/itm/New-Richardson-Trucker-Ball-Cap-Meshback-Hat-Snapback-2-Tone-Cap-112/183063404487?hash=item2a9f6ddfc7:m:m39d1p1jGgzf4aHph3Cq0eQ:rk:20:pf:0"},{"feature":[-294.68816726323456,-154.82763896355243],"id":20,"img_link":"https://i.ebayimg.com/thumbs/images/m/mBZoQjyVcd4UcdTgbcfdFcw/s-l225.jpg","name":"Beanie Plain Knit Ski Hat Skull Cap Cuff Warm Winter Blank Colors Unisex Beany","price":"$4.89","product_link":"https://www.ebay.com/itm/Beanie-Plain-Knit-Ski-Hat-Skull-Cap-Cuff-Warm-Winter-Blank-Colors-Unisex-Beany/252207150106?hash=item3ab8b7b41a:m:mBZoQjyVcd4UcdTgbcfdFcw:sc:USPSFirstClass!94043!US!-1:rk:21:pf:0"},{"feature":[-453.7831229666649,-346.07770357926404],"id":21,"img_link":"https://i.ebayimg.com/thumbs/images/m/mnpzAFTRmDu-XqLHRTqEJ5Q/s-l225.jpg","name":"Beanie Plain Knit Hat Winter Warm Cap Cuff Slouchy Skull Hats Ski Men Women","price":"$2.79","product_link":"https://www.ebay.com/itm/Beanie-Plain-Knit-Hat-Winter-Warm-Cap-Cuff-Slouchy-Skull-Hats-Ski-Men-Women/281792846466?hash=item419c299a82:m:mnpzAFTRmDu-XqLHRTqEJ5Q:rk:22:pf:0"},{"feature":[615.6104489429513,-351.3858611626486],"id":22,"img_link":"https://i.ebayimg.com/thumbs/images/m/mhgPc4PYpIEQmtIAfBfqqKQ/s-l225.jpg","name":"Cuff Beanie Knit Hat Winter Warm Cap Slouchy Skull Ski Hats Men Women Warm Plain","price":"$3.75 to $3.99","product_link":"https://www.ebay.com/itm/Cuff-Beanie-Knit-Hat-Winter-Warm-Cap-Slouchy-Skull-Ski-Hats-Men-Women-Warm-Plain/253142150118?hash=item3af072abe6:m:mhgPc4PYpIEQmtIAfBfqqKQ:rk:23:pf:0"},{"feature":[-186.06971056028033,-16.75486333256794],"id":23,"img_link":"https://i.ebayimg.com/thumbs/images/m/mM7Iy5R3vTRDPFjmZFlf-KQ/s-l225.jpg","name":"SPONSOREDNEW NIKE-UNSTRUCTURED - SWOOSH ON BACK- GOLF-BASEBALL-TENNIS-HAT-CAP-DAD-HATS","price":"$12.97","product_link":"https://www.ebay.com/itm/NEW-NIKE-UNSTRUCTURED-SWOOSH-ON-BACK-GOLF-BASEBALL-TENNIS-HAT-CAP-DAD-HATS/162436763859?hash=item25d1fc50d3:rk:24:pf:0&var"},{"feature":[-145.5609004363203,-99.61682385959344],"id":24,"img_link":"https://i.ebayimg.com/thumbs/images/g/tc4AAOSwu4BVx6XS/s-l225.jpg","name":"SPONSORED6 LOT Assorted Designs SKULL CAP HEAD WRAP DU DO RAG DURAG TIE BACK BIKER HAT!","price":"$14.99","product_link":"https://www.ebay.com/itm/6-LOT-Assorted-Designs-SKULL-CAP-HEAD-WRAP-DU-DO-RAG-DURAG-TIE-BACK-BIKER-HAT/291969449495?epid=707278539&hash=item43fabc3e17:rk:25:pf:0"},{"feature":[-18.56321718265542,265.1672422758563],"id":25,"img_link":"https://i.ebayimg.com/thumbs/images/m/m7G7SlO6V5VofymxOjq8a7Q/s-l225.jpg","name":"Men's PU Leather Classic Newsboy Hat Ivy Cap Gatsby Cabbie Driving Golf Hat","price":"$11.99","product_link":"https://www.ebay.com/itm/Mens-PU-Leather-Classic-Newsboy-Hat-Ivy-Cap-Gatsby-Cabbie-Driving-Golf-Hat/253753981757?hash=item3b14ea7b3d:m:m7G7SlO6V5VofymxOjq8a7Q:rk:26:pf:0"},{"feature":[-102.28533703926716,-107.29985883459166],"id":26,"img_link":"https://i.ebayimg.com/thumbs/images/m/mUIF1y3teZ7MediMx41SAuw/s-l225.jpg","name":"CC Beanie Unisex Hat Cap Knit Slouchy Thick Oversize Genuine","price":"$5.95 to $6.95","product_link":"https://www.ebay.com/itm/CC-Beanie-Unisex-Hat-Cap-Knit-Slouchy-Thick-Oversize-Genuine/271765459651?hash=item3f467bd2c3:m:mUIF1y3teZ7MediMx41SAuw:sc:USPSFirstClass!94043!US!-1:rk:27:pf:0"},{"feature":[-214.2034688353927,41.349484645866404],"id":27,"img_link":"https://i.ebayimg.com/thumbs/images/m/m6_apzhwjs8RXcJh-98aS9A/s-l225.jpg","name":"Casaba Beanies Hat Cap for Men Women Short Ski Toboggan Knit Winter Unisex","price":"$6.49","product_link":"https://www.ebay.com/itm/Casaba-Beanies-Hat-Cap-for-Men-Women-Short-Ski-Toboggan-Knit-Winter-Unisex/153220675848?hash=item23aca9f908:m:m6_apzhwjs8RXcJh-98aS9A:sc:USPSFirstClass!94043!US!-1:rk:28:pf:0"},{"feature":[12.568751338882612,-77.15311727052003],"id":28,"img_link":"https://i.ebayimg.com/thumbs/images/m/m0pKBkYqdFktPo9Rw1c-nJg/s-l225.jpg","name":"Plain Baseball Cap Solid Color Blank Curved Visor Hat Adjustable Polo Caps New","price":"$3.99","product_link":"https://www.ebay.com/itm/Plain-Baseball-Cap-Solid-Color-Blank-Curved-Visor-Hat-Adjustable-Polo-Caps-New/391563840770?hash=item5b2b060d02:m:m0pKBkYqdFktPo9Rw1c-nJg:rk:29:pf:0"},{"feature":[-155.42353714101537,-88.98404533794708],"id":29,"img_link":"https://i.ebayimg.com/thumbs/images/m/mNQ3HrBTopx3gkqPLYC8qCQ/s-l225.jpg","name":"Men Women Warm Oversize Beanie Skull Baggy Cap Winter Slouchy Knit Hat Unisex US","price":"$5.85 to $6.04","product_link":"https://www.ebay.com/itm/Men-Women-Warm-Oversize-Beanie-Skull-Baggy-Cap-Winter-Slouchy-Knit-Hat-Unisex-US/173521750303?hash=item2866b3c91f:m:mNQ3HrBTopx3gkqPLYC8qCQ:rk:30:pf:0"}],
  }
  searchQuery = (query) => {
    this.setState({ query: query })
    API.search(query.trim()).then((payloads) => {
      console.log(payloads);
      console.log(payloads.data_set);
      this.setState({ data : payloads.data_set });
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
        <header>
        </header>
        <div className='display-grid-container'>
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
        <p></p>
      </div>

    );
  }
}

// <div className="App">
//   <header className="App-header">
//     <img src={logo} className="App-logo" alt="logo" />
//     <p>
//       Edit <code>src/App.js</code> and save to reload.
//     </p>
//     <a
//       className="App-link"
//       href="https://reactjs.org"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       Learn React
//     </a>
//   </header>
// </div>

// #components-layout-demo-fixed .logo {
//   width: 120px;
//   height: 31px;
//   background: rgba(255,255,255,.2);
//   margin: 16px 24px 16px 0;
//   float: left;
// }

export default App;
