/**
 * File: App.js
 * Project: NYCParking
 * File Created: 14 October 2018 4:55 PM
 * -----
 */

import React from 'react';
import { Provider } from 'react-redux';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from '../redux/store';
import DashboardLayout from './Dashboard';
import LoginLayout from './LoginLayout';
import PrivateRoute from './PrivateRoute';
import AdminLayout from './Admin';
import PublicRoute from "./PublicRoute";

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_SERVER_URI,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <div className="App">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={DashboardLayout} />
              <PublicRoute exact path="/login" component={LoginLayout} />
              <PrivateRoute path="/admin" component={AdminLayout} />
            </Switch>
          </BrowserRouter>
        </div>
      </ApolloProvider>
    </Provider>
  );
};

export default App;