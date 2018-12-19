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


it('renders without crashing - App', () => {
  shallow(<App />);
});

it('renders without crashing = Header', () => {
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

it('includes Header', () => {
  const app = shallow(<App />);
  expect(app.containsMatchingElement(<Header />)).toEqual(true)
});

it('includes Footer', () => {
  const app = shallow(<App />);
  expect(app.containsMatchingElement(<Footer />)).toEqual(true)
});

it('includes HomePage', () => {
  const app = shallow(<App />);
  expect(app.containsMatchingElement(<HomePage />)).toEqual(false)
});

it('includes DashboardAdmin', () => {
  const app = shallow(<App />);
  expect(app.containsMatchingElement(<DashboardAdmin />)).toEqual(false)
});

it('includes DashboardUser', () => {
  const app = shallow(<App />);
  expect(app.containsMatchingElement(<DashboardUser />)).toEqual(false)
});

it('includes Login', () => {
  const app = shallow(<App />);
  expect(app.containsMatchingElement(<Login />)).toEqual(false)
});

it('includes Register', () => {
  const app = shallow(<App />);
  expect(app.containsMatchingElement(<Register />)).toEqual(false)
});
