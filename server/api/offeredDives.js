const router = require('express').Router()
const {OfferedDive, Diver} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allOfferedDives = await OfferedDive.findAll()
    res.status(200).send(allOfferedDives)
  } catch (err) {
    next(err)
  }
})

router.get('/diveshops/:diveshopId', async (req, res, next) => {
  try {
    const diveShopId = Number(req.params.diveshopId)

    const OfferedDives = await OfferedDive.findAll({
      where: {diveshopId: diveShopId}
    })
    res.status(200).send(OfferedDives)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const singleOfferedDives = await OfferedDive.findByPk(id)
    res.status(200).send(singleOfferedDives)
  } catch (err) {
    next(err)
  }
})
