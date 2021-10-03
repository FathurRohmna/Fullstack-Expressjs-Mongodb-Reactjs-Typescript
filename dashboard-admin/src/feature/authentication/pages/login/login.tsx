import React, { useEffect } from 'react'

import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useHistory } from 'react-router-dom'

import Paper from '@material-ui/core/Paper'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'

import {makeStyles, createStyles, Theme} from '@material-ui/core'
import PersonIcon from "@material-ui/icons/Person"
import LockIcon from "@material-ui/icons/Lock"

import { checkAdminAuth } from '../../../../commons/check-authentication.common'

type FormValues = {
  email: string
  password: string
}

export interface Props {
  processLoading: boolean
  submitData: (data: FormValues) => void
  error: any | null
}

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(4)
    },
    avatar: {
      margin: theme.spacing(1)
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(3),
      '& .MuiInputAdornment-root': {
        color: theme.palette.primary.main
      }
    },
    error: {
      padding: '10px',
      color: 'red',
      width: '100%',
      border: '1px solid red',
      borderRadius: '5px'
    }
  })
)

const loginSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required()
})

export const Login = ({ submitData, processLoading, loginLoaded, error }: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(loginSchema)
  })
  const history = useHistory()

  useEffect(() => {
    if (checkAdminAuth()) {
      history.push("/admin/dashboard")
    }
  }, [processLoading])

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    submitData(data)
  };

  const classes = useStyles()

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
        <Paper elevation={1} className={classes.paper}>
          {error && <div className={classes.error}>
            <h3>Server : </h3>
              <Typography variant="h5">
                {error.error_msg}
              </Typography>
            </div>
          }
          <Avatar className={classes.avatar} />
          <Typography component="h1" variant="h2">
            Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className={classes.form}> 
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  variant="outlined"
                  fullWidth
                  placeholder="useremail@mail.com"
                  InputProps= {{
                    startAdornment:(<InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>)
                  }}
                  {...(errors.email && {error: true, helperText: errors.email.message})}
                  {...register('email')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  variant="outlined"
                  fullWidth
                  placeholder="********"
                  type="password"
                  InputProps= {{
                    startAdornment:(<InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>)
                  }}
                  {...(errors.password && {error: true, helperText: errors.password.message})}
                  {...register('password')}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Remember me"
                />
              </Grid>
              <Grid item xs={8}></Grid>
              <Grid item xs={4}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
    </Container>
  )
}

