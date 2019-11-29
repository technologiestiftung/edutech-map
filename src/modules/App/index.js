import React, { Component } from 'react';
import {
  Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import { connect } from 'unistore/react';
import history from '~/history';

import Actions, { loadDataApi } from '~/state/Actions';
import AppWrapper from './AppWrapper';
import Store from '~/state/Store';

const loadDataApiAction = Store.action(loadDataApi(Store));
loadDataApiAction();

// const loadDataAction = Store.action(loadData(Store));
// loadDataAction();

const updateLocation = Store.action(loadDataApiAction);

history.listen(location => updateLocation(location));

const NotFoundRoute = () => (
  <Redirect to="/" />
);

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path={['/', '/suche', '/analyse', '/liste', '/favoriten', '/info']} component={AppWrapper} />
          <Route component={NotFoundRoute} />
        </Switch>
      </Router>
    )
  }
}

export default connect(
  state => state,
  Actions
)(App);
