import React, {Component} from 'react';
import DropdownMiejscowosc from './DropdownMiejscowosc';
import CardAtrakcja from './CardAtrakcja';
import {Row, Col} from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            atrakcje: [],
            miejscowosc: ''
        }
    }

    ZwrocenieTabeliAtrakcja = async () => {
        //prompt(JSON.stringify(this.props.idMiejscowosc));
        const OdpowiedzSerwera99 = await axios.post('/api/Uzytkownik/Panel_Admina/Zwroc_Atrakcje_Z_Miejscowosci', { miejscowosc: this.state.miejscowosc });

        this.setState({
            atrakcje: OdpowiedzSerwera99.data.daneAtrakcja,
        });
        //prompt(JSON.stringify(this.state.atrakcje));
        //console.log(this.state.miejscowosc);
    }

    nazwamiejscowosc = (Miejscowosc) => {
        this.setState ({
            miejscowosc: Miejscowosc
        });
    }

    render() {
        {this.ZwrocenieTabeliAtrakcja()}

        let atrakcjeCards = this.state.atrakcje.map(atrakcja => {
            return (
                <Col xl='4' lg='6' xs='12'>
                    <CardAtrakcja atrakcja = {atrakcja} />
                </Col>
            )
        });

        if (localStorage.getItem('loggedAs') === 'User' || localStorage.getItem('loggedAs') === 'Admin') {
            return (
                <div>
                    <h5>Strona Główna</h5>
                    <Row>
                        <Col sm='12' md={{ size: 6, offset: 3 }}>
                            <DropdownMiejscowosc miejscowosc={this.nazwamiejscowosc}/>
                        </Col>
                    </Row>
                    <Col sm='12' md={{ size: 6, offset: 3 }}>
                        <Row>
                            {atrakcjeCards}
                        </Row>
                    </Col>
                </div>
            );
        } else {
            return (
                <div>
                    <h5>Strona Główna</h5>
                    <Col sm='12' md={{ size: 12, offset: 0 }}>
                        <Row>

                            <h4 style={{textAlign: 'center', width: '100%'}}>
                            <br/> <br/> <br/> <br/> <br/>
                            <h1>Witamy!</h1><br/>
                            Do prawidłowego korzystania z serwisu wymagane jest posiadanie konta!<br/>
                            Zarejestruj się, klikając w odpowiedni przycisk w panelu nawigacyjnym lub <Link to="/rejestracja">Tutaj</Link>.<br/><br/>
                            <h3>Dziękujemy za korzystanie z serwisu i życzymy udanych rezerwacji!</h3></h4>
                        </Row>
                    </Col>
                </div>
            );
        }
    }
}

export default HomePage;
