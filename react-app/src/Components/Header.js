import React from 'react';
import { Link } from 'react-router-dom';

//import StronaGlowna from '../Images/StronaGlowna.jpg';
import PanelUzytkownika from '../Images/PanelUzytkownika.jpg';
import PanelAdmina from '../Images/PanelAdmina.jpg';

import Zalogujsie from '../Images/Zalogujsie.jpg';
import Zarejestrujsie from '../Images/Zarejestrujsie.jpg';
import Wyloguj from '../Images/Wyloguj.jpg';

const ROLES = {
    ADMIN: 'Admin',
    USER: 'User'
}

function Wylogowanie ()
{
    this.preventDefault(); //Potrzebne-?? Odswieza-?? - nie powinno odswiezac, ale odswieza
    this.props.onLoggedUserChange2('');
}



function Visible(props) {
   

    if (props.loggedAs === ROLES.USER) {
        return (
            <nav>
                <header className="App-header">
                    <div className="Element-menu">
                        <Link to="/"><i className="fa fa-home" style={{ fontSize: '50px', color:'grey'}}/></Link>
                    </div>
                    <div className="Element-menu">
                        <Link to="/uzytkownik"><img src={PanelUzytkownika} alt=""/></Link>
                    </div>
                    <div className="Element-menu">
                        <Link to="/wyloguj" onClick={Wylogowanie}><img src={Wyloguj} alt=""/></Link>
                    </div>
                </header>
            </nav>);
    }
    else if (props.loggedAs === ROLES.ADMIN) {
        return (
            <nav>
                <header className="App-header">
                    <div className="Element-menu">
                        <Link to="/"><i class="fa fa-home" style={{ fontSize: '50px', color:'grey'}}/></Link>
                    </div>
                    <div className="Element-menu">
                        <Link to="/admin"><img src={PanelAdmina} alt=""/></Link>
                    </div>
                    <div className="Element-menu">
                        <Link to="/wyloguj" onClick={Wylogowanie}><img src={Wyloguj} alt=""/></Link>
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
                        <Link to="/"><i class="fa fa-home" style={{ fontSize: '50px', color:'grey'}}/></Link>
                    </div>
                  
                    <div className="Element-menu">
                        <Link to="/logowanie"><img src={Zalogujsie} alt=""/></Link>
                    </div>
                    <div className="Element-menu">
                        <Link to="/rejestracja"><img src={Zarejestrujsie} alt=""/></Link>
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
