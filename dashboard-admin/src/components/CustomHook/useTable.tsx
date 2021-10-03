import React, { useState } from 'react'

import { createStyles, makeStyles, Theme } from '@material-ui/core'

import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import TableSortLabel from '@material-ui/core/TableSortLabel'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      marginTop: theme.spacing(3),
      '& thead th': {
        fontWeight: '600',
        backgroundColor: theme.palette.primary.main
      },
      '& tbody td': {
        fontWeight: '300',
      },
      '& tbody tr:hover': {
        backgroundColor: '#fffbf2',
        cursor: 'pointer',
      }
    }
  })
)

interface HeadCell {
  id: string
  label: string
  disableSorting?: boolean
}

export default function useTable(records: any, headCells: HeadCell[], filterFn: any) {

  const classes = useStyles()

  const pages = [5, 10, 25]
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(pages[page])
  const [order, setOrder] = useState<any>()
  const [orderBy, setOrderBy] = useState<any>()
  
  interface TableProps {
    children: React.ReactNode
  }

  const TblContainer = (props: TableProps) => (
    <Table className={classes.table}>
      {props.children}
    </Table>
  )

  const TblHead = (props: any) => {

    const handleSortRequest = (cellId: string) => {
      const isAsc = cellId === cellId && order === "asc"
      setOrder(isAsc ? "desc" : "asc")
      setOrderBy(cellId)
    }

    return (
      <TableHead>
        <TableRow>
          {
            headCells.map((headCell: HeadCell) => ( 
              <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order: false}>
                {headCell.disableSorting ? headCell.label : 
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={() => {handleSortRequest(headCell.id)}}
                  >
                    {headCell.label}
                  </TableSortLabel>
                }
              </TableCell>
            ))
          }
        </TableRow>
      </TableHead>
    )
  }

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const TblPagination = () => (<TablePagination
    component="div"
    page={page}
    rowsPerPage={rowsPerPage}
    rowsPerPageOptions={pages}
    count={records.length}
    onPageChange={handleChangePage}
    onRowsPerPageChange={handleChangeRowsPerPage}
  />)

  function stableSort(array: [], comparator: (a: [], b: []) => any) {
    const stabilizedThis = array.map((el: [], index: any) => [el, index])
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0])
      if (order !== 0) return order
      return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0])
  }

  function getComparator(order: string, orderBy: string) {
    return order === "desc"
      ? (a: any, b: any) => descendingComparator(a, b, orderBy)
      : (a: any, b: any) => -descendingComparator(a, b, orderBy)
  } 

  function descendingComparator(a: [], b: [], orderBy: any) {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
  }

  const recordsAfterPagingAndSorting = () => {
    return stableSort(filterFn.fn(records), getComparator(order, orderBy)).slice(page * rowsPerPage, (page + 1) * rowsPerPage)
  }

  return {
    TblHead,
    TblContainer,
    TblPagination,
    recordsAfterPagingAndSorting
  }
}
