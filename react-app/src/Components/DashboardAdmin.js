import React, { Component } from 'react';
import axios from 'axios';

//import ReactTable from 'react-table';
//import 'react-table/react-table.css'

import TabelaMiejscowosc from './TabelaMiejscowosc';
import TabelaAtrakcja from './TabelaAtrakcja';

//import Alert from 'react-s-alert';

import {//Button,
    //Col, Row, 
    TabContent, TabPane, Nav, NavItem, NavLink, Row, Col
} from 'reactstrap';
import classnames from 'classnames';

class DashboardAdmin extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '0',
            daneMiejscowosc: [],
            daneAtrakcja: []
        };


        //  this.ZmianaWCzasieRzeczywistynInput3 = this.ZmianaWCzasieRzeczywistynInput3.bind(this);
        //   this.ZmianaWCzasieRzeczywistynInput4 = this.ZmianaWCzasieRzeczywistynInput4.bind(this);

        //Aby Scope w funkcji ZmianaWCzasieRzeczywistynInput byl scopem klasy - nie funkcji  
        /*
                this.state = {
                   
                    nazwa: '',
                    adres: '',
                    liczba_miejsc: '',
                    godzina_otwarcia: '',
                    godzina_zamkniecia: '',
                    cena: '',
                    id_miejscowosc: '',
        
                    nazwaMiejscowosc: '',
                    kraj: ''
                    ,
                   
        
                    daneMiejscowosc: [],
                    daneAtrakcja: []
        
            }*/

        this.ZwrocenieTabeliMiejscowosc();
        this.ZwrocenieTabeliAtrakcja();

    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    ZwrocenieTabeliMiejscowosc = async () => {
        const OdpowiedzSerwera5 = await axios.post('/api/Uzytkownik/Panel_Admina/Zwroc_Tabele_Miejscowosc', { daneMiejscowosc: this.state.daneMiejscowosc });
        //  this.state.daneMiejscowosc = OdpowiedzSerwera5.data.daneMiejscowosc;

        //prompt(JSON.stringify(OdpowiedzSerwera5.data.daneMiejscowosc));
        this.setState({
            daneMiejscowosc: OdpowiedzSerwera5.data.daneMiejscowosc,
        });
        //prompt(JSON.stringify(OdpowiedzSerwera5.data.daneMiejscowosc));
        //prompt(JSON.stringify(this.state.daneMiejscowosc));
    }
    ZwrocenieTabeliAtrakcja = async () => {
        const OdpowiedzSerwera6 = await axios.post('/api/Uzytkownik/Panel_Admina/Zwroc_Tabele_Atrakcja', { daneAtrakcja: this.state.daneAtrakcja });
        //  this.state.daneMiejscowosc = OdpowiedzSerwera5.data.daneMiejscowosc;

        //prompt(JSON.stringify(OdpowiedzSerwera5.data.daneMiejscowosc));
        this.setState({
            daneAtrakcja: OdpowiedzSerwera6.data.daneAtrakcja,
        });
        //prompt(JSON.stringify(OdpowiedzSerwera5.data.daneMiejscowosc));
        //prompt(JSON.stringify(this.state.daneMiejscowosc));
    }

    /*
    
        KlikniecieSubmit3 = async (event) => {
            event.preventDefault();
    
            const OdpowiedzSerwera3 = await axios.post('/api/Uzytkownik/PanelAdmina', {
                nazwa: this.state.nazwa,
                adres: this.state.adres,
                liczba_miejsc: this.state.liczba_miejsc,
                godzina_otwarcia: this.state.godzina_otwarcia,
                godzina_zamkniecia: this.state.godzina_zamkniecia,
                cena: this.state.cena,
                id_miejscowosc: this.state.id_miejscowosc,
            });
    
            this.setState({
                nazwa: '',
                adres: '',
                liczba_miejsc: '',
                godzina_otwarcia: '',
                godzina_zamkniecia: '',
                cena: '',
                id_miejscowosc: ''
    
            });
            if (OdpowiedzSerwera3.data.zwracam_czy_stworzonoBrakPodanejMiejscowosci === false) {
                Alert.error("Podana wartość 'Id Miejscowość' nie istnieje w tabeli Miejscowość!", { position: 'bottom' });
                //document.getElementById("KomunikatERROR3").innerHTML = "Podana wartość 'Index Miejscowość' nie istnieje w tabeli Miejscowość!";
            }
            else {
                if (OdpowiedzSerwera3.data.zwracam_czy_poprawnie_dodalem_atrakcje === true) {
                    Alert.success('Dodano nową atrakcje!', { position: 'top' });
    
                    //refresh tabeli
                }
                else if (OdpowiedzSerwera3.data.zwracam_czy_poprawnie_dodalem_atrakcje === false) {
                    Alert.error('Atrakcja o takiej nazwie istnieje!', { position: 'bottom' });
                }
            }
    
        }
    
        ZmianaWCzasieRzeczywistynInput3(event) {
    
            const target = event.target;
            const value = target.value;
    
            const state = { ...this.state }
    
            state[target.name] = value;
    
            this.setState(state);
        }
       
    */
    render() {
        return (
            <div>
                <h5>Panel Admina</h5>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                        >
                            Miejscowość
                </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                        >
                            Atrakcja
            </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>


                    <TabPane tabId="0">
                        <Row>
                            <Col xs={6} md={3} >
                            </Col>
                            <Col xs={6} md={6} >
                                <br /><br /><br /><br /><br /><br /><br /><br />
                                <center><h5><h1>Znajdujesz się w Panelu Administratora!</h1><br />W tym miejscu możesz zarządzać swoim systemem.<br />Wybierz odpowiednią zakładkę u góry strony, aby dokonać zmian w systemie.</h5></center>

                            </Col>
                            <Col xs={6} md={3} >
                            </Col>
                        </Row>
                    </TabPane>

                    <TabPane tabId="1">
                        <Row className="show-grid">

                            <Col xs={6} md={3} >
                            </Col>
                            <Col xs={6} md={6} >
                                {/*this.ZwrocenieTabeliMiejscowosc*/}
                                <br />
                                <TabelaMiejscowosc daneMiejscowosc={this.state.daneMiejscowosc} />
                                <br /><br /><br /><br /><br />
                             
                            </Col>
                            <Col xs={6} md={3} >
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row className="show-grid">

                            <Col xs={6} md={2} >
                            </Col>
                            <Col xs={6} md={8} >
                                {/*this.ZwrocenieTabeliAtrakcja*/}
                                <br />
                                <TabelaAtrakcja daneAtrakcja={this.state.daneAtrakcja} />
                                <br /><br /><br /><br /><br />
                            </Col>
                            <Col xs={6} md={2} >
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>


                {/*<p>Witaj! */}{/*{this.props.imie} {this.props.nazwisko}, ({this.props.login})*/}{/*</p>*/}
                {/*
                <form onSubmit={this.KlikniecieSubmit3}>
                    <h4>Atrakcja: </h4>
                    <table border="0">
                        <tr>
                            <td>Nazwa</td>
                            <td>Adres</td>
                            <td>Liczba miejsc</td>
                            <td>Godzina otwarcia</td>
                            <td>Godzina zamknięcia</td>
                            <td>Cena</td>
                            <td>Id Miejscowość</td>
                        </tr>
                        <tr>
                            <td><input type="text" name="nazwa" value={this.state.nazwa} required onChange={this.ZmianaWCzasieRzeczywistynInput3} /></td>

                            <td> <input type="text" name="adres" value={this.state.adres} required onChange={this.ZmianaWCzasieRzeczywistynInput3} /></td>

                            <td><input type="number" min="0" name="liczba_miejsc" value={this.state.liczba_miejsc} required onChange={this.ZmianaWCzasieRzeczywistynInput3} /></td>

                            <td><input type="time" name="godzina_otwarcia" value={this.state.godzina_otwarcia} required onChange={this.ZmianaWCzasieRzeczywistynInput3} /></td>

                            <td><input type="time" name="godzina_zamkniecia" value={this.state.godzina_zamkniecia} required onChange={this.ZmianaWCzasieRzeczywistynInput3} /></td>

                            <td><input type="number" step="0.01" name="cena" value={this.state.cena} required onChange={this.ZmianaWCzasieRzeczywistynInput3} /></td>

                            <td>
                               
                                <input type="number" min="0" name="id_miejscowosc" value={this.state.id_miejscowosc} required onChange={this.ZmianaWCzasieRzeczywistynInput3} />
                            </td>

                        </tr>
                    </table>
                    <br />
                    <button>Dodaj!</button>*/}

                {/* <p><font color="red" id="KomunikatERROR3"></font></p>
                    <p><font color="green" id="KomunikatSUCCESS3"></font></p>*/}


                {/*</form>*/}

                {/*}
                <form onSubmit={this.KlikniecieSubmit4}>
                    <h4>Miejscowość: </h4>
                    <table border="0">
                        <tr>
                            <td>Nazwa</td>
                        </tr>
                        <tr>
                            <td><input type="text" name="nazwaMiejscowosc" value={this.state.nazwaMiejscowosc} required onChange={this.ZmianaWCzasieRzeczywistynInput4} /></td>
                        </tr>
                    </table>
                    <br />
                <button>Dodaj!</button>*/}

                {/* <p><font color="red" id="KomunikatERROR4"></font></p>
                    <p><font color="green" id="KomunikatSUCCESS4"></font></p>*/}


                {/*</form>*/}

                {/*
            
                <form onSubmit={this.ZwrocenieTabeliAtrakcja}> 
                    <button>Wczytaj!</button>
                    
                </form>
    
                <this.Tabela/>*/}


            </div>
        );
    }
}

export default DashboardAdmin;