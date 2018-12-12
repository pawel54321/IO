import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

class Login extends Component {

constructor(props) {
    super(props);

    this.ZmianaWCzasieRzeczywistynInput = this.ZmianaWCzasieRzeczywistynInput.bind(this);
    //Aby Scope w funkcji ZmianaWCzasieRzeczywistynInput byl scopem klasy - nie funkcji

    this.state = {
        login:'',
        haslo:''
    }
}


KlikniecieSubmit = async (event) => {
    event.preventDefault();

    const OdpowiedzSerwera = await axios.post('/api/Uzytkownik/Logowanie', {
        login: this.state.login,
        haslo: this.state.haslo
    });

    this.setState({
        login:'',
        haslo:'',
        
    });

    if(OdpowiedzSerwera.data.zwracam_czy_poprawne===true)
    alert("Zostałeś zalogowany!")
    else
    alert("BŁĄD! Nie poprawne dane!")
} 


ZmianaWCzasieRzeczywistynInput(event) 
{
    const target = event.target;
    const value = target.value;
    
    const state = {...this.state}

    state[target.name] = value;
    
    this.setState(state);
}

render() {
    return (
        <div>  
            <div id="BarLogow">
                <h3>Logowanie:</h3>
            </div>
            <div id="BarLogow2">
                <form onSubmit=""> 
                    <label>Login: </label><br/>
                    <input type="text" name="login" value= {this.state.login} required onChange=""/><br/>
                    <label>Hasło: </label><br/>
                    <input type="password" name="haslo" value= {this.state.haslo} required onChange=""/><br/><br/>
                    <button id="zalo">Zaloguj się!</button>

                    <center><p>Nie masz konta? </p><Link to="/rejestracja">Zarejestruj się!</Link></center>
                    
                </form>
            </div>
        </div>
    );
  }
}

export default Login;