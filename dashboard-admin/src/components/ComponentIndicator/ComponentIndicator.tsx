import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
  },
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 20px',
    boxSizing: 'border-box'
  },
  chartDescription: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  pageIcon: {
    display: "inline-block",
    padding: '20px',
    color: "#3c44b1",
    '& .MuiSvgIcon-fontSizeLarge': {
      fontSize: '4rem',
    }
  },
})

interface Props {
  length: string
  title: string
  icon: any
}

export function ComponentIndicator(props: Props) {
  const { length, title, icon } = props

  const classes = useStyles()

  return (
      <Paper elevation={1} square className={classes.root}>
        <div className={classes.container}>
          <div className={classes.chartDescription}>
            <Typography variant="h1">
              {length}
            </Typography>
            <Typography>
              {title}
            </Typography>
          </div>
          <div className={classes.pageIcon}>
            {icon}
          </div>
        </div>
      </Paper>
  )
}