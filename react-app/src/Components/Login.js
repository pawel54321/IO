import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
//import Header from './Header';

import Alert from 'react-s-alert';

import { Button, Col, Row } from 'reactstrap';

import history from '../history';


class Login extends Component {

    constructor(props) {
        super(props);

        this.ZmianaWCzasieRzeczywistynInput2 = this.ZmianaWCzasieRzeczywistynInput2.bind(this);
        //Aby Scope w funkcji ZmianaWCzasieRzeczywistynInput byl scopem klasy - nie funkcji

        this.state = {
            login: '',
            haslo: ''/*,
            
            userLogged: false,
            adminLogged: false
            */
        }
    }
    /*
        LoggedState() {
            if (this.state.userLoged === true) {
                return (<Header userLogged={true} />)
            }
    
            if (this.state.adminLogged === true) {
                return (<Header adminLogged={true} />)
            }
    
        }*/
    KlikniecieSubmit2 = async (event) => {
        event.preventDefault();

        const OdpowiedzSerwera2 = await axios.post('/api/Uzytkownik/Logowanie', {
            login: this.state.login,
            haslo: this.state.haslo
        });
        console.log(OdpowiedzSerwera2)

        this.setState({
            login: '',
            haslo: '',
        });

        if (OdpowiedzSerwera2.data.zwracam_czy_poprawne === true) {
            localStorage.setItem('loggedAs', OdpowiedzSerwera2.data.jaki_user);
            this.props.onLoggedUserChange(OdpowiedzSerwera2.data.jaki_user);

            //document.getElementById("BarLogowPOPRAWNIE").style.display = "block";
            //  document.getElementById("BarLogow").style.display = "none";
            //  document.getElementById("BarLogow2").style.display = "none";

            // document.getElementById("KomunikatSUCCESS2").innerHTML = "Logowanie przebiegło pomyślnie!";
            Alert.success('Logowanie przebiegło pomyślnie!', { position: 'top' });
            /*
                        if(OdpowiedzSerwera2.data.jaki_user==='Admin')
                        {
                            this.props.history.push('/admin');
                        }
                        else if(OdpowiedzSerwera2.data.jaki_user==='User')
                        {
                            this.props.history.push('/uzytkownik');
                        }
                        */
            //????
            // document.getElementsByClassName("show-grid")[0].style.display = "none";
            //   this.props.history.push('/admin');
            //????

            history.push('/');
        }
        else if (OdpowiedzSerwera2.data.zwracam_czy_poprawne === false) {
            // document.getElementById("KomunikatERROR2").innerHTML = "Niepoprawne dane!";
            Alert.error('Niepoprawne dane!', { position: 'bottom' });
        }


    }


    ZmianaWCzasieRzeczywistynInput2(event) {
        //document.getElementById("KomunikatERROR2").innerHTML = "";

        const target = event.target;
        const value = target.value;

        const state = { ...this.state }

        state[target.name] = value;


        this.setState(state);
    }

    render() {
        return (
            <div>

                <Row className="show-grid">
                    <Col xs={6} md={5}>
                    </Col>
                    <Col xs={6} md={2} >
                        <form onSubmit={this.KlikniecieSubmit2}>
                            <center>
                                <br />
                                <h5>Logowanie:</h5><br />
                                <label style={{ paddingRight: '140px' }}>Login: </label><br />
                                <input type="text" name="login" value={this.state.login} required onChange={this.ZmianaWCzasieRzeczywistynInput2} /><br />
                                <label style={{ paddingRight: '140px' }}>Hasło: </label><br />
                                <input type="password" name="haslo" value={this.state.haslo} required onChange={this.ZmianaWCzasieRzeczywistynInput2} /><br /><br />

                                <Button color="primary">Zaloguj się!</Button>

                                {/*<center><p><font color="red" id="KomunikatERROR2"></font></p></center>*/}
                                <br /><br />
                                <p>Nie masz konta? </p><Link to="/rejestracja">Zarejestruj się!</Link>
                            </center>
                        </form>

                    </Col>
                    <Col xsHidden md={5}>
                    </Col>
                </Row>
                {/*this.LoggedState()*/}
                {/*<div id="BarLogowPOPRAWNIE">
                    <center><p><font color="green" id="KomunikatSUCCESS2"></font></p></center>
                </div>*/}
            </div>
        );
    }
}

export default Login;