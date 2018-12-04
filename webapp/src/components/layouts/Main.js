import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { withStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"

const drawerWidth = 240

const styles = (theme) => {
  console.warn("[stab]", { theme })
  return ({
    root: {
      display: "flex",
      color: theme.palette.primary.main,
    },
    appBar: {
      transition: theme.transitions.create([ "margin", "width" ], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create([ "margin", "width" ], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 20,
      position: "fixed",
      zIndex: 10,
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      color: "#FFF",
    },
    drawerPaper: {
      width: drawerWidth,
      background: "#282c34",
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: "0 8px",
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    content: {
      flexGrow: 1,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  })
}

class MainLayout extends React.Component {
  state = {
    open: false,
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  render() {
    const {
      classes, theme, nav, mainContent,
    } = this.props
    const { open } = this.state

    return (
      <div className={ classes.root }>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={ this.handleDrawerOpen }
          className={ classNames(classes.menuButton, open && classes.hide) }
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          className={ classes.drawer }
          variant="persistent"
          anchor="left"
          open={ open }
          classes={ {
            paper: classes.drawerPaper,
          } }
        >
          <div className={ classes.drawerHeader }>
            <IconButton onClick={ this.handleDrawerClose } color="primary" variant="fab">
              {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          {nav}
        </Drawer>
        <main
          className={ classNames(classes.content, {
            [classes.contentShift]: open,
          }) }
        >
          {mainContent}
        </main>
      </div>
    )
  }
}

MainLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  nav: PropTypes.element.isRequired,
  mainContent: PropTypes.element.isRequired,
}

export default withStyles(styles, { withTheme: true })(MainLayout)
