import React, { Component } from 'react';
import './App.css';
import { Router, Route, /*Link*/ } from 'react-router-dom';

import history from './history';

import HomePage from './Components/HomePage';

import DashboardAdmin from './Components/DashboardAdmin';
import DashboardUser from './Components/DashboardUser';
//import Logout from './Components/Logout';

import Atrakcja from './Components/Atrakcja';

import Login from './Components/Login';
import Register from './Components/Register';

import Header from './Components/Header';
import Footer from './Components/Footer';

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
    //localStorage.setItem('loggedAs',loggedAs);
    //alert(localStorage.getItem('loggedAs'));

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
      <Router history={history}>

        <div className="App">

          <Header loggedAs={/*this.state.loggedAs*/localStorage.getItem('loggedAs')} />
          <main>
            {this.props.children}
            <center><Alert stack={{ limit: 1 }} html={false} timeout={2000} effect='bouncyflip' offset={65} /></center>

            {this.Ruty()}
          </main>
          <Footer />
        </div>

      </Router>
    );
  }


  Ruty = () => {
    if (localStorage.getItem('loggedAs') === 'Admin') {
      return (
        <div>
          <Route exact path="/" component={HomePage} />

          <Route exact path="/admin" component={DashboardAdmin} />
          {/*<Route exact path="/uzytkownik" component={DashboardUser} />*/}
          {/* <Route exact path="/wyloguj" component={this.LogoutComponent} /> */}

          {/*<Route exact path="/logowanie" component={this.LoginComponent} />*/}
          {/*<Route exact path="/rejestracja" component={Register} />*/}
        </div>
      );
    }

    else if (localStorage.getItem('loggedAs') === 'User') {
      return (
        <div>
          <Route exact path="/" component={HomePage} />

          {/* <Route exact path="/admin" component={DashboardAdmin} />*/}
          <Route exact path="/uzytkownik" component={DashboardUser} />
          {/* <Route exact path="/wyloguj" component={this.LogoutComponent} /> */}
          <Route exact path="/rezerwacja" component={Atrakcja} />
          {/* <Route exact path="/logowanie" component={this.LoginComponent} />*/}
          {/* <Route exact path="/rejestracja" component={Register} />*/}
        </div>
      );
    }
    else {
      return (
        <div>
          <Route exact path="/" component={HomePage} />

          {/* <Route exact path="/admin" component={DashboardAdmin} />*/}
          {/* <Route exact path="/uzytkownik" component={DashboardUser} />*/}
          {/* <Route exact path="/wyloguj" component={this.LogoutComponent} /> */}

          <Route exact path="/logowanie" component={this.LoginComponent} />
          <Route exact path="/rejestracja" component={Register} />
        </div>
      );
    }

  }




}



export default App;
