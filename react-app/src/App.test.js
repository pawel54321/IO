import React from 'react';
import ReactDOM from 'react-dom';

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import DatePicker from "react-datepicker";

import App from './App';
import Header from './Components/Header';
import DashboardAdmin from './Components/DashboardAdmin';
import DashboardUser from './Components/DashboardUser';
import Login from './Components/Login';
import Register from './Components/Register';
import Footer from './Components/Footer';
import HomePage from './Components/HomePage';
import Atrakcja from './Components/Atrakcja';
import CardAtrakcja from './Components/CardAtrakcja';
import DropdownMiejscowosc from './Components/DropdownMiejscowosc';
import TabelaAtrakcja from './Components/TabelaAtrakcja';
import TabelaMiejscowosc from './Components/TabelaMiejscowosc';
import TabelaRezerwacja from './Components/TabelaRezerwacja';


configure({ adapter: new Adapter() });


it('renders Header', () => {
    shallow(<Header/>);
});

it('renders Footer', () => {
    shallow(<Footer/>);
});

it('renders DashboardAdmin', () => {
    const da = shallow(<DashboardAdmin/>);
    expect(da.find('h1').length).toBe(1);
    expect(da.find('h1').text()).toEqual('Znajdujesz się w Panelu Administratora!');
    expect(da.find('div')).toBeGreaterThan(0);
});

it('renders DashboardUser', () => {
    const du = shallow(<DashboardUser/>);
    expect(du.find('h5').length).toBe(1);
    expect(du.find('p').length).toBe(1);
    expect(du.find('h5').text()).toEqual('Panel Użytkownika');
    expect(du.find('p').text()).toEqual('Witaj! ');
    expect(du.find('div')).toBeGreaterThan(0);
});

it('renders Login', () => {
    const login = shallow(<Login/>);
    expect(login.find('h5').text()).toEqual('Logowanie:');
    expect(login.find('p').text()).toEqual('Nie masz konta? ');
});

it('renders Register', () => {
    const register = shallow(<Register/>);
    expect(register.find('h5').text()).toEqual('Rejestracja:');
    expect(register.find('p').text()).toEqual('Masz konto? ');
});

it('renders HomePage', () => {
    const hp = shallow(<HomePage/>);
    expect(hp.find('h5').text()).toEqual('Strona Główna');
    expect(hp.find('h1').text()).toEqual('Witamy!');
    expect(hp.find('h3').text()).toEqual('Dziękujemy za korzystanie z serwisu i życzymy udanych rezerwacji!');
});

it('renders Atrakcja', () => {
    shallow(<Atrakcja/>);
});

it('renders DropdownMiejscowosc', () => {
    shallow(<DropdownMiejscowosc/>);
});

it('renders TabelaAtrakcja', () => {
    shallow(<TabelaAtrakcja/>);
});

it('renders TabelaMiejscowosc', () => {
    shallow(<TabelaMiejscowosc/>);
});

it('renders TabelaRezerwacja', () => {
    shallow(<TabelaRezerwacja/>);
});

it('App includes Header', () => {
    const app = shallow(<App/>);
    expect(app.containsMatchingElement(<Header/>)).toEqual(true);
});

it('App includes Footer', () => {
    const app = shallow(<App/>);
    expect(app.containsMatchingElement(<Footer/>)).toEqual(true);
});

it('DashboardAdmin includes TabelaMiejscowosc', () => {
    const app = shallow(<DashboardAdmin/>);
    expect(app.containsMatchingElement(<TabelaMiejscowosc/>)).toEqual(true);
});

it('DashboardAdmin includes TabelaAtrakcja', () => {
    const app = shallow(<DashboardAdmin/>);
    expect(app.containsMatchingElement(<TabelaAtrakcja/>)).toEqual(true);
});

it('DashboardUser includes TabelaRezerwacja', () => {
    const app = shallow(<DashboardUser/>);
    expect(app.containsMatchingElement(<TabelaRezerwacja/>)).toEqual(true);
});

it('changes date according to state', () => {
    const rez = shallow(<Atrakcja/>);
    rez.setState({startDate: '2019-01-15'});
    expect(rez.getElement(<DatePicker/>).props.selected).toEqual('2019-01-15');
    rez.setState({startDate: '2021-04-18'});
    expect(rez.getElement(<DatePicker/>).props.selected).toEqual('2021-04-18');
});
