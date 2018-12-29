import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import axios from 'axios';

export default class DropdownMiejscowosc extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
        dropdownOpen: false,
        daneMiejscowosc: []
        };
    }

    toggle() {
        this.setState(prevState => ({
        dropdownOpen: !prevState.dropdownOpen
        }));
    }

    ZwrocenieTabeliMiejscowosc = async () => {
        const OdpowiedzSerwera5 = await axios.post('/api/Uzytkownik/Panel_Admina/Zwroc_Tabele_Miejscowosc', { daneMiejscowosc: this.state.daneMiejscowosc });

        prompt(JSON.stringify(OdpowiedzSerwera5.data.daneMiejscowosc));
        this.setState({
            daneMiejscowosc: OdpowiedzSerwera5.data.daneMiejscowosc,
        });
    }

    render() {
        return (
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
            Wybierz miejscowość
            </DropdownToggle>
            <DropdownMenu>
            <DropdownItem>Some Action</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        );
    }
}
