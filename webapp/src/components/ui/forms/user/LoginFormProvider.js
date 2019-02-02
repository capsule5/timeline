import React, { Component } from "react"
import { connect } from "react-redux"
import LoginForm from "./LoginForm"
import { UserStore } from "../../../../redux/store"

class LoginFormProvider extends Component {
  render() {
    return <LoginForm { ...this.props } />
  }
}

const mapDispatchToProps = dispatch => ({
  login: action => dispatch({ type: UserStore.actions.LOGIN.REQUEST, action }),
})

export default connect(
  null,
  mapDispatchToProps
)(LoginFormProvider)
