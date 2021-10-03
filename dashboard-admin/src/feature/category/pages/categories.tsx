import React, { useState, useEffect } from 'react'

import { useTable } from '../../../components/CustomHook'

import Paper from '@material-ui/core/Paper'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Toolbar from '@material-ui/core/Toolbar'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import InputAdornment from '@material-ui/core/InputAdornment'

import SearchIcon from '@material-ui/icons/Search'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

import Popup from '../../../components/Popup/Popup'
import { Controllers } from '../../../components/Controllers'

import CategoiresForm, { FormValues } from './categoriesForm'

import { createStyles, makeStyles, Theme } from '@material-ui/core'

export interface Props {
  categoriesLoaded: boolean 
  getCategories: () => void
  categories: any
  submitData: (data: FormValues) => void
  deleteCategory: (data: any) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageContent: {
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
  { id: 'id', label: 'No.' },
  { id: 'name', label: 'Categoy Name' },
  { id: 'articles', label: 'Articles' },
  { id: "actions", label: "Actions", disableSorting: true }
]

interface ICategory {
  id: string
  name: string
  articles: string[]
}

export const Categories = ({ categoriesLoaded, getCategories, categories, submitData, deleteCategory }: Props) => {
  const classes = useStyles()

  const [openPopup, setOpenPopup] = useState<boolean>(false)
  const [filterFn, setFilterFn] = useState({fn: items => {return items; }})

  const handleSearch = (e: React.ChangeEvent) => {
    let target = e.target
    setFilterFn({
      fn: items => {
        if (target.value === '')
          return items
        else 
          return items.filter(x => x.name.toLowerCase().includes(target.value))
      }
    })
  }

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  } = useTable(categories, headCells, filterFn)

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <>
      <Paper className={classes.pageContent}>
        <Toolbar>
          <TextField
            className={classes.searchInput}
            label="Search Category"
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
            onClick={() => setOpenPopup(true)}
          >Add New</Button>
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {
              categories && recordsAfterPagingAndSorting().map((item: ICategory) => (
                <TableRow key={item._id}>
                  <TableCell>{item._id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.articles.length} Articles</TableCell>
                  <TableCell>
                    <Controllers.ActionButton
                      color="secondary"
                      onClick={() => deleteCategory(item._id)}
                    >
                      <CloseIcon fontSize="small" />
                    </Controllers.ActionButton>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </TblContainer>
        {categories && <TblPagination />}
      </Paper>
      <Popup
        title="Categories Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <CategoiresForm
          sendData={submitData}
          setOpenPopup={setOpenPopup}
        />
      </Popup>
    </>
  ) 
}
