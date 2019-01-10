import React, { Component } from 'react';
import axios from 'axios';
import TabelaRezerwacja from './TabelaRezerwacja';
import { Row, Col } from 'reactstrap';

class DashboardUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            daneBilet: []
        };

        this.ZwrocenieTabeliBilety();
    }

    ZwrocenieTabeliBilety = async () => {
        const OdpowiedzSerwera8 = await axios.post('/api/Uzytkownik/Panel_Uzytkownika/Zwroc_Tabele_Bilety', { login: localStorage.getItem('username') });
        this.setState({
            daneBilet: OdpowiedzSerwera8.data.daneBilet,
        });

        document.getElementsByClassName('crud-table__header-cell')[0].click();
    }

    render() {
        return (
            <div>
                {this.Wywolaj}
                <h5>Panel Użytkownika</h5>
                <p>Witaj! {/*{this.props.imie} {this.props.nazwisko}, ({this.props.login})*/}</p>

                <Row className="show-grid">
                    <Col xs={6} md={3} >
                    </Col>
                    <Col xs={6} md={6} >
                        <br />
                        <TabelaRezerwacja daneBilet={this.state.daneBilet} />
                        <br /><br /><br /><br /><br />
                    </Col>
                    <Col xs={6} md={3} >
                    </Col>
                </Row>
            </div>
        );
    }
}

export default DashboardUser;
