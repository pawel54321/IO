import React, { Component } from 'react';

class Logout extends Component {

    render() {
        return (
            <div>
                {/*window.location.reload();
                <Header adminLogged={false} userLogged={false}></Header>*/}
                {window.location.reload()}
                {this.props.history.push('/')}
            </div>
        );
    }
}



export default Logout;