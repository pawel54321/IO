import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//import axios from 'axios';

class Login extends Component {
   /* 
    constructor(props) {
    super(props);

    this.state = {
        seenIndexes: [],
        values: {},
        index: ''
    }
}
  fetchIndexes = async () => {
    const seenIndexes = await axios.get('/api/values/all');
    
    this.setState({
        seenIndexes: seenIndexes.data
    });
}
renderSeenIndexes() {
  return this.state.seenIndexes.map(({ number }) => number).join(', ');
}
<p>INDEX:{this.renderSeenIndexes()}</p>
*/




render() {
    return (
        <div>  
            <div id="BarLogow">
                <h3>Logowanie:</h3>
            </div>
            <div id="BarLogow2">
                <form onSubmit=""> 
                    <label>Login: </label><br/>
                    <input type="text" required onChange=""/><br/>
                    <label>Hasło: </label><br/>
                    <input type="password" required onChange=""/><br/><br/>
                    <button id="zalo">Zaloguj się!</button>

                    <center><p>Nie masz konta? </p><Link to="/rejestracja">Zarejestruj się!</Link></center>
                    
                </form>
            </div>
        </div>
    );
  }
}

export default Login;