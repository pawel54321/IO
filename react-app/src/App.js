import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, /*Link*/ } from 'react-router-dom';

import HomePage from './Components/HomePage';

import DashboardAdmin from './Components/DashboardAdmin';
import DashboardUser from './Components/DashboardUser';
//import Logout from './Components/Logout';

import Login from './Components/Login';
import Register from './Components/Register';

import Header from './Components/Header';
import Footer from './Components/Footer'

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
// optional - you can choose the effect you want
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedAs: ''
    }
  }

  handleUserLoggedChange = (loggedAs) => {
    // debugger

    this.setState({
      loggedAs: loggedAs
    });
  }

  LoginComponent = () => {
    return (<Login onLoggedUserChange={this.handleUserLoggedChange} />);
  }
/*
  HeaderComponent = () => {
    return (<Header onLoggedUserChange={this.handleUserLoggedChange} />);
  }*/
  /*
    LogoutComponent = () => {
      return (<Logout onLoggedUserChange2={this.handleUserLoggedChange} />);
    }
  */

  render() {
    return (
      <Router>

        <div className="App">
          <Header loggedAs={this.state.loggedAs} />
      
          <main>
            {this.props.children}
            <center><Alert stack={{ limit: 2 }} html={false} effect='bouncyflip' offset={69} /></center>

            <Route exact path="/" component={HomePage} />
            <Route exact path="/admin" component={DashboardAdmin} />
            <Route exact path="/uzytkownik" component={DashboardUser} />
            {/* <Route exact path="/wyloguj" component={this.LogoutComponent} /> */}

            <Route exact path="/logowanie" component={this.LoginComponent} />
            <Route exact path="/rejestracja" component={Register} />
          </main>
          <Footer />
        </div>

      </Router>
    );
  }
}

export default App;
