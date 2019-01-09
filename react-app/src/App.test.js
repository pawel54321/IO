import React from 'react';
import ReactDOM from 'react-dom';

import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

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


it('renders without crashing - App', () => {
  shallow(<App />);
});

it('renders without crashing - Header', () => {
  shallow(<Header />);
});

it('renders without crashing - Footer', () => {
  shallow(<Footer />);
});

it('renders without crashing - DashboardAdmin', () => {
  shallow(<DashboardAdmin />);
});

it('renders without crashing - DashboardUser', () => {
  shallow(<DashboardUser />);
});

it('renders without crashing - Login', () => {
  shallow(<Login />);
});

it('renders without crashing - Register', () => {
  shallow(<Register />);
});

it('renders without crashing - HomePage', () => {
  shallow(<HomePage />);
});

it('renders without crashing - Atrakcja', () => {
  shallow(<Atrakcja />);
});

it('renders without crashing - DropdownMiejscowosc', () => {
  shallow(<DropdownMiejscowosc />);
});

it('renders without crashing - TabelaAtrakcja', () => {
  shallow(<TabelaAtrakcja />);
});

it('renders without crashing - TabelaMiejscowosc', () => {
  shallow(<TabelaMiejscowosc />);
});

it('renders without crashing - TabelaRezerwacja', () => {
  shallow(<TabelaRezerwacja />);
});

it('includes Header', () => {
  const app = shallow(<App />);
  expect(app.containsMatchingElement(<Header />)).toEqual(true);
});

it('includes Footer', () => {
  const app = shallow(<App />);
  expect(app.containsMatchingElement(<Footer />)).toEqual(true);
});
