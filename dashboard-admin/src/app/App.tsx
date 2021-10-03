import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core'

import { Authentication } from '../feature/authentication/pages'
import { createMuiTheme } from '../theme/create-theme'
import { Dashbaord } from '../feature/admin'
import http from '../commons/http-istance.common'
import { checkAdminAuth } from '../commons/check-authentication.common'

const refreshToken = async () => {
  try {
    await http.post('http://localhost:8080/authentication/refresh-token')

    console.log('refresh token herreeee');
  } catch (error) {
    console.log(error.message)
  }
}


export const PrivateAdminRoute = ({component, ...rest}: any) => {
  const routeComponent = (props) => {
    const checkAuth = checkAdminAuth()

    if (checkAuth != false) {
      refreshToken(checkAuth)

      return (
        React.createElement(component, props)
      )
    } else {
      return (
        <Redirect to={{pathname: '/authentication/login'}} />
      )
    }
  }

  return <Route {...rest} render={routeComponent} />

}

function App() {
  const theme = createMuiTheme({})

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/authentication" component={Authentication} />
          <PrivateAdminRoute path="/admin" component={Dashbaord} />
          <Redirect to="/admin/dashboard" />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
