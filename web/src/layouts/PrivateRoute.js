import store from 'store';
import React from 'react';
import Loading from '../components/Loading';
import { graphql } from 'react-apollo';
import verifyToken from '../gql/query/verifyToken';
import renderForError from '../components/renderForError';
import renderWhileLoading from "../components/renderWhileLoading";
import { Route, Redirect, withRouter } from 'react-router-dom';
import { compose, withProps, branch, renderComponent } from 'recompose';

class PrivateRoute extends React.Component {
  render() {
    const { data: { verifyToken }, component: Component, ...props } = this.props;

    if (!verifyToken) {
      return null;
    }

    return (
      <Route
        {...props}
        render={props => <Component {...props} />}
      />
    )
  }
}

export default compose(
  withRouter,
  withProps(() => {
    return {
      redirect: `/login`,
    }
  }),
  branch(
    () => !store.get('token'),
    renderComponent((props) => <Redirect to={props.redirect} />)
  ),
  graphql(verifyToken, {
    options: () => ({
      variables: {
        token: store.get('token'),
      }
    }),
  }),
  renderForError((props) => {
    store.remove('token');
    return <Redirect to={props.redirect} />
  }),
  renderWhileLoading(Loading, 'verifyToken'),
)(PrivateRoute);