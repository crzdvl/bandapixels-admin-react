import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import { LoginPage } from './pages/login/LoginPage';
import { isAuth, isNotAuth } from './helpers/isAuth';
import { TagsPage } from './pages/tags/TagsPage';

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={isNotAuth(LoginPage)} />
      <Route exact path="/posts" component={isAuth(TagsPage)} />
    </Switch>
  </div>
);

const withRouterApp = withRouter(App);

export { withRouterApp as App };
