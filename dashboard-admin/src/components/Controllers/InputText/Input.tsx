import React from 'react'

import TextField, { StandardTextFieldProps } from '@material-ui/core/TextField'

interface Props extends StandardTextFieldProps {
  other: any
}

const Input: React.FC<Props> = ({
  name,
  label,
  value,
  error,
  InputProps,
  onChange,
  placeholder,
  ...other
}) => {

  return (
    <TextField
      name={name}
      variant="outlined"
      label={label}
      value={value}
      placeholder={placeholder}
      InputProps={InputProps}
      onChange={onChange}
      {...(error && {error: true, helperText: error.message})}
      {...other}
    />
  )
}

export default Input
