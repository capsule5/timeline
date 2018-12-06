import React from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
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
      children,
      buttonText,
      formTitle,
      fullScreen,
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
        <Dialog fullScreen={ fullScreen } open={ open } onClose={ this.handleClose } fullWidth maxWidth="sm">
          <DialogTitle id="form-dialog-title">{formTitle}</DialogTitle>
          <DialogContent>{childrenWithProps}</DialogContent>
        </Dialog>
      </div>
    )
  }
}

export default withMobileDialog()(FormDialog)
