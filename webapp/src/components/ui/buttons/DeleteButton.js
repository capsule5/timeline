import React from "react"
import "./Buttons.scss"

const DeleteButton = ({ action, id }) => {
  return (
    <button
      className="button__delete"
      onClick={ () => {
        action({ id })
      } }
      type="button"
    >
      x
    </button>
  )
}

export default DeleteButton

// import React from "react"
// import IconButton from "@material-ui/core/IconButton"
// import DeleteIcon from "@material-ui/icons/Delete"

// const DeleteButton = ({ deleteEvent, id }) => {
//   return (
//     <IconButton
//       aria-label="Delete"
//       className="event__delete"
//       onClick={() => {
//         deleteEvent({ id })
//       }}
//     >
//       <DeleteIcon fontSize="small" color="secondary" variant="contained" />
//     </IconButton>
//   )
// }

// export default DeleteButton
