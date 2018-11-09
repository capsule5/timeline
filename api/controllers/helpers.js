export const handleError = (err, res) => {
  console.log('[stab]', { err })
  res.status(err.statusCode || '500').send(err)
}

export const handleSuccessOrErrorMessage = (data, res) => {
  let response
  if (data != 0) {
    response = { result: 'success' }
  } else {
    response = { msg: 'No Result Found' }
  }
  res.setHeader('Content-Type', 'application/json')
  res.status(200).send(JSON.stringify(response))
}
