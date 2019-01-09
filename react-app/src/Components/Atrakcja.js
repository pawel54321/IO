import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import axios from 'axios';
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import enGB from 'date-fns/locale/en-GB';
import { addMonths, addDays, subDays } from 'date-fns';
import history from '../history';
import Alert from 'react-s-alert';

class Atrakcja extends Component {
    constructor(props) {
        super(props);

        this.state = {
            atrakcja: [],
            dzien: '',
            startDate: addDays(new Date(), 1)
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.ZwrocAtrakcje();
        registerLocale('en-GB', enGB);
        setDefaultLocale('en-GB');
    }

    ZwrocAtrakcje = async () => {
        //console.log(this.props.location.state);
        const OdpowiedzSerwera9 = await axios.post('/api/ZwrocAtrakcje', { id: this.props.location.state.id_atr });

        this.setState({
            atrakcja: OdpowiedzSerwera9.data.atrakcja
        });
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    handleClick = async (event) => {
        event.preventDefault();
        const dzien = this.getParsedDate(this.state.startDate.toLocaleDateString('en-US'));
        //console.log(dzien);
        const rezerwacja = await axios.post('/api/Uzytkownik/Rezerwacja', { idAtrakcja: this.props.location.state.id_atr, dzien: dzien, uzytkownik: localStorage.getItem('username') });
        console.log(rezerwacja.data);
        if (rezerwacja.data.czy_zarezerwowano === true) {
            Alert.success('Rezerwacja wykonana!', { position: 'top' });
            history.push('/uzytkownik');
        } else {
            Alert.error('Brak wolnych miejsc w wybranym dniu!', { position: 'bottom' });
        }
    }

    getParsedDate(date) {
        const day = String(date).split('/');
        let d = day[1];
        let m = day[0];
        let y = day[2];

        if (parseInt(d) < 10) {
            d = "0" + d;
        }
        if (parseInt(m) < 10) {
            m = "0" + m;
        }
        return y + "-" + m + "-" + d;
    }

    render() {
        if (localStorage.getItem('loggedAs') === 'User') {
            return (
                <div>
                    <h5>Rezerwacja</h5>
                    <Row>
                        <Col sm='12' md={{ size: 6, offset: 3 }}>
                            <h5 style={{ textAlign: 'center', width: '100%' }}>Informacje o wybranej atrakcji:</h5>
                            <br /><br />
                            <h6 style={{ textAlign: 'center', width: '100%' }}>Nazwa: <b>{this.state.atrakcja.nazwa}</b></h6>
                            <h6 style={{ textAlign: 'center', width: '100%' }}>Adres: <b>{this.state.atrakcja.adres}</b></h6>
                            <h6 style={{ textAlign: 'center', width: '100%' }}>Godzina otwarcia: <b>{this.state.atrakcja.godzina_otwarcia}</b></h6>
                            <h6 style={{ textAlign: 'center', width: '100%' }}>Godzina zamknięcia: <b>{this.state.atrakcja.godzina_zamkniecia}</b></h6>
                            <h6 style={{ textAlign: 'center', width: '100%' }}>Cena: <b>{this.state.atrakcja.cena}</b></h6>
                            <br /><br />
                            <h5 style={{ textAlign: 'center', width: '100%' }}>Wybierz datę:</h5>
                            <center>
                                <DatePicker
                                    locale="en-GB"
                                    dateFormat="yyyy-MM-dd"
                                    selected={this.state.startDate}
                                    onChange={this.handleChange}
                                    minDate={new Date()}
                                    maxDate={addMonths(new Date(), 1)}
                                    showDisabledMonthNavigation
                                    excludeDates={[new Date(), subDays(new Date(), 0)]}
                                    withPortal
                                />
                                <br /><br />
                                <Button color='primary' onClick={this.handleClick}>Zarezerwuj</Button>
                                <br /><br /><br /><br />
                            </center>
                        </Col>
                    </Row>
                </div>
            );


        } else if (localStorage.getItem('loggedAs') === 'Admin') {
            return (
                <div>
                
                <Col sm='12' md={{ size: 12, offset: 0 }}>
                    <Row>

                        <h4 style={{textAlign: 'center', width: '100%'}}>
                        <br/> <br/> <br/> <br/> <br/> <br/> <br/>
                        <h1>Uwaga!</h1><br/>
                        Jesteś zalogowany jako Administrator!<br/>
                        Aby zarezerwować miejsce na daną atrakcję, skorzystaj z konta Użytkownika!
                        <br/><br/>
                       </h4>
                    </Row>
                </Col>
            </div>
            );
        }
    };
}

export default Atrakcja;
