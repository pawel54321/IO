import React, { Component } from 'react';
import { Card, Button, CardText, CardBody, CardHeader, CardTitle} from 'reactstrap';

class CardAtrakcja extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card style={{marginBottom: '20px', boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)'}}> 
                <CardHeader className='text-center' style={{backgroundColor: '#ddd'}}><b><i>{this.props.atrakcja.nazwa}</i></b></CardHeader>
                <CardBody className='text-center'>
                    <CardText><b>Adres:</b> {this.props.atrakcja.adres}</CardText>
                    {/*<CardText><b>Liczba miejsc:</b> {this.props.atrakcja.liczba_miejsc}</CardText>*/}
                    <CardText><b>Godz. otwarcia:</b> {this.props.atrakcja.godzina_otwarcia}</CardText>
                    <CardText><b>Godz. zamkniecia:</b> {this.props.atrakcja.godzina_zamkniecia}</CardText>
                    <CardTitle><b>Cena: </b> {this.props.atrakcja.cena}</CardTitle>
                    <Button color='primary'>Zarezerwuj</Button>
                </CardBody>
            </Card>
        );
    };
}

export default CardAtrakcja;
