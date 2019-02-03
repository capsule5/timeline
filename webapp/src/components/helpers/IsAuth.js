import React from "react"
import { connect } from "react-redux"
import { userSelector } from "../../redux/selectors"

class IsAuth extends React.Component {
  render() {
    const { isAuthenticated, children } = this.props
    if (isAuthenticated) {
      return children
    }
    return null
  }
}

const mapStateToProps = state => ({
  isAuthenticated: userSelector.isAuthenticated(state),
})

export default connect(mapStateToProps)(IsAuth)
