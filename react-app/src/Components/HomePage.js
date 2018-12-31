import React, {Component} from 'react';
import DropdownMiejscowosc from './DropdownMiejscowosc';
import CardAtrakcja from './CardAtrakcja';
import {Row, Col} from 'reactstrap';
import { Link } from 'react-router-dom';

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            atrakcje: [
                {
                    nazwa: 'nazwa1',
                    adres: 'adres1'
                },
                {
                    nazwa: 'nazwa2',
                    adres: 'adres2'
                },
                {
                    nazwa: 'nazwa3',
                    adres: 'adres4'
                },
                {
                    nazwa: 'nazwa5',
                    adres: 'adres6'
                },
                {
                    nazwa: 'nazwa17',
                    adres: 'adres8'
                },
                {
                    nazwa: 'nazwa28',
                    adres: 'adres29'
                },
                {
                    nazwa: 'nazwa11',
                    adres: 'adres11'
                },
                {
                    nazwa: 'nazwa22',
                    adres: 'adres22'
                }
            ]
        }
    }

    render() {
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
        
                    <DropdownMiejscowosc />
                    
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
                            Zarejestruj się klikająć w odpowiedni przycisk w panelu nawigacyjnym lub <Link to="/rejestracja">Tutaj</Link>.<br/><br/>
                            <h3>Dziękujemy za korzystanie z serwisu i życzymy udanych rezerwacji!</h3></h4>
                        </Row>
                    </Col>
                </div>
            );
        }
    }
}

export default HomePage;