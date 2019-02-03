import React from "react"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import withMobileDialog from "@material-ui/core/withMobileDialog"
import CloseIcon from "@material-ui/icons/Close"
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
    const childrenWithProps = React.cloneElement(children, { closeDialog: this.handleClose })

    return (
      <div className="form-dialog">
        <Button
          onClick={ this.handleClickOpen }
          variant="contained"
          color="primary"
          fullWidth
          className="form-dialog__button"
        >
          {buttonText}
        </Button>
        <Dialog fullScreen={ fullScreen } open={ open } fullWidth maxWidth="sm">
          <IconButton onClick={ this.handleClose } className="button--close">
            <CloseIcon />
          </IconButton>
          <DialogTitle id="form-dialog-title">{formTitle}</DialogTitle>
          <DialogContent>{childrenWithProps}</DialogContent>
        </Dialog>
      </div>
    )
  }
}

export default withMobileDialog()(FormDialog)
