import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {Link as RouterLink} from 'react-router-dom'
import { useHistory } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import { checkAdminAuth } from '../../../../commons/check-authentication.common'

type FormValues = {
  firstName: string
  lastName: string 
  email: string
  password: string
}

const registerSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required(),
})

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
      margin: theme.spacing(1),
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(3)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
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

export function Register({ submitData, processLoading, error}: Props) {
  const {register, handleSubmit, formState: { errors }} = useForm<FormValues>({
    resolver: yupResolver(registerSchema)
  })
  const history = useHistory()

  useEffect(() => {
    if (checkAdminAuth()) {
      history.push("/admin/dashboard")
    }
  }, [processLoading])

  const onSubmit: SubmitHandler<FormValues> = data => submitData(data);

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
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h2">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="First Name *"
                {...(errors.firstName && {error: true, helperText: errors.firstName.message})}
                {...register('firstName')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="Last Name *"
                {...(errors.lastName && {error: true, helperText: errors.lastName.message})}
                {...register('lastName')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Email Address *"
                fullWidth
                {...(errors.email && {error: true, helperText: errors.email.message})}
                {...register('email')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Password *"
                type="password"
                fullWidth
                {...(errors.password && {error: true, helperText: errors.password.message})}
                {...register('password')}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
            <Grid item xs={7}></Grid>
            <Grid item xs={5}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
              >
                Sign Up
              </Button>
            </Grid>
            <Grid item>
              <RouterLink to="/authentication/login">
                <Link variant="body2">
                  Already have an account? Sign in
                </Link>
              </RouterLink>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}
