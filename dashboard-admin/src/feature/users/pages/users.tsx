import React, { useState, useEffect } from 'react'

import { useTable } from '../../../components/CustomHook'

import Paper from '@material-ui/core/Paper'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Toolbar from '@material-ui/core/Toolbar'
import TextField from '@material-ui/core/TextField'

import InputAdornment from '@material-ui/core/InputAdornment'

import { Controllers } from '../../../components/Controllers'

import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'

import { createStyles, makeStyles, Theme } from '@material-ui/core'

import Popup from '../../../components/Popup/Popup'
import UserForm from './userForm'

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
  { id: 'username', label: 'User Name' },
  { id: 'email', label: 'Email' },
  { id: 'permissionFlag', label: 'Permission Flag' },
  { id: "actions", label: "Actions", disableSorting: true }
]

export interface Props {
  getUsers: () => void
  users: any
  editUser: () => void
  deleteUser: () => void
}

export function Users({ getUsers, users, editUser, deleteUser }: Props) {
  const classes = useStyles()

  const [recordForEdit, setRecordForEdit] = useState(null)
  const [openPopup, setOpenPopup] = useState(false)
  const [filterFn, setFilterFn] = useState({fn: items => {return items; }})

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  } = useTable(users, headCells, filterFn)

  useEffect(() => {
    getUsers()
  }, [])

  const handleSearch = (e: React.ChangeEvent) => {
    let target = e.target
    setFilterFn({
      fn: items => {
        if (target.value === '')
          return items
        else 
          return items.filter(x => x.email.toLowerCase().includes(target.value))
      }
    })
  }

  const openInPopup = (item: any) => {
    setRecordForEdit(item)
    setOpenPopup(true)
  }

  const editSubmit = (user: any, resetForm: any) => {
    editUser(user)
    resetForm()
    setRecordForEdit(null)
    setOpenPopup(false)
  }

  return (
    <>
      <Paper className={classes.pageContent}>
        <Toolbar>
          <TextField
            className={classes.searchInput}
            label="Search User"
            InputProps= {{
                startAdornment:(<InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>)
              }}
            variant="outlined"
            onChange={handleSearch}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {
              users && recordsAfterPagingAndSorting().map((item: any, index: number) => (
                <TableRow key={item._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.firstName}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.permissionFlags}</TableCell>
                  <TableCell>
                      <Controllers.ActionButton
                        color="primary"
                        onClick={() => {openInPopup(item)}}
                      >
                        <EditOutlinedIcon fontSize="small" />
                      </Controllers.ActionButton>
                      <Controllers.ActionButton
                        color="secondary"
                        onClick={() => {deleteUser(item._id)}}
                      >
                        <CloseIcon fontSize="small" />
                      </Controllers.ActionButton>
                    </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </TblContainer>
        {users && <TblPagination /> }
      </Paper>
      <Popup
        title="Users Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <UserForm
          recordForEdit={recordForEdit}
          editSubmit={editSubmit}
        />
      </Popup>
    </>
  )
}
