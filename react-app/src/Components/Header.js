import React from 'react';
import { Link } from 'react-router-dom';

//import StronaGlowna from '../Images/StronaGlowna.jpg';

/*import PanelUzytkownika from '../Images/PanelUzytkownika.jpg';
import PanelAdmina from '../Images/PanelAdmina.jpg';

import Zalogujsie from '../Images/Zalogujsie.jpg';
import Zarejestrujsie from '../Images/Zarejestrujsie.jpg';
import Wyloguj from '../Images/Wyloguj.jpg';*/
import { Navbar, NavbarBrand, //NavbarToggler, 
    Collapse, Nav, NavItem, NavLink } from 'reactstrap';

import Alert from 'react-s-alert';

const ROLES = {
    ADMIN: 'Admin',
    USER: 'User'
}

function Wylogowanie() {
    // this.preventDefault(); //Potrzebne-?? Odswieza-?? - nie powinno odswiezac, ale odswieza
    localStorage.setItem('loggedAs', '');
    localStorage.setItem('username','');
    this.props.onLoggedUserChange2('');
    //????
    Alert.success('Pomyślnie wylogowano!', { position: 'top' });
    //????
}



function Visible(props) {


    if (props.loggedAs === ROLES.USER) {

        //<Link to="/uzytkownik"><img src={PanelUzytkownika} alt="" /></Link>

        //<Link to="/" onClick={Wylogowanie}><img src={Wyloguj} alt="" /></Link>

        return (

            <nav>
                <header className="App-header">

                    <Navbar color="light" light expand="md">
                        <NavbarBrand><Link to="/"><i className="fa fa-home" style={{ fontSize: '50px', color: 'light' }} /></Link></NavbarBrand>
                        {/*<NavbarToggler />*/}
                        <Collapse Collapse isOpen={true} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink><Link to="/uzytkownik">Panel Użytkownika</Link></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink> <Link to="/" onClick={Wylogowanie}>Wyloguj</Link></NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>

                </header>
            </nav>);
    }
    else if (props.loggedAs === ROLES.ADMIN) {
        return (
            <nav>
                <header className="App-header">

                    <Navbar color="light" light expand="md">
                        <NavbarBrand><Link to="/"><i className="fa fa-home" style={{ fontSize: '50px', color: 'light' }} /></Link></NavbarBrand>
                        {/*<NavbarToggler />*/}
                        <Collapse Collapse isOpen={true} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink><Link to="/admin">Panel Admina</Link></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink> <Link to="/" onClick={Wylogowanie}>Wyloguj</Link></NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>

                </header>
            </nav>
        );
    }
    else {
        return (
            <nav>
                <header className="App-header">

                    <Navbar color="light" light expand="md">
                        <NavbarBrand><Link to="/"><i className="fa fa-home" style={{ fontSize: '50px', color: 'light' }} /></Link></NavbarBrand>
                        {/*<NavbarToggler />*/}
                        <Collapse Collapse isOpen={true} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink><Link to="/logowanie">Logowanie</Link></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink><Link to="/rejestracja">Rejestracja</Link></NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </header>
            </nav>
        );
    }

}
const Header = (props) => (

    Visible(props)
);


export default Header;
