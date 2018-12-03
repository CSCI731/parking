/**
 * File: App.js
 * Project: NYCParking
 * File Created: 14 October 2018 4:55 PM
 * -----
 */

import React from 'react';
import Store from 'store';
import { Provider } from 'react-redux';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from '../redux/store';
import DashboardLayout from './Dashboard';
import LoginLayout from './LoginLayout';
import PrivateRoute from './PrivateRoute';
import AdminLayout from './Admin';
import { setContext } from 'apollo-link-context';
import PublicRoute from "./PublicRoute";

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_SERVER_URI,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = Store.get('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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