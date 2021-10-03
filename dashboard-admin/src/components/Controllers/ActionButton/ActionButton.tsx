import React from 'react'

import Button from '@material-ui/core/Button'

import { makeStyles, createStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      minWidth: 0,
      margin: theme.spacing(0.5)
    },
    secondary: {
      backgroundColor: theme.palette.secondary.light,
      '& .MuiButton-label': {
        color: theme.palette.secondary.main
      }
    },
    primary: {
      backgroundColor: theme.palette.primary.light,
      '& .MuiButton-label': {
        color: theme.palette.primary.main
      }
    },
  })
)

interface Props {
  color: string
  children: React.ReactNode
  onClick: () => void
}

export default function ActionButton(props: Props) {

  const { color, children, onClick } = props
  const classes = useStyles()

  return (
    <Button className={`${classes.root} ${classes[color]}`} onClick={onClick}>
      {children}
    </Button>
  )

}
