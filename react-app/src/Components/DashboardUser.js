import React, { Component } from 'react';


class DashboardUser extends Component {


    render() {
        return (
            <div>
                {this.Wywolaj}
                <h5>Panel Użytkownika</h5>
                <p>Witaj! {/*{this.props.imie} {this.props.nazwisko}, ({this.props.login})*/}</p>
            </div>
        );
    }
}

export default DashboardUser;