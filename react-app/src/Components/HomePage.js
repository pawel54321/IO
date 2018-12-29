import React, {Component} from 'react';
import DropdownMiejscowosc from './DropdownMiejscowosc';
import CardAtrakcja from './CardAtrakcja';
import {Row, Col} from 'reactstrap';

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            atrakcje: [
                {
                    nazwa: 'nazwa1',
                    adres: 'adres1'
                },
                {
                    nazwa: 'nazwa2',
                    adres: 'adres2'
                },
                {
                    nazwa: 'nazwa3',
                    adres: 'adres4'
                },
                {
                    nazwa: 'nazwa5',
                    adres: 'adres6'
                },
                {
                    nazwa: 'nazwa17',
                    adres: 'adres8'
                },
                {
                    nazwa: 'nazwa28',
                    adres: 'adres29'
                },
                {
                    nazwa: 'nazwa11',
                    adres: 'adres11'
                },
                {
                    nazwa: 'nazwa22',
                    adres: 'adres22'
                }
            ]
        }
    }

    render() {
        let atrakcjeCards = this.state.atrakcje.map(atrakcja => {
            return (
                <Col xl='4' lg='6' xs='12'>
                    <CardAtrakcja atrakcja = {atrakcja} />
                </Col>
            )
        });

        return (
            <div>
                <h5>Strona Główna</h5>
    
                <DropdownMiejscowosc />
                
                <Col sm='12' md={{ size: 6, offset: 3 }}>
                    <Row>
                        {atrakcjeCards}
                    </Row>
                </Col>
            </div>
        );
    }
}

export default HomePage;