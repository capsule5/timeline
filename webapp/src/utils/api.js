import axios from "axios"

const API_BASE_URL = "http://localhost:3003/api/"

export const api = ({ method, endpoint, data = {} }) => axios({
  url: `${API_BASE_URL}${endpoint}`,
  method,
  data,
})
  .then((response) => {
    console.log("API success", method, endpoint, response.data)
    return response
  })
  .catch((error) => {
    console.log("API error", { error })
    return error
  })
