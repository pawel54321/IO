import React, { Component } from 'react';
import axios from 'axios';

export default class DropdownMiejscowosc extends Component {
    constructor(props) {
        super(props);

        this.state = {
            daneMiejscowosc: [],
            Miejscowosc: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    ZwrocenieTabeliMiejscowosc = async () => {
        const OdpowiedzSerwera5 = await axios.post('/api/Uzytkownik/Panel_Admina/Zwroc_Tabele_Miejscowosc', { daneMiejscowosc: this.state.daneMiejscowosc });

        //prompt(JSON.stringify(OdpowiedzSerwera5.data.daneMiejscowosc));
        this.setState({
            daneMiejscowosc: OdpowiedzSerwera5.data.daneMiejscowosc,
        });
    }

    handleChange(event) {
        this.props.miejscowosc(event.target.value);
        this.setState({
            Miejscowosc: event.target.value
        });
    }

    render() {
        this.ZwrocenieTabeliMiejscowosc();
        let miejscowosci = this.state.daneMiejscowosc.map(miejscowosc => {
            return (
                <option id={miejscowosc.id}>{miejscowosc.nazwamiejscowosc}</option>
            )
        });

        return (
            <select value={this.state.Miejscowosc} onChange={this.handleChange}>
                {miejscowosci}
            </select>
        );
    }
}
