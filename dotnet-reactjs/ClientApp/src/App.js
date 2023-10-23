import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
// import { AppDeposit } from "./components/App_deposit";
import AppDeposit from './components/App_deposit';

// ตอนนี้คุณสามารถใช้ Appdeposit() ใน App.js


import './App.css';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
   
       <AppDeposit/>
     
    );
  }
}
