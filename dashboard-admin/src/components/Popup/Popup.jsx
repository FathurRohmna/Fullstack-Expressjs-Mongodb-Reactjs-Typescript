import React from 'react'

import { makeStyles, createStyles, Theme } from '@material-ui/core'

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'

import CloseIcon from '@material-ui/icons/Close'

import { Controllers } from '../Controllers'

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    dialogWrapper: {
      padding: theme.spacing(2),
    },
    dialogTitle: {
      paddingRight: '0px'
    }
  })
)

interface Props {
  title: string;
  children: React.ReactNode;
  openPopup: boolean;
  setOpenPopup?: () => void;
}

export default function Popup(props: Props) {

  const classes = useStyles()
  const { title, children, openPopup, setOpenPopup } = props

  return (
    <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: 'flex'}}>
          <Typography variant="h4" component="div" style={{ flexGrow: 1}}>
            {title}
          </Typography>
          <Controllers.ActionButton
            color="secondary"
            onClick={() => {setOpenPopup(false)}}
          >
            <CloseIcon />
          </Controllers.ActionButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        {children}
      </DialogContent>
    </Dialog>
  )
}
