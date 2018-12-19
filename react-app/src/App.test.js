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


configure({ adapter: new Adapter() });


it('renders without crashing', () => {
  shallow(<App />);
});

it('renders without crashing', () => {
  shallow(<Header />);
});

it('renders without crashing', () => {
  shallow(<Footer />);
});

it('renders without crashing', () => {
  shallow(<DashboardAdmin />);
});

it('renders without crashing', () => {
  shallow(<DashboardUser />);
});

it('renders without crashing', () => {
  shallow(<Login />);
});

it('renders without crashing', () => {
  shallow(<Register />);
});

it('renders without crashing', () => {
  shallow(<HomePage />);
});

it('includes Header', () => {
  const app = shallow(<App />);
  expect(app.containsMathingElement(<Header />)).toEqual(true)
});

it('includes Footer', () => {
  const app = shallow(<App />);
  expect(app.containsMathingElement(<Footer />)).toEqual(true)
});

it('includes HomePage', () => {
  const app = shallow(<App />);
  expect(app.containsMathingElement(<HomePage />)).toEqual(true)
});

it('includes DashboardAdmin', () => {
  const app = shallow(<App />);
  expect(app.containsMathingElement(<DashboardAdmin />)).toEqual(true)
});

it('includes DashboardUser', () => {
  const app = shallow(<App />);
  expect(app.containsMathingElement(<DashboardUser />)).toEqual(true)
});

it('includes Login', () => {
  const app = shallow(<App />);
  expect(app.containsMathingElement(<Login />)).toEqual(true)
});

it('includes Register', () => {
  const app = shallow(<App />);
  expect(app.containsMathingElement(<Register />)).toEqual(true)
});
