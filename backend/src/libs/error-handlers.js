const mainHandler = (err, req, res, next) => {
  res.status(err.status || 500)
  console.error(err)
  res.send(err.message)
}

module.exports = {
  mainHandler
}
