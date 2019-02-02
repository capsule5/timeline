import React, { Component } from "react"
import { connect } from "react-redux"
import RegisterForm from "./RegisterForm"
import { UserStore } from "../../../../redux/store"

class RegisterFormProvider extends Component {
  render() {
    return <RegisterForm { ...this.props } />
  }
}

const mapDispatchToProps = dispatch => ({
  register: action => dispatch({ type: UserStore.actions.REGISTER.REQUEST, action }),
})

export default connect(
  null,
  mapDispatchToProps
)(RegisterFormProvider)
