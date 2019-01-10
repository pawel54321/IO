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

class LocalStorageMock {
    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        this.store[key] = value.toString();
    }

    removeItem(key) {
        delete this.store[key];
    }
};
global.localStorage = new LocalStorageMock;


it('renders Header while Admin', () => {
    localStorage.setItem('loggedAs', 'Admin');
    const header = shallow(<Header/>);
    expect(header.find("header").length).toBe(1);
    expect(header.find("nav").length).toBe(1);
    localStorage.clear();
});

it('renders Header while User', () => {
    localStorage.setItem('loggedAs', 'User');
    const header = shallow(<Header/>);
    expect(header.find("header").length).toBe(1);
    expect(header.find("nav").length).toBe(1);
    localStorage.clear();
});

it('renders Header', () => {
    localStorage.setItem('loggedAs', '');
    const header = shallow(<Header/>);
    expect(header.find("header").length).toBe(1);
    expect(header.find("nav").length).toBe(1);
    localStorage.clear();
});

it('renders Footer', () => {
    const f = shallow(<Footer/>);
    expect(f.find('div').length).toBeGreaterThan(0);
});

it('renders DashboardAdmin', () => {
    const da = shallow(<DashboardAdmin/>);
    expect(da.find('h1').length).toBe(1);
    expect(da.find('h1').text()).toEqual('Znajdujesz się w Panelu Administratora!');
    expect(da.find('div').length).toBeGreaterThan(0);
});

it('renders DashboardUser', () => {
    const du = shallow(<DashboardUser/>);
    expect(du.find('h5').length).toBe(1);
    expect(du.find('p').length).toBe(1);
    expect(du.find('h5').text()).toEqual('Panel Użytkownika');
    expect(du.find('p').text()).toEqual('Witaj! ');
    expect(du.find('div').length).toBeGreaterThan(0);
});

it('renders Login', () => {
    const login = shallow(<Login/>);
    expect(login.find('h5').length).toBe(1);
    expect(login.find('p').length).toBe(1);
    expect(login.find('h5').text()).toEqual('Logowanie:');
    expect(login.find('p').text()).toEqual('Nie masz konta? ');
    expect(login.find('div').length).toBeGreaterThan(0);
});

it('renders Register', () => {
    const register = shallow(<Register/>);
    expect(register.find('h5').length).toBe(1);
    expect(register.find('p').length).toBe(1);
    expect(register.find('h5').text()).toEqual('Rejestracja:');
    expect(register.find('p').text()).toEqual('Masz konto? ');
    expect(register.find('div').length).toBeGreaterThan(0);
});

it('renders HomePage', () => {
    const hp = shallow(<HomePage/>);
    expect(hp.find('h5').length).toBe(1);
    expect(hp.find('h3').length).toBe(1);
    expect(hp.find('h1').length).toBe(1);
    expect(hp.find('h5').text()).toEqual('Strona Główna');
    expect(hp.find('h1').text()).toEqual('Witamy!');
    expect(hp.find('h3').text()).toEqual('Dziękujemy za korzystanie z serwisu i życzymy udanych rezerwacji!');
});

it('renders HomePage while User', () => {
    localStorage.setItem('loggedAs', 'User');
    const hp = shallow(<HomePage/>);
    expect(hp.find('h5').length).toBe(3);
    expect(hp.find('div').length).toBeGreaterThan(0);
    localStorage.clear();
});

it('renders Atrakcja while Admin', () => {
    localStorage.setItem('loggedAs', 'Admin');
    const atr = shallow(<Atrakcja/>);
    expect(atr.find('div').length).toBeGreaterThan(0);
    expect(atr.find('h1').length).toBe(1);
    expect(atr.find('h4').length).toBe(1);
    expect(atr.find('h1').text()).toEqual('Uwaga!');
    localStorage.clear();
});

it('renders Atrakcja while User', () => {
    localStorage.setItem('loggedAs', 'User');
    const atr = shallow(<Atrakcja/>);
    expect(atr.find('div').length).toBeGreaterThan(0);
    expect(atr.find('h5').length).toBe(3);
    expect(atr.find('h6').length).toBe(5);
    localStorage.clear();
});

it('renders DropdownMiejscowosc', () => {
    const dm = shallow(<DropdownMiejscowosc/>);
    expect(dm.find('select').length).toBe(1);
});

it('renders TabelaAtrakcja', () => {
    const ta = shallow(<TabelaAtrakcja/>);
    expect(ta.find('div').length).toBeGreaterThan(0);
});

it('renders TabelaMiejscowosc', () => {
    const tm = shallow(<TabelaMiejscowosc/>);
    expect(tm.find('div').length).toBeGreaterThan(0);
});

it('renders TabelaRezerwacja', () => {
    const tr = shallow(<TabelaRezerwacja/>);
    expect(tr.find('div').length).toBeGreaterThan(0);
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
    const da = shallow(<DashboardAdmin/>);
    expect(da.containsMatchingElement(<TabelaMiejscowosc/>)).toEqual(true);
});

it('DashboardAdmin includes TabelaAtrakcja', () => {
    const da = shallow(<DashboardAdmin/>);
    expect(da.containsMatchingElement(<TabelaAtrakcja/>)).toEqual(true);
});

it('DashboardUser includes TabelaRezerwacja', () => {
    const du = shallow(<DashboardUser/>);
    expect(du.containsMatchingElement(<TabelaRezerwacja/>)).toEqual(true);
});

it('HomePage includes DropdownMiejscowosc while User', () => {
    localStorage.setItem('loggedAs', 'User');
    const hp = shallow(<HomePage/>);
    expect(hp.containsMatchingElement(<DropdownMiejscowosc/>)).toEqual(true);
    localStorage.clear();
});

it('set date after state is changed', () =>{
    localStorage.setItem('loggedAs', 'User');
    const atr = shallow(<Atrakcja/>);
    atr.setState({startDate:'2019-01-15'});
    expect(hp.getElement(<DatePicker/>).props.selected).toEqual('2019-01-15');
    atr.setState({startDate:'2021-12-19'});
    expect(hp.getElement(<DatePicker/>).props.selected).toEqual('2021-12-19');
    localStorage.clear();
});
