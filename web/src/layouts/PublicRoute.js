import store from 'store';
import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { compose, withProps, branch, renderComponent } from 'recompose';

class PublicRoute extends React.Component {
  render() {
    const { component: Component, ...props } = this.props;

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
      redirect: `/admin`,
    }
  }),
  branch(
    () => store.get('token'),
    renderComponent((props) => <Redirect to={props.redirect} />)
  ),
)(PublicRoute);