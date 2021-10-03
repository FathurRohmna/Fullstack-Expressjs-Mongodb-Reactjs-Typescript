import React, { useEffect, useState } from 'react'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Toolbar from '@material-ui/core/Toolbar'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

import SearchIcon from '@material-ui/icons/Search'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'

import { useTable } from '../../../components/CustomHook'
import Popup from '../../../components/Popup/Popup'
import { Controllers } from '../../../components/Controllers'

import ArticlesForm, { FormValues } from './articlesForm'

export interface Props {
  articles: any
  articlesLoaded: boolean
  articleDataLoaded: () => void
  categories: any
  getCategories: () => void
  submitData: (data: FormValues) => void
  deleteArticle: (data: any) => void
  editArticle: (data: any) => void
}

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    paper: {
      padding: theme.spacing(4),
      '& .MuiToolbar-root': {
        padding: 0
      }
    },
    searchInput: {
      width: '75%'
    },
    newButton: {
      position: "absolute",
      right: "10px"
    },
  })
)

const headCells = [
  { id: 'no', label: 'NO.' },
  { id: 'title', label: 'Title' },
  { id: 'description', label: 'Description' },
  { id: 'paid', label: 'Paid' },
  { id: "actions", label: "Actions", disableSorting: true }
]

export function Articles({ articlesLoaded, getArticle, categories, getCategories, articles, submitData, deleteArticle, editArticle }: Props) {

  const classes = useStyles()

  const [recordForEdit, setRecordForEdit] = useState(null)
  const [openPopup, setOpenPopup] = useState(false)
  const [filterFn, setFilterFn] = useState({fn: items => {return items; }})

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  } = useTable(articles, headCells, filterFn)

  useEffect(() => {
    getArticle()
    getCategories()
  }, [])

  console.log(articles);

  const handleSearch = (e: React.ChangeEvent) => {
    let target = e.target
    setFilterFn({
      fn: items => {
        if (target.value === '')
          return items
        else 
          return items.filter(x => x.title.toLowerCase().includes(target.value))
      }
    })
  }

  const addOrEdit = (article: any, resetForm: any) => {
    if (article._id)
      editArticle(article)
    else
      submitData(article)
    resetForm()
    setRecordForEdit(null)
    setOpenPopup(false)
  }

  const openInPopup = (item: any) => {
    setRecordForEdit(item)
    setOpenPopup(true)
  }

  return (
    <>
      <Paper className={classes.paper}>
        <Toolbar>
          <TextField
            className={classes.searchInput}
            label="Search Article"
            InputProps= {{
                startAdornment:(<InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>)
              }}
            variant="outlined"
            onChange={handleSearch}
          />
          <Button
            className={classes.newButton}
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => {setOpenPopup(true); setRecordForEdit(null)}}
          >Add New</Button>
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {
              articles && recordsAfterPagingAndSorting().map((article) => (
                <TableRow key={article._id}>
                  <TableCell>{article._id}</TableCell>
                  <TableCell>{article.title}</TableCell>
                  <TableCell>{article.description}</TableCell>
                  <TableCell>{article.paid.toString()}</TableCell>
                  <TableCell>
                    <Controllers.ActionButton
                      color="primary"
                      onClick={() => {openInPopup(article)}}
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </Controllers.ActionButton>
                    <Controllers.ActionButton
                      color="secondary"
                      onClick={() => deleteArticle(article._id)}
                    >
                      <CloseIcon fontSize="small" />
                    </Controllers.ActionButton>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </TblContainer>
        {articles && <TblPagination />}
      </Paper>
      <Popup
        title="Article Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ArticlesForm
          categoriesData={categories}
          sendData={submitData}
          recordForEdit={recordForEdit}
          addOrEdit={addOrEdit}
        />
      </Popup>
    </>
  )
}
