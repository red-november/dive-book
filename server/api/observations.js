const router = require('express').Router()
const {Log, Badge, Diver, Observation} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  const allObservations = await Observation.findAll({
    include: [{model: Log}]
  })
  res.status(200).json(allObservations)
})
