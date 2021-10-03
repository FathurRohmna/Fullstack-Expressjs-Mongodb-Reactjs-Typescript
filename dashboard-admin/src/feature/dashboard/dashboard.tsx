import React, { useState, useEffect } from 'react'

import { Line } from 'react-chartjs-2';

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'

import { useTable } from '../../components/CustomHook'
import {ComponentIndicator} from '../../components/ComponentIndicator/ComponentIndicator'

const useStyles = makeStyles({
  section: {
    marginTop: 10,
    marginBottom: 10,
  },
  container: {
    marginTop: 20,
    marginBottom: 20
  }
})

const articlesHeadCells = [
  { id: 'no', label: 'Title' },
  { id: 'paid', label: 'Paid'}
]

const categoriesHeadCells = [
  { id: 'name', label: 'Category Name' }
]


export const Dashboard = ({ users, usersData, usersLength, categories, articles, getUsers, getArticle, getCategories, getUsersData }) => {
  const classes = useStyles()

  const [filterFn, setFilterFn] = useState({fn: items => {return items; }})

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  } = useTable(articles, articlesHeadCells, filterFn)

  const {
    TblHead: CategoryHead,
    TblContainer: CategoryContainer,
    TblPagination: CategoryPagination,
    recordsAfterPagingAndSorting: categoryrecordsAfterPagingAndSorting
  } = useTable(categories, categoriesHeadCells, filterFn)

  useEffect(() => {
    getArticle()
    getCategories()
    getUsersData()
  }, [])

  return (
    <Grid container spacing={1}>
      <Grid item md={12} xs={12}>
        <Card className={classes.section}>
          <List>
            <ListItem>
                <Typography component="h1" variant="h2">
                  Dashboard
                </Typography>
              </ListItem>
            <ListItem className={classes.container}>
              <Grid container spacing={5}>
                <Grid item md={4}>
                  <ComponentIndicator
                    title="Users"
                    length={usersLength && usersLength}
                  />
                </Grid>

                <Grid item md={4}>
                  <ComponentIndicator
                    title="Articles"
                    length={articles && articles.length}
                  />
                </Grid>

                <Grid item md={4}>
                  <ComponentIndicator
                    title="Categories"
                    length={categories && categories.length}
                  />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
                <Typography component="h1" variant="h2">
                  Users Chart
                </Typography>
              </ListItem>
            <ListItem className={classes.container}>
              {usersData && <Line
                      data={{
                        labels: usersData.map((x) => x._id),
                        datasets: [
                          {
                            label: 'Users',
                            backgroundColor: 'rgba(162, 222, 208, 1)',
                            data: usersData.map((x) => x.count)
                          }
                        ]
                      }}
                      options={{
                        legend: { display: true, position: 'right' },
                      }}
                    >
                    </Line>}
            </ListItem>
          </List>
        </Card>
      </Grid>
      <Grid item md={12}>
        <Card className={classes.section}>
          <List>
            <ListItem>
              <Grid container spacing={4}>
                <Grid item md={9}>
                  <Typography variant="h4" content="h1">
                    Articles
                  </Typography>
                  <TblContainer>
                    <TblHead />
                    <TableBody>
                      {articles && recordsAfterPagingAndSorting().map((article) => (
                        <TableRow key={article._id}>
                          <TableCell>{article.title}</TableCell>
                          <TableCell>{article.paid.toString()}</TableCell>
                        </TableRow>))
                      }
                    </TableBody>
                  </TblContainer>
                  {articles && <TblPagination />}
                </Grid>

                <Grid item md={3}>
                  <Typography variant="h4" content="h1">
                    Categories
                  </Typography>
                  <CategoryContainer>
                    <CategoryHead />
                    <TableBody>
                      {categories && categoryrecordsAfterPagingAndSorting().map((category) => (
                        <TableRow key={category._id}>
                          <TableCell>{category.name}</TableCell>
                        </TableRow>))
                      }
                    </TableBody>
                  </CategoryContainer>
                  {categories && <CategoryPagination />}
                </Grid>
              </Grid>
            </ListItem>
          </List>
        </Card>
      </Grid>
    </Grid>
  )
}
