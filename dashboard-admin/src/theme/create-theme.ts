import { ThemeOptions } from '@material-ui/core'
import { createTheme } from '@material-ui/core/styles'
import typography from './typography'

export function createMuiTheme(options: ThemeOptions) {
  return createTheme({
    palette: {
      background: {
        default: '#F4F4F4',
        paper: '#FFFFFF'
      },
      primary: {
        main: '#ea6003',
        light: "#3c44b126"
      },
      secondary: {
        main: "#f83245",
        light: "#f8324526"
      },
    },
    typography,
    overrides: {
      MuiAppBar: {
        root: {
          transform: 'translateZ(0)'
        }
      }
    }
  })
}
