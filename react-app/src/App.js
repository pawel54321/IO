import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import OtherPage from './Components/OtherPage';
import Site from './Components/Site';
import Login from './Components/Login';
import Register from './Components/Register';
import Header from './Components/Header';
import Foother from './Components/Foother'



class App extends Component {


  render() {
    return (
      <Router>
        <div className="App">
          <Header/>
          <main>            
            <Route exact path="/" component={Site} />
            <Route exact path="/other-page" component={OtherPage} />
            <Route exact path="/logowanie" component={Login} />
            <Route exact path="/rejestracja" component={Register} />  
          </main>
          <Foother/>
        </div>
      </Router>
    );
  }
}
     
export default App;
