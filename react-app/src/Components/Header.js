import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => (
  <nav>
    <header className="App-header">
        <div className="Element-menu">
            <Link to="/">Strona Główna</Link>
        </div>
        
        <div className="Element-menu">
            <Link to="/admin">Panel Admina</Link>
        </div>
        <div className="Element-menu">
            <Link to="/uzytkownik">Panel Użytkownika</Link>
        </div>
        <div className="Element-menu">
            <Link to="/wyloguj">Wyloguj</Link>
        </div>
        
        <div className="Element-menu">
            <Link to="/logowanie">Zaloguj się</Link>   
        </div>     
        <div className="Element-menu">
            <Link to="/rejestracja">Zarejestruj się</Link>   
        </div>         
    </header>
  </nav>
);


export default Header;
