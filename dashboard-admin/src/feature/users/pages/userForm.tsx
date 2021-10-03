import React, { useEffect } from 'react'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import { Form, useForm as useFormHook } from '../../../components/CustomHook/useForm'
import { Controllers } from '../../../components/Controllers'

const initialOfValues = {
  firstName: '',
  lastName: '',
  email: '',
  permissionFlags: 0
}

const permissionFlags = [
  {id: 1, title: 'Free acount'},
  {id: 2, title: 'Paid member'},
  {id: 5, title: 'Admin'}
]

interface Props {
  recordForEdit: any
  editSubmit: () => void
}


export default function UserForm({recordForEdit, editSubmit}: Props) {

  const {
    values,
    setValues,
    resetForm,
    handleInputChange
  } = useFormHook(initialOfValues)

  const onSubmit = e => {
    e.preventDefault()
    editSubmit(values, resetForm);;
  }

  useEffect(() => {
    if (recordForEdit != null) {
      setValues({
        ...recordForEdit
      })
    }
  }, [recordForEdit, setValues])

  return (
    <Form onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Controllers.Input
            name="firstName"
            label="First Name"
            fullWidth
            value={values.firstName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Controllers.Input
            name="lastName"
            label="Last Name"
            fullWidth
            value={values.lastName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={8}>
          <Controllers.Input
            name="email"
            label="Email"
            fullWidth
            value={values.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={4}>
          <Controllers.MuiSelect
            name="permissionFlags"
            label="Permission Flag"
            value={values.permissionFlags}
            onChange={handleInputChange}
            options={permissionFlags}
            // error={errors.departmentId}
          />
        </Grid>
        <Grid item xs={9}></Grid>
        <Grid item xs={3}>
          <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
          >
            Post
          </Button>
        </Grid>
      </Grid>
    </Form>
  )
}
