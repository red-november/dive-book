const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/diveshops', require('./diveShops'))
router.use('/logs', require('./logs'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
