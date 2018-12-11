import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => (
  <nav>
    <header className="App-header">
        <div className="Element-menu">
            <Link to="/">Strona Główna</Link>
        </div>
        <div className="Element-menu">
            <Link to="/other-page">Other Page</Link>
        </div>
        <div className="Element-menu">
            <Link to="/logowanie">Zaloguj się</Link>   
        </div>         
    </header>
  </nav>
);


export default Header;
