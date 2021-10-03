import React, { useEffect, useState } from 'react'

import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import { makeStyles, createStyles, Theme } from '@material-ui/core'

import { Form } from '../../../components/CustomHook/useForm'
import { Controllers } from '../../../components/Controllers'

export type FormValues = {
  name: string
}

const Schema = yup.object().shape({
  name: yup.string().required()
})

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    button: {
      marginTop: theme.spacing(4)
    }
  })
)

interface Props {
  sendData: (data: FormValues) => void
  setOpenPopup: boolean
}

export default function CategoriesForm({ sendData, setOpenPopup }: Props ) {
  const classes = useStyles()

  const { register, handleSubmit, formState: { errors }, setValue} = useForm<FormValues>({
    resolver: yupResolver(Schema)
  })

  const onSubmit: SubmitHandler<FormValues> = data => {
    sendData(data)
    setOpenPopup(false)
  };

  useEffect(() => {
    register('name')
  }, [])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controllers.Input
            label="Name"
            fullWidth
            error={errors.name}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => setValue('name', event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
          >
            Post
          </Button>
        </Grid>
      </Grid>
    </Form>
  )
}
