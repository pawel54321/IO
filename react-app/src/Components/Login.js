import React, { Component } from 'react';

import axios from 'axios';

class Login extends Component {
    
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




render() {
    return (
        <div>
        <p>INDEX:{this.renderSeenIndexes()}</p>
        </div>
    );
  }
}

export default Login;