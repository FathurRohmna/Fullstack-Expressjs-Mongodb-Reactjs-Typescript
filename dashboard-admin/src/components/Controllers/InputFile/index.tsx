import React from 'react'

import { makeStyles, createStyles, Theme } from '@material-ui/core'
import TextField, { StandardTextFieldProps } from '@material-ui/core/TextField'

interface Props extends StandardTextFieldProps {
  other: any
}

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      display: 'none'
    }
  }))

const InputFile: React.FC<Props> = ({
  name,
  error,
  onChange,
  id,
  other
}) => {

  const classes = useStyles()

  const convertToDefEventParam = (name: any, value: any) => ({
    target: {
      name, value
    }
  })

  return (
    <TextField
      name={name}
      type="file"
      accept="image/*"
      id={id}
      className={classes.root}
      onChange={(e: any) => onChange(convertToDefEventParam(name, e.target.value))}
      {...(error && {error: true, helperText: error.message})}
      {...other}
    />
  )
}

export default InputFile