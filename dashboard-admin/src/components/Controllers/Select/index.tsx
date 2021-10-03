import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'

interface Props {
  name: string
  label: string 
  value: string
  error: string | null
  onChange: () => void 
  options: string[]
}

export default function MuiSelect({
  name,
  label, 
  value,
  error,
  onChange,
  options
}: Props) {
  return (
    <FormControl
      variant="outlined"
      {...(error && {error:true})}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        name={name}
        value={value}
        onChange={onChange}
      >
        {
          options.map((item: any) => 
          (<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>))
        }
      </Select>
      { error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}
