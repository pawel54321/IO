import React, { Component } from 'react';
import { Card, Button, CardText, CardBody, CardHeader, CardTitle} from 'reactstrap';
import axios from 'axios';
import history from '../history';

class CardAtrakcja extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id_atr: ''
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        this.ZwrocenieIdAtrakcji();
    }

    ZwrocenieIdAtrakcji = async () => {
        const OdpowiedzSerwera7 = await axios.post('/api/ZwrocIdAtrakcji', { nazwaAtrakcji: this.props.atrakcja.nazwa });
        //console.log(OdpowiedzSerwera7.data.id);
        this.setState({
            id_atr: OdpowiedzSerwera7.data.id
        }, () => {
            this.linkPush();
        });
        //console.log(this.state);
    }

    linkPush = () => {
        history.push({
            pathname: '/rezerwacja',
            state: {
                id_atr: this.state.id_atr
            }
        });
    }

    render() {
        return (
            <Card style={{marginBottom: '20px', boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)'}}> 
                <CardHeader className='text-center' style={{backgroundColor: '#ddd'}}><b><i>{this.props.atrakcja.nazwa}</i></b></CardHeader>
                <CardBody className='text-center'>
                    <CardText><b>Adres:</b> {this.props.atrakcja.adres}</CardText>
                    {/*<CardText><b>Liczba miejsc:</b> {this.props.atrakcja.liczba_miejsc}</CardText>*/}
                    <CardText><b>Godz. otwarcia:</b> {this.props.atrakcja.godzina_otwarcia}</CardText>
                    <CardText><b>Godz. zamknięcia:</b> {this.props.atrakcja.godzina_zamkniecia}</CardText>
                    <CardTitle><b>Cena: </b> {this.props.atrakcja.cena}</CardTitle>
                    <Button color='primary' onClick={this.handleClick}>Wybierz</Button>
                </CardBody>
            </Card>
        );
    };
}

export default CardAtrakcja;
