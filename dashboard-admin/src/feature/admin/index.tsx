import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { makeStyles } from '@material-ui/core'

import Category from '../category/pages'
import Article from '../article/pages'
import Users from '../users/pages'
import Dashboard from '../dashboard'
import Sidebar from '../../components/SideBar/SideBar'

const useStyles = makeStyles({
  container: {
    width: "100%",
    fontFamily: 'Roboto',
  },
  appMain: {
    paddingLeft: '320px',
    paddingRight: '50px',
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    minHeight: '100vh'
  },
  appContainer: {
    paddingTop: '50px',
    maxWidth: '1440px',
    marginRight: 'auto',
    marginLeft: 'auto'
  }
})

export function Dashbaord() {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Route path="/admin" render={() => <Sidebar /> } />
      <div className={classes.appMain}>
        <div className={classes.appContainer}>
          <Switch>
            <Route exact path="/admin/dashboard" component={Dashboard} />
            <Route path="/admin/dashboard/articles" component={Article} />
            <Route path="/admin/dashboard/categories" component={Category} />
            <Route path="/admin/dashboard/users" component={Users} />
          </Switch>
        </div>
      </div>
    </div>
  )
}
