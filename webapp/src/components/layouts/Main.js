import React from "react"
import PropTypes from "prop-types"
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer"
import MenuIcon from "@material-ui/icons/Menu"
import Fab from "@material-ui/core/Fab"
import { withStyles } from "@material-ui/core/styles"
import classNames from "classnames"
import { compose } from "recompose"
import withWidth, { isWidthDown } from "@material-ui/core/withWidth"

const navWidth = 240
const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      justifyContent: "space-around",
    },
  },
  nav: {
    paddingTop: 20,
    color: "#FFF",
  },
  timeline: {
    // minWidth: 500,
    flex: 1,
  },
  detail: {
    minWidth: 500,
    maxWidth: 500,
  },
  burgerButton: {
    position: "fixed",
    top: 10,
    left: 10,
    zIndex: 2,
  },
  menuButton: {
    color: "#FFF",
  },
  navPaper: {
    paddingTop: 20,
    width: navWidth,
    background: "#282c34",
    color: "#FFF",
  },
  detailPaper: {
    width: "100%",
    background: "#282c34",
    color: "#FFF",
  },
  closeButton: {
    color: "#FFF",
    position: "fixed",
    right: "0",
    zIndex: 2,
    background: "#282c34",
  },
})

class MainLayout extends React.Component {
  state = {
    isNavOpen: false,
  }

  toggleNav = isOpen => () => {
    this.setState({ isNavOpen: isOpen })
  }

  renderNav() {
    const { isNavOpen } = this.state
    const { nav, classes, width } = this.props
    if (isWidthDown("sm", width)) {
      return (
        <div className="nav-drawer">
          <Fab
            color="primary"
            aria-label="Open nav"
            onClick={ this.toggleNav(true) }
            className={ classNames(classes.menuButton, classes.burgerButton) }
          >
            <MenuIcon />
          </Fab>
          <SwipeableDrawer
            open={ isNavOpen }
            onOpen={ this.toggleNav(true) }
            onClose={ this.toggleNav(false) }
            classes={ {
              paper: classes.navPaper,
            } }
          >
            {/* <div>
              <IconButton onClick={ this.toggleNav(false) } className={ classes.menuButton }>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider /> */}
            {nav}
          </SwipeableDrawer>
        </div>
      )
    }
    return <div className={ classes.nav }>{nav}</div>
  }

  renderDetail() {
    const {
      detail, classes, isShowSelected, toggleSelectedEvent, width,
    } = this.props
    // render mobile
    if (isWidthDown("sm", width)) {
      return (
        <SwipeableDrawer
          classes={ {
            paper: classes.detailPaper,
          } }
          onClose={ toggleSelectedEvent }
          variant="temporary"
          open={ isShowSelected }
          anchor="right"
        >
          {/* <div>
            <IconButton onClick={ toggleSelectedEvent } className={ classes.closeButton }>
              <CloseIcon />
            </IconButton>
          </div>
          <Divider /> */}
          {detail}
        </SwipeableDrawer>
      )
    }

    // render desktop
    return isShowSelected && <div className={ classes.detail }>{detail}</div>
  }

  renderTimeline() {
    const { timeline, classes } = this.props
    return <div className={ classes.timeline }>{timeline}</div>
  }

  render() {
    const { classes } = this.props
    return (
      <div className={ classes.root }>
        {this.renderNav()}
        {this.renderTimeline()}
        {this.renderDetail()}
      </div>
    )
  }
}

MainLayout.propTypes = {
  nav: PropTypes.element.isRequired,
  timeline: PropTypes.element.isRequired,
}

export default compose(
  withStyles(styles, { withTheme: true }),
  withWidth()
)(MainLayout)
