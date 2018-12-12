import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Register extends Component {

    constructor(props) {
        super(props);

        this.ZmianaWCzasieRzeczywistynInput = this.ZmianaWCzasieRzeczywistynInput.bind(this);
        //Aby Scope w funkcji ZmianaWCzasieRzeczywistynInput byl scopem klasy - nie funkcji

        this.state = {
            imie:'',
            nazwisko:'',
            login:'',
            haslo:''
        }
    }


    KlikniecieSubmit = async (event) => {
        event.preventDefault();

        const OdpowiedzSerwera = await axios.post('/api/Uzytkownik/Rejestracja', {
            imie: this.state.imie,
            nazwisko: this.state.nazwisko,
            login: this.state.login,
            haslo: this.state.haslo
        });

        this.setState({
            imie:'',
            nazwisko:'',
            login:'',
            haslo:'',
            
        });

        if(OdpowiedzSerwera.data.zwracam_czy_stworzono===true)
        alert("Użytkownik został pomyślnie zarejestrowany!")
        else
        alert("BŁĄD! Użytkownik już istnieje!")
    } 

    ZmianaWCzasieRzeczywistynInput(event) {
    
        

        const target = event.target;
        const value = target.value;
        
        const state = {...this.state}

        state[target.name] = value;
        /*
        if(target.name==="imie")
        {
        const inputImie = target.name;
        state[inputImie] = value;
        }

        if(target.name==="nazwisko")
        {
        const inputNazwisko = target.name;
        state[inputNazwisko] = value;
        }
        if(target.name==="login")
        {
        const inputLogin = target.name;
        state[inputLogin] = value;
        }

        if(target.name==="haslo")
        {
        const inputHaslo = target.name;      
        state[inputHaslo] = value;
        }
       */
        this.setState(state);
        
    }



    render() {
        return (
            <div>  
                <div id="BarLogow">
                    <h3>Rejestracja:</h3>
                </div>
                <div id="BarLogow2">
                    <form onSubmit={this.KlikniecieSubmit}> 
                        <label>Imię: </label><br/>
                        <input type="text" name="imie" value= {this.state.imie} required onChange={this.ZmianaWCzasieRzeczywistynInput}/><br/>
                        <label>Nazwisko: </label><br/>
                        <input type="text" name="nazwisko" value= {this.state.nazwisko} required onChange={this.ZmianaWCzasieRzeczywistynInput}/><br/>
                        <label>Login: </label><br/>
                        <input type="text" name="login" value= {this.state.login} required onChange={this.ZmianaWCzasieRzeczywistynInput}/><br/>
                        <label>Hasło: </label><br/>
                        <input type="password" name="haslo" value= {this.state.haslo} required onChange={this.ZmianaWCzasieRzeczywistynInput}/><br/><br/>
                        <button id="zarej">Zarejestruj się!</button>

                        <center><p>Masz konto? </p><Link to="/logowanie">Zaloguj się!</Link></center>
                        
                    </form>
                </div>
            </div>
        );
      }
    }
    
export default Register;