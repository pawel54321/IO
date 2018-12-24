import React from 'react';

import WrocdoStronyGlownej from '../Images/WrocdoStronyGlownej.jpg';
//import StronaGlowna from '../Images/StronaGlowna.jpg';

import { Link } from 'react-router-dom';
const Footer = () => (
    <div className="App-footer">
        <footer>
            <SprawdzFooter />
        </footer>
    </div>
);

const SprawdzFooter = () => {

    var a = window.location.pathname;

    if (a !== "/") {
        return (<Link to="/"><img src={WrocdoStronyGlownej} alt=""/></Link>);
    }
    else {
        return (<div>{/*<img src={StronaGlowna} alt=""/>*/}</div>);
    }
}


export default Footer;


