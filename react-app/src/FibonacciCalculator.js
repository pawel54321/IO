import React, { Component } from 'react';

class FibonacciCalculator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            seenIndexes: [],
            values: {},
            index: ''
        }
    }

    render() {
        return (
            <div>
                <p>Hello world</p>
            </div>
        );
    }
}

export default FibonacciCalculator;