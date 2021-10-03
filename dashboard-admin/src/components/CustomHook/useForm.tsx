import React, { useState } from 'react'

import { createStyles, makeStyles, Theme } from '@material-ui/core'

export function useForm(initialOfValues: any) {

  const [values, setValues] = useState<any>(initialOfValues)

  const handleInputChange = (event: React.ChangeEvent) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value as string[],
    })
  }

  const resetForm = () => {
    setValues(initialOfValues)
  }

  return {
    values,
    setValues,
    resetForm,
    handleInputChange
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiFormControl-root': {
        width: '100%',
      }
    }
  })
)

interface Props {
  children: React.ReactNode
  other: any
}

export function Form(props: Props) {

  const classes = useStyles()
  const { children, ...other } = props

  return (
    <form className={classes.root} autoComplete="off" { ...other }>
      {children}
    </form>
  )
  
}
