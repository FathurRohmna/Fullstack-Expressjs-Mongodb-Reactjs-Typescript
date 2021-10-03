import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Login from './login'
import Register from './register'

export function Authentication() {
  return (
    <Switch>
      <Route path="/authentication/login" component={Login} />
      <Route path="/authentication/register" component={Register} />
    </Switch>
  )
}
