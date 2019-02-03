import { createSelector } from "reselect"

const userState = state => state.user

export const getAuthenticated = createSelector(
  [ userState ],
  user => user.authenticated
)

export const isAuthenticated = createSelector(
  [ getAuthenticated ],
  authenticated => Object.keys(authenticated).length > 0
)
