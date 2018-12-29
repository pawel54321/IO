import React, { Component } from 'react';
import { Card, Button, CardText,
 CardSubtitle, CardBody, CardHeader} from 'reactstrap';

class CardAtrakcja extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card style={{marginBottom: '20px'}}> 
                <CardHeader className='text-center'>{this.props.atrakcja.nazwa}</CardHeader>
                <CardBody className='text-center' style={{backgroundColor: '#ddd'}}>
                    <CardSubtitle>Adres: {this.props.atrakcja.adres}</CardSubtitle>
                    <CardText>jakis tekst</CardText>
                    <Button color='primary'>Zarezerwuj</Button>
                </CardBody>
            </Card>
        );
    };
}

export default CardAtrakcja;
