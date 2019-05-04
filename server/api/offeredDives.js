const router = require('express').Router()
const {OfferedDive, Diver} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  const allOfferedDives = await OfferedDive.findAll()
  res.status(200).send(allOfferedDives)
})

router.get('/diveshops/:diveshopId', async (req, res, next) => {
  const diveShopId = Number(req.params.diveshopId)

  const OfferedDives = await OfferedDive.findAll({
    where: {diveshopId: diveShopId}
  })
  res.status(200).send(OfferedDives)
})
