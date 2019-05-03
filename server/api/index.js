const router = require('express').Router()
module.exports = router

router.use('/divers', require('./divers'))
router.use('/diveshops', require('./diveShops'))
router.use('/logs', require('./logs'))
router.use('/divers', require('./divers'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
