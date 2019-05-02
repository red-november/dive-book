const router = require('express').Router()
const {DiveShop} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await DiveShop.findAll({})
    res.json(users)
  } catch (err) {
    next(err)
  }
})
