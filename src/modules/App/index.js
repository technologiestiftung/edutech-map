import React, { Component } from 'react';
import {
  Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import { connect } from 'unistore/react';
import history from '~/history';

import Actions, { loadEntryData } from '~/state/Actions';
import AppWrapper from './AppWrapper';
import Store from '~/state/Store';
import queryString from 'query-string';

const loadEntryDataAction = Store.action(loadEntryData(Store));

function syncLocation(state, location) {
  const parsedQuery = queryString.parse(location.search);

  if (!parsedQuery.location) {
    return {
      detailData: false
    };
  }

  loadEntryDataAction(parsedQuery.location);

  return {};
}


const updateLocation = Store.action(syncLocation);

history.listen(location => updateLocation(location));

updateLocation(history.location);

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
