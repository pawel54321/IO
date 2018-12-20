import React, { Component } from 'react';


class DashboardUser extends Component {


    render() {
        return (
            <div>
                {this.Wywolaj}
                <h2>Panel Użytkownika</h2>
                <p>Witaj! {/*{this.props.imie} {this.props.nazwisko}, ({this.props.login})*/}</p>
            </div>
        );
    }
}

export default DashboardUser;