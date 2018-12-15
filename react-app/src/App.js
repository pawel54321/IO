import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, /*Link*/ } from 'react-router-dom';

import HomePage from './Components/HomePage';

import DashboardAdmin from './Components/DashboardAdmin';
import DashboardUser from './Components/DashboardUser';
import Logout from './Components/Logout';

import Login from './Components/Login';
import Register from './Components/Register';

import Header from './Components/Header';
import Footer from './Components/Footer'



class App extends Component {


  render() {
    return (
      <Router>
        <div className="App">
          <Header/>
          <main>                 
            <Route exact path="/" component={HomePage} />
            <Route exact path="/admin" component={DashboardAdmin} />
            <Route exact path="/uzytkownik" component={DashboardUser} />
            <Route exact path="/wyloguj" component={Logout} />

            <Route exact path="/logowanie" component={Login} />
            <Route exact path="/rejestracja" component={Register} />  
          </main>
          <Footer/>
        </div>
      </Router>
    );
  }
}
     
export default App;
