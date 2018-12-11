import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


class Register extends Component {

    render() {
        return (
            <div>  
                <div id="BarLogow">
                    <h3>Rejestracja:</h3>
                </div>
                <div id="BarLogow2">
                    <form onSubmit=""> 
                        <label>Login: </label><br/>
                        <input type="text" onChange=""/><br/>
                        <label>Hasło: </label><br/>
                        <input type="password" onChange=""/><br/><br/>
                        <button id="zarej">Zarejestruj się!</button>

                        <center><p>Masz konto? </p><Link to="/logowanie">Zaloguj się!</Link></center>
                        
                    </form>
                </div>
            </div>
        );
      }
    }
    
export default Register;