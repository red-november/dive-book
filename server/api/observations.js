const router = require('express').Router()
const {Log, Badge, Diver, Observation} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  const allObservations = await Observation.findAll({
    include: [{model: Log}]
  })
  res.status(200).json(allObservations)
})

router.get('/:obsId', async (req, res, next) => {
  const obsId = Number(req.params.obsId)
  const observation = await Observation.findOne({
    where:{
      id: obsId
    },
    include: [{model: Log}]
  })
  res.status(200).send(observation)

})

router.post('/', async (req, res, next) => {
  try {
    if (req.user) {
      const cert = await Certification.create(req.body)
      res.status(201).send(cert)
    }
  } catch (err) {
    next(err)
  }
 })
