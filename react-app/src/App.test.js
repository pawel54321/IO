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


it('renders Header', () => {
  const header = shallow(<Header/>);
  expect(header.find(<NavItem/>).objectContaining(<NavLink/>));
  expect(header.find(<Nav/>).objectContaining(<NavItem/>));
});

it('renders Footer', () => {
  const footer = shallow(<Footer/>);
  expect(footer.find(<Navbar/>).objectContaining(<NavbarBrand/>));
  expect(footer.find(<NavbarBrand/>).objectContaining(<Link/>));
});

it('renders DashboardAdmin', () => {
  const da = shallow(<DashboardAdmin/>);
  //expect(da.find(''))
});

it('renders DashboardUser', () => {
  shallow(<DashboardUser/>);
});

it('renders Login', () => {
  shallow(<Login/>);
});

it('renders Register', () => {
  shallow(<Register/>);
});

it('renders HomePage', () => {
  shallow(<HomePage/>);
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
