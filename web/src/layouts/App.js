/**
 * File: App.js
 * Project: NYCParking
 * File Created: 14 October 2018 4:55 PM
 * -----
 */

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from '../redux/store';
import DashboardLayout from './Dashboard';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={DashboardLayout} />
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
};

export default App;