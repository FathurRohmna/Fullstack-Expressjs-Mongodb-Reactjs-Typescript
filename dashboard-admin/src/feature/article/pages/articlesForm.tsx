import React, { useEffect } from 'react'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'

import { makeStyles, createStyles, Theme } from '@material-ui/core'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'

import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import { Form, useForm as useFormHook } from '../../../components/CustomHook/useForm'
import { Controllers } from '../../../components/Controllers'

const initialOfValues = {
  title: '',
  description: '',
  content: '',
  categories: [],
  paid: true,
  image: undefined
}

interface Props {
  sendData: (data: FormValues) => void
  categoriesData: any
  addOrEdit: any
  recordForEdit: any
}

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    chips: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    chip: {
      margin: 2
    },
    noLabel: {
      marginTop: theme.spacing(3)
    },
    button: {
      marginTop: theme.spacing(4)
    }
  })
)

export default function ArticlesForm({categoriesData, sendData, addOrEdit, recordForEdit}: Props) {
  const classes = useStyles()
  const mdParser = new MarkdownIt()

  const {
    values,
    setValues,
    resetForm,
    handleInputChange
  } = useFormHook(initialOfValues)

  const handleEditorChange = (value) => ({
    target: {
      value,
      name: 'content'
    }
  })

  const onSubmit = e => {
    e.preventDefault()
    addOrEdit(values, resetForm);
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
            name="title"
            label="Title"
            fullWidth
            value={values.title}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Controllers.Input
            name="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={values.description}
            variant="outlined"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          {/* <Controllers.MdEditor
            name="content"
            value={values.content}
            onChange={handleInputChange}
          /> */}
          <MdEditor
            style={{
              height: '500px'
            }}
            value={values.content}
            renderHTML={text => mdParser.render(text)}
            onChange={({ text }) => handleInputChange(handleEditorChange(text))}
          />
        </Grid>
        <Grid item xs={4}>
          <Controllers.InputFile 
            id="raised-button-file"
            accept="image/*"
            name="image"
            onChange={handleInputChange}
          />

          <label htmlFor="raised-button-file">
            <Button variant="contained" component="span">
              Upload Image
            </Button>
          </label>
        </Grid>
        <Grid item xs={4}>
          <FormControl variant="outlined">
            <InputLabel id="demo-mutiple-chip-label">Categories</InputLabel>
            <Select
              name="categories"
              labelId="demo-mutiple-chip-label"
              id="demo-multiple-chip"
              input={<Input id="select-multiple-chip" />}
              multiple
              value={values.categories}
              onChange={handleInputChange}
              renderValue={() => values.categories.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            >
              {categoriesData && categoriesData.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <Controllers.MuiCheckbox 
            name="paid"
            label="Paid Memeber ?"
            value={values.paid}
            onChange={handleInputChange}
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
            className={classes.button}
          >
            Post
          </Button>
        </Grid>
      </Grid>
    </Form>
  )
}
