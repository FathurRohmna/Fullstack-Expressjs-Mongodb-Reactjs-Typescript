import React,{ useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'

import { makeStyles, Theme, createStyles } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon' 
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

import AssessmentIcon from '@material-ui/icons/Assessment'
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark'
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import { checkAdminAuth } from '../../commons/check-authentication.common'

const drawerWidth = 250

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: drawerWidth,
      position: "fixed",
      left: 0,
      top: 0,
      height: "100%",
      background: "white",
      paddingTop: '50px',
      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      display: "flex",
      justifyContent: "center"
    },
    main: {
      width: "100%",
      height: '100%',
      position: 'relative'
    },
    link: {
      textDecoration: "none",
      color: "black",
    },
    list: {
      '& .MuiList-root': {
        margin: 0
      }
    },
    logout: {
      position: 'relative',
    },
    avatarContainer: {
      position: 'relative',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      marginBottom: theme.spacing(2),
    },
    avatar: {
      width: '80px',
      height: '80px'
    },
    listItems: {
      paddingLeft: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    adminCard: {
      textAlign: 'center',
      marginBottom: theme.spacing(4),
    }
  })
)

const routerItems = [
  { title: "Dashboard", router: "/admin/dashboard", icon: <AssessmentIcon /> },
  { title: "Articles", router: "/admin/dashboard/articles", icon: <CollectionsBookmarkIcon /> },
  { title: "Categories", router: "/admin/dashboard/categories", icon: <DynamicFeedIcon /> },
  { title: "Users", router: "/admin/dashboard/users", icon: <SupervisorAccountIcon /> }
]

export default function Sidebar() {
  const classes = useStyles()
  const history = useHistory()

  const [ userId, setUserId ] = useState(null)
  
  useEffect(() => {
    const cookiUserId = checkAdminAuth()

    setUserId(cookiUserId)
  }, [])

  const handleLogout = () => {
    Cookies.remove('Authorization');
    Cookies.remove('RefreshToken');
    history.replace('/authentication/login')
  }

  return (
    <div className={classes.container}>
      <div className={classes.main}>

        <div className={classes.adminCard}>
          <Typography variant="h6" component="h2">userId: <b>{userId}</b></Typography>
        </div>

        <div className={classes.listItems}>
          {routerItems.map((router, i) => {
            return (
              <div key={i}>
                <Link to={router.router} className={classes.link}>
                  <List>
                    <ListItem button key={router.title}>
                      <ListItemIcon>
                        {router.icon}
                      </ListItemIcon>
                      <ListItemText primary={router.title} />
                    </ListItem>
                  </List>
                </Link>
              </div>
            )
          })}
        </div>

        <List className={classes.logout}>
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
          </ListItem>
        </List>
      </div>
    </div>
  )
}
