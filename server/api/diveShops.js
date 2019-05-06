const router = require('express').Router()
const {DiveShop, OfferedDive} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const shops = await DiveShop.findAll()
    res.json(shops)
  } catch (err) {
    next(err)
  }
})

router.get('/:shopId', async (req, res, next) => {
  try {
    const singleShop = await DiveShop.findByPk(req.params.shopId, {
      include: [{model: OfferedDive}]
    })
    res.json(singleShop)
  } catch (err) {
    next(err)
  }
})
