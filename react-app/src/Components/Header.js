import React from 'react';
import { Link } from 'react-router-dom';

const ROLES = {
    ADMIN: 'Admin',
    USER: 'User'
}

function Visible(props) {

    if (props.loggedAs === ROLES.USER) {
        return (
            <nav>
                <header className="App-header">
                    <div className="Element-menu">
                        <Link to="/">Strona Główna</Link>
                    </div>
                    <div className="Element-menu">
                        <Link to="/uzytkownik">Panel Użytkownika</Link>
                    </div>
                    <div className="Element-menu">
                        <Link to="/wyloguj">Wyloguj</Link>
                    </div>
                </header>
            </nav>);
    }
    else if (props.loggedAs === ROLES.ADMIN) {
        return (
            <nav>
                <header className="App-header">
                    <div className="Element-menu">
                        <Link to="/">Strona Główna</Link>
                    </div>
                    <div className="Element-menu">
                        <Link to="/admin">Panel Admina</Link>
                    </div>
                    <div className="Element-menu">
                        <Link to="/wyloguj">Wyloguj</Link>
                    </div>
                </header>
            </nav>
        );
    }
    else {
        return (
            <nav>
                <header className="App-header">
                    <div className="Element-menu">
                        <Link to="/">Strona Główna</Link>
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
    }

}
const Header = (props) => (
    Visible(props)
);


export default Header;
