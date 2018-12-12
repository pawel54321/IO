import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, /*Link*/ } from 'react-router-dom';

import Page from './Components/Page';
import Site from './Components/Site';
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
            <Route exact path="/" component={Site} />
            <Route exact path="/strona" component={Page} />
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
