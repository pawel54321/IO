import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import OtherPage from './Components/OtherPage';
import Site from './Components/Site';
import Login from './Components/Login';

class App extends Component {


  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Link to="/">Home</Link>
            <Link to="/other-page">Other Page</Link>
          </header>
          <div>               
            <Route exact path="/" component={Site} />
            <Route exact path="/other-page" component={OtherPage} />

            <Route component={Login} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
