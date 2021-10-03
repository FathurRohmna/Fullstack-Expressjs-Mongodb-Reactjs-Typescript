import React from 'react'

import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import CheckBox, {CheckboxProps} from '@material-ui/core/Checkbox'

interface Props extends CheckboxProps {}


const MuiCheckbox: React.FC<Props> = ({
  name,
  label,
  value,
  onChange
}) => {

  const convertToDefEventParam = (name: any, value: any) => ({
    target: {
      name, value
    }
  })

  return (
    <FormControl>
      <FormControlLabel
        control={<CheckBox
          name={name}
          color="primary"
          checked={value}
          onChange={(e: any) => onChange(convertToDefEventParam(name, e.target.checked))}
        />}
        label={label}
      />
    </FormControl>
  )
}

export default MuiCheckbox
