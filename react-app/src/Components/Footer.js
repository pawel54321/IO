import React from 'react';

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
        return (<Link to="/">Wróć do Strony Głównej</Link>);
    }
    else {
        return (<div>Strona Główna</div>);
    }
}


export default Footer;


