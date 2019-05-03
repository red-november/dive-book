const router = require('express').Router()
const {Diver} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const divers = await Diver.findAll()
    res.send(divers)
  } catch (err) {
    next(err)
  }
})

router.get('/:diverId', async (req, res, next) => {
  try {
    const diverId = Number(req.params.diverId)
    const diver = await Diver.findByPk(diverId)
    res.send(diver)
  } catch (err) {
    next(err)
  }
})
