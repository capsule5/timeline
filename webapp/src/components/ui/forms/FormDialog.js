import React from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import withMobileDialog from "@material-ui/core/withMobileDialog"
import "./FormDialog.scss"

class FormDialog extends React.Component {
  state = {
    open: false,
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { open } = this.state
    const {
      children, buttonText, formTitle, fullScreen,
    } = this.props
    return (
      <div className="form-dialog">
        <Button onClick={ this.handleClickOpen } variant="contained" color="primary" fullWidth className="form-dialog__button">
          {buttonText}
        </Button>
        <Dialog
          fullScreen={ fullScreen }
          open={ open }
          onClose={ this.handleClose }
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="form-dialog-title">{formTitle}</DialogTitle>
          <DialogContent>{children}</DialogContent>
        </Dialog>
      </div>
    )
  }
}

export default withMobileDialog()(FormDialog)
