import React, { lazy } from 'react'
import { BrowserRouter as Router, Switch,  Redirect } from 'react-router-dom'
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'
import Auth, { useAuthActions } from "use-eazy-auth";
import { AuthRoute, GuestRoute } from "use-eazy-auth/routes";
import { ConfigureRj } from "react-rocketjump";
import { map } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const CreateAccount = lazy(() => import('./pages/CreateAccount'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))

const login = (credentials = {}) =>
  ajax({
    url: "/api/token/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: credentials,
  }).pipe(
    map(({ response }) => ({
      accessToken: response.access,
      refreshToken: response.refresh,
    }))
  );

const me = (token) =>
  ajax.getJSON("/api/me/", {
    Authorization: `Bearer ${token}`,
  });

const refresh = (refreshToken) =>
  ajax({
    url: "/api/token/refresh/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: { refresh: refreshToken },
  }).pipe(
    map(({ response }) => ({
      refreshToken,
      accessToken: response.access,
    }))
  );

function ConfigureAuth({ children }) {
  const { callAuthApiObservable } = useAuthActions();
  return (
    <ConfigureRj effectCaller={callAuthApiObservable}>{children}</ConfigureRj>
  );
}
export default function App() {
  return (
    <Auth loginCall={login} meCall={me} refreshTokenCall={refresh}>
      <ConfigureAuth>
        <Router>
          <AccessibleNavigationAnnouncer />
          <Switch>
            <GuestRoute
              path="/login"
              component={Login}
              redirectTo="/app/dashboard"
            />
            <GuestRoute path="/create-account" component={CreateAccount} />
            <GuestRoute path="/forgot-password" component={ForgotPassword} />
            {/* Place new routes over this */}
            <AuthRoute
              path="/app/*"
              component={Layout}
              exact
              redirectTo="/login"
            />
            {/* If you have an index page, you can remothis Redirect */}
            {/* <Redirect exact from="/" to="/login" /> */}
          </Switch>
        </Router>
      </ConfigureAuth>
    </Auth>
  );
}


